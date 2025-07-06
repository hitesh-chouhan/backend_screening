
import { OrganizationRepository } from './organization.repository'
import { dates } from '@dotslibrary/dots-core'

const organizationRepo = new OrganizationRepository()

export class OrganizationService {
    /**
     *
     * Contains all the services and business logic of organization module
     *
     **/

    async createOrganization(body) {
        body.createdAt = dates.toDb()
        body.organizationID = await organizationRepo.createOrganizationID(body.name) //to create unique id for organization
        const result: any = await organizationRepo.create(body)
        return result
    }

    async updateOrganization(body) {
        body.modifiedAt = dates.toDb()
        const result: any = await organizationRepo.update(body)
        return result
    }

    async deleteOrganization(query) {
            const payload = {} as any;
            payload._id = query._id;
            if ("isDelete" in query) {
                payload.isDelete = query.isDelete == "false" ? false : true;
            } else {
                payload.isDelete = true;
            }
            payload.isDeleteReason = query.isDeleteReason ? query.isDeleteReason : null;
            payload.modifiedById = query.modifiedById
            const result: any = await organizationRepo.delete(payload);
            return result;
        }

    async getOrganization(query) {
        const result: any = await organizationRepo.findById(query._id)
        return result
    }

    async getAllOrganization(query) {
        const result: any = await organizationRepo.findAll(query)
        return result
    }

}