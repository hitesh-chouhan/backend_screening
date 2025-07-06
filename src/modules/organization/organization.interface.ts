
import { Document, ObjectId } from 'mongoose'

/**
 *
 * Contains interface model of organization module
 *
 **/

export interface Organization extends Document {
    name: string
    organizationID: string
    createdById: ObjectId
    createdAt: Date
    modifiedById: ObjectId
    modifiedAt: Date
    isDelete: boolean
}