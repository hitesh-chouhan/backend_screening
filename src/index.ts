import { app, applicationBootstrap } from '@dotslibrary/dots-core'
import { Socket, Server as SocketIOServer } from 'socket.io'
import { createServer } from 'http';

import { usersWithMiddleware, InternalUsers } from './modules/users/users.routes';
import { organizationWithMiddleware } from './modules/organization/organization.routes';
import { validateTokenMiddleWare } from './utils/jwt';
import { documentsWithMiddleware } from './modules/documnets/documents.routes'; 

//setting up routes
app.use('/user/auth', InternalUsers.router)
app.use('/user', validateTokenMiddleWare, usersWithMiddleware.router)
app.use('/organization', validateTokenMiddleWare, organizationWithMiddleware.router)
app.use('/document', validateTokenMiddleWare, documentsWithMiddleware.router)


//creating server
const server = createServer(app)

//setup socket
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
    }
})

applicationBootstrap(app, {
    MONGO_DB_URL: process.env.MONGO_DB,
    DISABLE_HTTP_SERVER: true
}).then(() => {
    server.listen(process.env.PORT || 3000, () => {
        console.log('server is running on port', process.env.PORT || 3000)
    })
}).catch(error => {
    console.error(error);
    process.exit()
})