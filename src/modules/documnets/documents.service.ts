
import { DocumnetsRepository } from './documents.repository'
import { dates } from '@dotslibrary/dots-core'
import httpError, { NotFound } from 'http-errors'
import { Types } from 'mongoose'
import { title } from 'process'

const documnetsRepo = new DocumnetsRepository()

export class DocumnetsService {
    /**
     *
     * Contains all the services and business logic of documnets module
     *
     **/

    async createDocuments(body) {
        body.createdAt = dates.toDb()
        body.sharedWith = [{
            userId: body.ownerId,
            role: 'editor'
        }]

        //saving logs
        body.logs = [{
            action: 'created',
            message: 'Document created',
            performedAt: new Date(),
            performedBy: new Types.ObjectId(body.ownerId)
        }]
        const result: any = await documnetsRepo.create(body)
        return result
    }

    async updateDocuments(body) {
        const document = await this.getDocuments({ _id: body.documentId }) //documentId refers to "_id"
        if (!document) throw new NotFound(404, 'document not found')

        //checking the access of user
        const isEditor = document.sharedWith.some(
            (user) =>
                (user.userId.toString() === body.tokenUser.id) &&
                (user.role == 'editor' || user.role == 'admin')
        )
        
        //check user having only specific access can upadate the document,using ownerId and tokenUser's id belongs to same organization
        if ((document.ownerId.toString() !== body.tokenUser.id) &&
            (document.organizationID !== body.tokenUser.organizationID) && !isEditor) {
            throw new httpError(403, 'you are not allowed to share this document')
        }

        //handeling versions 
        body.version = document.version + 1
        body.versions = [{
            content: document.content,
            version: document.version,
            updatedBy: body.tokenUser.id,
            updatedAt: dates.toDb()
        }]
        //saving logs
        body.logs = [{
            action: 'updated',
            message: 'Document content updated',
            performedAt: new Date(),
            performedBy: new Types.ObjectId(body.tokenUser.id)
        }]
        body._id = body.documentId
        body.modifiedById = body.tokenUser.id
        body.modifiedAt = dates.toDb()
        const result: any = await documnetsRepo.update(body)
        return result
    }

    async shareDocuments(body) {
        body.modifiedAt = dates.toDb()
        const document = await this.getDocuments({ _id: body.documentId }) //documentId refers to "_id"
        if (!document) throw new NotFound(404, 'document not found')

        //check only owner can share the document using ownerId and tokenUser's id belongs to same organization
        if ((document.ownerId.toString() !== body.tokenUser.id) &&
            (document.organizationID !== body.tokenUser.organizationID)) {
            throw new httpError(403, 'you are not allowed to share this document')
        }

        //check if document already shared with the user
        const alreadyShared = document.sharedWith.find(
            (user) => user._id.toString() === body.userId
        )
        if (alreadyShared) {
            throw httpError(409, 'user has already access to this document')
        }

        //assigning userId and role/access to the user
        body.sharedWith = [{
            userId: body.userId,
            role: body.role
        }]

        //saving logs
        body.logs = [{
            action: 'shared',
            message: 'Document shared',
            performedAt: new Date(),
            performedBy: new Types.ObjectId(body.tokenUser.id)
        }]
        body._id = body.documentId
        body.modifiedById = body.tokenUser.id
        const result: any = await documnetsRepo.update(body)
        return result
    }

    async deleteDocuments(query) {
        const payload = {} as any;
        payload._id = query._id;
        const document = await this.getDocuments({ _id: query.documentId }) //documentId refers to "_id"

        //checking the access of user
        const isEditor = document.sharedWith.some(
            (user) =>
                (user.userId.toString() === query.tokenUser.id) &&
                (user.role == 'editor' || user.role == 'admin')
        )
        //check only owner can share the document using ownerId and tokenUser's id belongs to same organization
        if ((document.ownerId.toString() !== query.tokenUser.id) &&
            (document.organizationID !== query.tokenUser.organizationID) && !isEditor) {
            throw new httpError(403, 'you are not allowed to edit this document')
        }

        //soft deleting and reinstating documents
        if ("isDelete" in query) {
            payload.isDelete = query.isDelete == "false" ? false : true;
        } else {
            payload.isDelete = true;
        }
        payload.isDeleteReason = query.isDeleteReason ? query.isDeleteReason : null;
        //saving logs
        payload.logs = [{
            action: 'deletd',
            message: 'Document marked as delete',
            performedAt: new Date(),
            performedBy: new Types.ObjectId(query.tokenUser.id)
        }]
        const result: any = await documnetsRepo.delete(payload);
        return result;
    }

    async getDocuments(query) {
        const result: any = await documnetsRepo.findById(query._id)
        return result
    }

    async getAllDocuments(query) {
        const payload = {} as any
        if (query.searchText) {
            const searchKey = { $regex: query.searchText, $options: 'i' }
            payload.search = {
                $or: [
                    { title: searchKey },
                ],
            }
        } else {
            payload.search = {}
        }
        if (query.organizationID) {
            payload.organizationID = { organizationID: query.organizationID }
        } else {
            payload.organizationID = {}
        }
        if (query.sortField && query.sortOrder) {
            payload.sort = { [query.sortField]: query.sortOrder == 'desc' ? -1 : 1 }
        } else {
            payload.sort = { organizationID: 1 }
        }
        const pageNumber = query.pageNumber
        const pageSize = query.pageSize
        if (pageNumber && pageSize) {
            payload.limit = pageSize
            payload.offset = (parseInt(pageNumber) - 1) * parseInt(pageSize)
        } else {
            payload.limit = 10
            payload.offset = 0
        }
        if ('isDelete' in query) {
            payload.isDelete =
                (query.isDelete == 'true' || query.isDelete == true) ? { isDelete: true } : { isDelete: false }
        } else {
            payload.isDelete = {}
        }
        if (query['_id']) {
            payload._id = { _id: new Types.ObjectId(query._id) }
        } else {
            payload._id = {}
        }
        const result = await documnetsRepo.getAllDocuments(payload)
        return result
    }

}