
import { UsersService } from './users.service';
import { UsersCreateBodyDto, UsersUpdateBodyDto, UsersFindQueryDto, UsersFindAllQueryDto } from './users.dto';
import { Validator } from '@dotslibrary/dots-core'

export class UsersController {
    /**
     *
     * Contains all the controller of users module
     *
     **/

    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    async createUsers(body: UsersCreateBodyDto) {
        return { ...(await this.usersService.createUsers(body)), message: 'Users created successfully' };
    }

    async updateUsers(body: UsersUpdateBodyDto) {
        return { ...(await this.usersService.updateUsers(body)), message: 'Users updated successfully' };
    }

    async deleteUsers(query: UsersFindQueryDto) {
        return { ...(await this.usersService.deleteUsers(query)), message: 'Users updated successfully' };
    }

    async getUsers(query: UsersFindQueryDto) {
        return { ...(await this.usersService.getUsers(query)), message: 'Users fetched successfully' };
    }   

    async getAllUsers(query: UsersFindAllQueryDto) {
        return { ...(await this.usersService.getAllUsers(query)), message: 'Userss fetched successfully' };
    }

    async resetPassword(body: any,userDetail) {       //userDetail came from decoded token(logic in index.middleware.ts)
         console.log(userDetail)
        return { ...(await this.usersService.resetPassword(body,userDetail)), message: 'password reset successfully' };
    }

    async loginUser(body: UsersCreateBodyDto) {
        return { ...(await this.usersService.loginUser(body)), message: 'Users logedin successfully' };
    }

}