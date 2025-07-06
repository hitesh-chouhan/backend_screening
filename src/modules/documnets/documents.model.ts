
import mongoose, { Schema, model } from 'mongoose'
import { Documnets } from './documents.interface'


/**
 *
 * Contains database schema of documnets module
 *
 **/
//versionSchema
const versionSchema = new mongoose.Schema({
    content: { type: String, required: true },
    version : {type:Number},
    updatedAt: { type: Date },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'users' }
})

const logSchema = new mongoose.Schema({
    action: { type: String },
    message : {type:String},
    performedAt: { type: Date },
    performedBy: { type: Schema.Types.ObjectId, ref: 'users' }
})


// Documnets collection
const documnetsTable = 'documents'

const documnetsSchema = new Schema<Documnets>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    ownerId: { type: String, required: true },
    organizationID: { type: String },
    version: { type: Number, default: 1 },
    sharedWith: [
        {
            userId: { type: Schema.Types.ObjectId },
            role: { type: String, enum: ['admin', 'viewer', 'editor'], default: 'viewer' }
        }
    ],
    versions: [versionSchema],
    createdAt: { type: Date },
    modifiedBy: { type: String },
    modifiedAt: { type: Date },
    isDelete: { type: Boolean, default: false },
    logs:[logSchema]
})

export const DocumnetsModel = model<Documnets>(documnetsTable, documnetsSchema, documnetsTable)