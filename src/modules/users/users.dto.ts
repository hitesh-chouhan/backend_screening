
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
 * Contains all the data transfer object of users module
 *
 **/

export class UsersCreateBodyDto {
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    tenantId: string

    @IsBoolean()
    @IsOptional()
    isDelete: boolean
}

export class UsersUpdateBodyDto extends UsersCreateBodyDto {
    @IsString()
    _id: string
}

export class UsersFindQueryDto {
    @IsString()
    _id: string
}

export class UsersFindAllQueryDto {
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