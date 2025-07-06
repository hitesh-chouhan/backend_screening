
import { UsersModel } from './users.model'
import { Exception } from '@dotslibrary/dots-core'
import httpErrors, { NotFound } from 'http-errors'

import { Users } from './users.interface'

export class UsersRepository {
    /**
     *
     * Contains all the database operations of users module
     *
     **/

    async create(body): Promise<Users | null> {
        try {
            return await new UsersModel(body).save()
        } catch (err: any) {
            if (err.code == 11000) {
                throw httpErrors(409, 'Similar record already exist')
            } else {
                throw new Exception(err)
            }
        }
    }

    async update(body): Promise<Users | null> {
        try {
            // delete body.organizationID
            delete body.password
            const result = await UsersModel.findByIdAndUpdate(body._id, body, { new: true }).lean().exec()
            if (!result) {
                throw new NotFound('Users not found')
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

    async deleteUser(query): Promise<any> {
        try {
            const result = await UsersModel.findByIdAndUpdate(query._id,
                {
                    isDelete: query.isDelete,
                    isDeleteReason: query.isDeleteReason
                }, { new: true }).lean().exec()
            return result;
        } catch (err: any) {
            throw new Exception(err)
        }
    }

    async findById(id): Promise<Users | null> {
        const result = await UsersModel.findById(id).lean().exec()
        if (!result) {
            throw new NotFound('Users not found')
        }
        return result
    }

    async findUserByEmail(email): Promise<Users | null> {
        const result = await UsersModel.findOne({ email: email }).lean().exec()
        if (!result) {
            throw new NotFound('Users not found')
        }
        return result
    }

    async resetPassword(body) {
        const user = await UsersModel.findByIdAndUpdate(body._id, {
            $set: {
                password: body.password
            }
        })
        return user
    }

    async findAllUsers(query) {
    }

}