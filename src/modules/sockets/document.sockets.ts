import { Server, Socket } from 'socket.io'
import { DocumnetsModel } from '../documnets/documents.model'
import mongoose, { Types } from 'mongoose'
import { dates } from '@dotslibrary/dots-core'
import { Type } from 'class-transformer'

//checking access 
function isEditor(doc, userId): boolean {
    return (
        doc.sharedWith.some(
            (user) =>
                (user.ownerId.toString() === userId) &&
                (user.role == 'editor' || user.role == 'admin')
        )
    )
}

export function handleDocumentScocket(io: Server) {

    io.on('connection', (socket: Socket) => {
        console.log('socket connected', socket.id)

        socket.on('join-document', (docId: string) => {
            socket.join(docId);
            console.log(`${socket.id} jooined document ${docId}`)
        })

        socket.on('document-change',
            async ({ docId, content, userId }: { docId: string; content: string, userId: string }) => {
                try {
                    const doc = await DocumnetsModel.findById(docId)
                    if (!doc) {
                        return socket.emit('error', 'Documnet not found')
                    }

                    if (!isEditor(doc, userId)) {
                        return socket.emit('you have not permission to edit this document')
                    }
                    socket.to(docId).emit('document-update', content)

                    //save version
                    doc.versions.push({
                        content: doc.content,
                        version: doc.version,
                        updatedAt: new Date(),
                        updatedBy: new Types.ObjectId(userId)
                    })
                    //saving logs
                    doc.logs.push({
                        action: 'updated',
                        message: 'Document content updated',
                        performedAt: new Date(),
                        performedBy: new Types.ObjectId(userId)
                    })

                    doc.content = content
                    doc.modifiedAt = new Date();
                    await doc.save()

                    socket.to(docId).emit('documet-updated', content)
                } catch (err) {
                    console.log(err);
                    socket.emit('error', 'something went wrong', err)
                }
            })

        socket.on('disconnet', () => {
            console.log('Socket disconnected')
        })
    })
}