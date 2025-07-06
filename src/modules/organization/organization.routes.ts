
import { OrganizationController } from './organization.controller'
import { Router } from '@dotslibrary/dots-core'

const organizationController = new OrganizationController();

/**
*
* Contains all the routes of organization module
*
**/

// Router with authentication 
export const organizationWithMiddleware = new Router()
    .post('/create', async req => organizationController.createOrganization(req.body,req['userDetail']))
    .put('/update', async req => organizationController.updateOrganization(req.body,req['userDetail']))
    .delete('/delete', async req => organizationController.deleteOrganization(req.query as any,req['userDetail']))
    .get('/single', async req => organizationController.getOrganization(req.query as any))
    .get('/all', async req => organizationController.getAllOrganization(req.query as any))