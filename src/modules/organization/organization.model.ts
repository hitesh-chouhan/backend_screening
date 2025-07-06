
import { Schema, model } from 'mongoose'
import { Organization } from './organization.interface'

/**
 *
 * Contains database schema of organization module
 *
 **/

// Organization collection
const organizationTable = 'organization'

const organizationSchema = new Schema<Organization>({
    name: { type: String, required: true, unique: true },
    organizationID: { type: String, unique : true, required: true },
    createdById: { type: Schema.Types.ObjectId },
    modifiedById: { type: Schema.Types.ObjectId },
    createdAt: { type: Date },
    isDelete: { type: Boolean, default: false },
})

export const OrganizationModel = model<Organization>(organizationTable, organizationSchema, organizationTable)