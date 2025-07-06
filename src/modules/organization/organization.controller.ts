
import { OrganizationService } from './organization.service';
import { OrganizationCreateBodyDto, OrganizationUpdateBodyDto, OrganizationFindQueryDto, OrganizationFindAllQueryDto } from './organization.dto';
import { Validator } from '@dotslibrary/dots-core'
import { Forbidden } from 'http-errors'

export class OrganizationController {
    /**
     *
     * Contains all the controller of organization module
     *
     **/

    private organizationService: OrganizationService;

    constructor() {
        this.organizationService = new OrganizationService();
    }

    async createOrganization(body, userDetail) {
        if (!(userDetail.authorization == 'superAdmin')) {
            throw Forbidden('Only super admin can create an organization') //giving access to superadmin only to create organization
        }
        body.createdById = userDetail.id
        return { ...(await this.organizationService.createOrganization(body)), message: 'Organization created successfully' };
    }

    async updateOrganization(body: OrganizationUpdateBodyDto,userDetail) {
        if (!(userDetail.authorization == 'superAdmin')) {
            throw Forbidden('Only super admin can update an organization')
        }
        body.modifiedById = userDetail.id
        return { ...(await this.organizationService.updateOrganization(body)), message: 'Organization updated successfully' };
    }

    async deleteOrganization(query: OrganizationFindQueryDto,userDetail) {
        if (!(userDetail.authorization == 'superAdmin')) {
            throw Forbidden('Only super admin can update an organization')
        }
        query.modifiedById = userDetail.id
        return { ...(await this.organizationService.deleteOrganization(query)), message: 'Organization deleted successfully' };
    }

    async getOrganization(query: OrganizationFindQueryDto) {
        return { ...(await this.organizationService.getOrganization(query)), message: 'Organization fetched successfully' };
    }

    async getAllOrganization(query: OrganizationFindAllQueryDto) {
        return { ...(await this.organizationService.getAllOrganization(query)), message: 'Organizations fetched successfully' };
    }

}