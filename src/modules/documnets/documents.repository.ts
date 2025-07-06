
import { DocumnetsModel } from './documents.model'
import { Exception } from '@dotslibrary/dots-core'
import httpErrors, { NotFound } from 'http-errors'

import { Documnets } from './documents.interface'

export class DocumnetsRepository {
    /**
     *
     * Contains all the database operations of documnets module
     *
     **/

    async create(body): Promise<Documnets | null> {
        try {
            return await new DocumnetsModel(body).save()
        } catch (err: any) {
            if (err.code == 11000) {
                throw httpErrors(409, 'Similar record already exist')
            } else {
                throw new Exception(err)
            }
        }
    }

    async update(body): Promise<Documnets | null> {
        try {
            const result = await DocumnetsModel.findByIdAndUpdate(body._id, body, { new: true }).lean().exec()
            if (!result) {
                throw new NotFound('Documnets not found')
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

    async delete(query): Promise<Documnets | null> {
        try {
            const result = await DocumnetsModel.findByIdAndUpdate(query._id,
                {
                    modifiedById : query.tokenUser.id,
                    isDelete: query.isDelete,
                    isDeleteReason: query.isDeleteReason,
                    logs : query.logs
                }, { new: true }).lean().exec()
            return result;
        } catch (err: any) {
            throw new Exception(err)
        }
    }

    async findById(id): Promise<Documnets | null> {
        const result = await DocumnetsModel.findById(id).lean().exec()
        if (!result) {
            throw new NotFound('Documnets not found')
        }
        return result
    }

    async findOne(query): Promise<Documnets | null> {
        const result = await DocumnetsModel.findOne(query).lean().exec()
        if (!result) {
            throw new NotFound('Documnets not found')
        }
        return result
    }

    async getAllDocuments(query) {
        const result = {} as any
        result.list = await DocumnetsModel.aggregate([
            { $match: query._id },
            { $match: query.isDelete },
            { $match: query.organizationID },
            { $match: query.search },
            { $sort: query.sort },
            { $skip: parseInt(query.offset) },
            { $limit: parseInt(query.limit) },
            {
                $lookup: {
                    from: 'organization',
                    localField: 'organizationID',
                    foreignField: 'organizationID',
                    as: 'organization',
                },
            },
            { $unwind: { path: '$organization', preserveNullAndEmptyArrays: true } },
        ])
        const count = await DocumnetsModel.aggregate([
            { $match: query._id },
            { $match: query.isDelete },
            { $match: query.organizationID },
            { $match: query.search },
            { $sort: query.sort },
            { $skip: parseInt(query.offset) },
            { $limit: parseInt(query.limit) },
        ])
        if (count.length == 0) {
            result.totalCount = 0
        } else {
            result.totalCount = count[0].totalcount
        }
        return result
    }
}