
import { DocumnetsService } from './documents.service';
import { DocumnetsCreateBodyDto, DocumnetsUpdateBodyDto, DocumnetsFindQueryDto, DocumnetsFindAllQueryDto } from './documents.dto';
import { Validator } from '@dotslibrary/dots-core'
import httpError from 'http-errors'

export class DocumnetsController {
/**
 *
 * Contains all the controller of documnets module
 *
 **/

    private documnetsService: DocumnetsService;

    constructor() {
        this.documnetsService = new DocumnetsService();
    }

 
    async createDocuments(body: DocumnetsCreateBodyDto,userDetail) {
        body.ownerId = userDetail.id
        body.organizationID = userDetail.organizationID
        return { ...(await this.documnetsService.createDocuments(body)), message: 'Documnets created successfully' };
    }

    async updateDocuments(body: DocumnetsUpdateBodyDto,userDetail) {
        body.tokenUser = userDetail.id
        return { ...(await this.documnetsService.updateDocuments(body)), message: 'Documnets updated successfully' };
    }

    async shareDocument(body: DocumnetsUpdateBodyDto,userDetail) {
        body.tokenUser = userDetail
        return { ...(await this.documnetsService.shareDocuments(body)), message: 'Documnets shared with user successfully' };
    }

    async deleteDocuments(query: DocumnetsUpdateBodyDto,userDetail) {
        query.tokenUser = userDetail
        return { ...(await this.documnetsService.deleteDocuments(query)), message: 'Documnets deleted successfully' };
    }

   async getDocuments(query: DocumnetsFindQueryDto) {
        return { ...(await this.documnetsService.getDocuments(query)), message: 'Documnets fetched successfully' };
    }

    async getAllDocuments(query: DocumnetsFindAllQueryDto,userDetail) {
        query.organizationID = userDetail.organizationID
        return { ...(await this.documnetsService.getAllDocuments(query)), message: 'Documnetss fetched successfully' };
    }

}