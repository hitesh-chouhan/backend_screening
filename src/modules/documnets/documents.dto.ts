
import {
    IsString,
    IsOptional,
    IsBoolean,
    IsBooleanString,
    IsNumberString
} from 'class-validator'
import { Type } from 'class-transformer'

/**
 *
 * Contains all the data transfer object of documnets module
 *
 **/

export class DocumnetsCreateBodyDto {
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    organizationID: string

    @IsBoolean()
    @IsOptional()
    isDelete: boolean
    
    @IsOptional()
    ownerId : string
}

export class DocumnetsUpdateBodyDto extends DocumnetsCreateBodyDto {
    @IsString()
    _id: string

    @IsOptional()
    tokenUser : string
}

export class DocumnetsFindQueryDto {
    @IsString()
    _id: string
}

export class DocumnetsFindAllQueryDto {
    @IsNumberString()
    @IsOptional()
    pageNumber: string

    @IsNumberString()
    @IsOptional()
    pageSize: string

    @IsOptional()
    organizationID : string

    @IsString()
    @IsOptional()
    sortField: string

    @IsString()
    @IsOptional()
    sortOrder: string

    @IsString()
    @IsOptional()
    searchText: string

    @IsString()
    @IsOptional()
    _id: string

    @IsBooleanString()
    @IsOptional()
    isDelete: string
}