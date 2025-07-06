
import { Document, Types } from 'mongoose'

/**
 *
 * Contains interface model of documnets module
 *
 **/

export interface Documnets extends Document {
    title: string
    organizationID: string
    content: string
    version: number
    ownerId: string
    sharedWith: []
    versions: version[]
    createdBy: string
    createdAt: Date
    modifiedBy: string
    modifiedAt: Date
    isDelete: boolean
    logs : log[]
}

export interface version {
    content: string
    version: number
    updatedAt: Date
    updatedBy: Types.ObjectId
}

interface log {
    action: string,
    message: string,
    performedAt: Date,
    performedBy: Types.ObjectId
}