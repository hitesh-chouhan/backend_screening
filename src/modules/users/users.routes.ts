
import { UsersController } from './users.controller'
import { Router } from '@dotslibrary/dots-core'

const usersController = new UsersController();

/**
*
* Contains all the routes of users module
*
**/

// Router with authentication 
export const usersWithMiddleware = new Router()
    .post('/create', async req => usersController.createUsers(req.body))
    .put('/update', async req => usersController.updateUsers(req.body))
    .delete('/delete', async req => usersController.deleteUsers(req.query as any))
    .get('/single', async req => usersController.getUsers(req.query as any))
    .put('/resetPassword', async req => usersController.resetPassword(req.body,req['userDetail']))

export const InternalUsers = new Router()
    .post('/login', async req => usersController.loginUser(req.body))
