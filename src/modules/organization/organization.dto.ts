
import {
    IsString,
    IsOptional,
    IsBoolean,
    IsBooleanString,
    IsNumberString
} from 'class-validator'
import { Types } from 'mongoose'

/**
 *
 * Contains all the data transfer object of organization module
 *
 **/

export class OrganizationCreateBodyDto {
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    createdById: Types.ObjectId

    @IsBoolean()
    @IsOptional()
    isDelete: boolean
}

export class OrganizationUpdateBodyDto extends OrganizationCreateBodyDto {
    @IsString()
    _id: string
    modifiedById: Types.ObjectId
}

export class OrganizationFindQueryDto {
    @IsString()
    _id: string
    modifiedById: Types.ObjectId
}

export class OrganizationFindAllQueryDto {
    @IsNumberString()
    @IsOptional()
    pageNumber: string

    @IsNumberString()
    @IsOptional()
    pageSize: string

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