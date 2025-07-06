
import { OrganizationModel } from './organization.model'
import { Exception } from '@dotslibrary/dots-core'
import httpErrors, { NotFound } from 'http-errors'

import { Organization } from './organization.interface'

export class OrganizationRepository {
    findAll(query: any): any {
        throw new Error('Method not implemented.')
    }
    /**
     *
     * Contains all the database operations of organization module
     *
     **/

    async create(body): Promise<Organization | null> {
        try {
            return await new OrganizationModel(body).save()
        } catch (err: any) {
            if (err.code == 11000) {
                throw httpErrors(409, 'Similar record already exist')
            } else {
                throw new Exception(err)
            }
        }
    }

    async createOrganizationID(organization) {
        const count = await OrganizationModel.countDocuments()
        const prefix = organization.toUpperCase().slice(0, 3)
        const organizationID = prefix + count
        return organizationID
    }

    async update(body): Promise<Organization | null> {
        try {
            delete body.organizationID
            const result = await OrganizationModel.findByIdAndUpdate(body._id, body, { new: true }).lean().exec()
            if (!result) {
                throw new NotFound('Organization not found')
            }
            return result;
        } catch (err: any) {
            if (err.code == 11000) {
                throw httpErrors(409, 'Similar record already exist')
            } else {
                throw new Exception(err)
            }
        }
    }

    async delete(query): Promise<any> {
        try {
            const result = await OrganizationModel.findByIdAndUpdate(query._id,
                {
                    modifiedById : query.modifiedById,
                    isDelete: query.isDelete,
                    isDeleteReason: query.isDeleteReason
                }, { new: true }).lean().exec()
            return result;
        } catch (err: any) {
            throw new Exception(err)
        }
    }

    async findById(id): Promise<Organization | null> {
        const result = await OrganizationModel.findById(id).lean().exec()
        if (!result) {
            throw new NotFound('Organization not found')
        }
        return result
    }

}