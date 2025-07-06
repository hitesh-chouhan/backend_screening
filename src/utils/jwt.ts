import jwt from 'jsonwebtoken'
import httpErrors,{Forbidden} from 'http-errors'
import { UsersModel } from '../modules/users/users.model'
import { Exception } from '@dotslibrary/dots-core'

type jwtAuthorization = 'admin' | 'editor' | 'viewer'

export async function createJwt(user, authorization: jwtAuthorization) {
    const jwtPayload = {
        id: user._id,
        organizationID: user.organizationID,
        authorization,
    }
    const jwtconfig = await jwtConfiguration(authorization)
    console.log(jwtconfig)
    return jwt.sign(jwtPayload, jwtconfig.publicKey, {
        algorithm: jwtconfig.algorithm,
        expiresIn: '1h'
    })
}


export function jwtConfiguration(auth) {
    let publicKey, algorithm
    if (auth == 'superAdmin' || auth == 'admin') {
        publicKey = process.env.ADMIN_PRIVATE_KEY
        algorithm = 'HS256'
    } else if (auth == 'editor') {
        publicKey = process.env.EDITOR_PRIVATE_KEY
        algorithm = 'HS256'
    } else if (auth == 'viewer') {
        publicKey = process.env.VIEWER_PRIVATE_KEY
        algorithm = 'HS256'
    }
    return { publicKey, algorithm }
}

export const validateTokenMiddleWare = async (req, res, next) => {
    try {
        const token = req.header('token')
        let user
        if (!token) {
            throw new Forbidden('Token missing')
        }
        const payload: any = await verifyToken(token)
        user = await UsersModel.findOne({_id : payload.id})

        if (payload.firstTimeLogin) {
            if (req.url !== '/resetPassword') {
                throw new Forbidden('Your token is only used to change password')
            }
        }
        console.log(payload)
        req.tokenHolder = user
        req.userDetail = payload
        next()
    } catch (error) {
        console.log('print::error', JSON.stringify(error))
        if (error.name == 'TokenExpiredError') {
            error.message = 'token expired'
        }
        error.httpResponseCode = error.name == 'ForbiddenError' ? 403 : 401
        error.detailedException = {
            name: error.name,
            message: error.message,
            httpResponseCode: error.httpResponseCode,
        }
        next(new Exception(error))
    }
}

export const tokenUser = async token => {
    console.log('tokenUser', token)
}


async function verifyToken(token) {
    const decodedToken: any = await jwt.decode(token)
    const jwtconfig = await jwtConfiguration(decodedToken.authorization)
    const payload: any = await jwt.verify(token, jwtconfig.publicKey)
    return payload
}
