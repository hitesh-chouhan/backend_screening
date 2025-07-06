
import { DocumnetsController } from './documents.controller'
import { Router } from '@dotslibrary/dots-core'

const documnetsController = new DocumnetsController();

/**
*
* Contains all the routes of documnets module
*
**/

// Router with authentication 
export const documentsWithMiddleware = new Router()
    .post('/create', async req => documnetsController.createDocuments(req.body, req['userDetail']))
    .put('/update', async req => documnetsController.updateDocuments(req.body, req['userDetail']))
    .put('/share', async req => documnetsController.shareDocument(req.body, req['userDetail']))
    .delete('/delete', async req => documnetsController.deleteDocuments(req.query as any, req['userDetail']))
    .get('/single', async req => documnetsController.getDocuments(req.query as any))
    .get('/all', async req => documnetsController.getAllDocuments(req.query as any, req['userDetail']))