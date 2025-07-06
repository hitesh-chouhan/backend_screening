import { UsersRepository } from "./users.repository"
import { dates, publish } from "@dotslibrary/dots-core"
import Password from "password-generator"
import httpErrors, { NotFound } from "http-errors"
import bcrypt from 'bcrypt'
import { createJwt } from "../../utils/jwt"
import { eventBus } from "../../utils/mailer"

const usersRepo = new UsersRepository();

export class UsersService {
    /**
     *
     * Contains all the services and business logic of users module
     *
     **/

    async createUsers(body) {
        body.createdAt = dates.toDb();
        const password = Password();
        body.password = await bcrypt.hash(password, 10)
        const result: any = await usersRepo.create(body)
    
        eventBus.emit("email-url", {
            to: result.email,
            subject: "Account has been created",
            body: `Hello, your account has been created successfully.
            Temporary Pasword: ${result.password}.
            Please reset your password after logging in.
            --Backend Team `
        });

        console.log("mail sent to", result.email,
            "temp. password:", password)
        return result;
    }

    async updateUsers(body) {
        body.modifiedAt = dates.toDb();
        const result: any = await usersRepo.update(body);
        eventBus.emit("email-url", {
            to: result.email,
            subject: "Account has been updated",
            body: `Hello, your account has been updated successfully.
            Please reset your password after logging in.
            --Backend Team `
        })
        return result;
    }

    async deleteUsers(query) {
        const payload = {} as any;
        payload._id = query._id;
        if ("isDelete" in query) {
            payload.isDelete = query.isDelete == "false" ? false : true;
        } else {
            payload.isDelete = true;
        }
        payload.isDeleteReason = query.isDeleteReason ? query.isDeleteReason : null;
        const result: any = await usersRepo.deleteUser(payload);
        eventBus.emit("email-url", {
            to: result.email,
            subject: "Account has been updated",
            body: `Hello, your account has been deleted.
            Please reset your password after logging in.
            --Backend Team `
        })
        return result;
    }

    async getUsers(query) {
        const result: any = await usersRepo.findById(query._id);
        return result;
    }

    async getAllUsers(query) {
        const result: any = await usersRepo.findAllUsers(query);
        return result;
    }

    async resetPassword(body, userDetail) {
        const user = await usersRepo.findById(userDetail.id)
        if (!user) throw new NotFound('user not found')
        if (user.isDelete) throw httpErrors(404, 'looks like your account has been deleted, plz contact admin')
        if (!(await bcrypt.compare(body.oldPassword, user.password))) {
            throw new httpErrors(401, 'Wrong oldPassword')
        }
        const hash = await bcrypt.hash(body.newPassword, 10)
        body.password = hash
        body._id = userDetail.id
        const result: any = await usersRepo.resetPassword(body);
        if (user.firstTimeLogin) {
            Promise.resolve(usersRepo.update({ _id: result._id, firstTimeLogin: false }))
        }
        return result
    }


    async loginUser(body) {
        const user: any = await usersRepo.findUserByEmail(body.email)
        if (!user) throw new NotFound('user not found')
        if (user.isDelete) throw httpErrors(404, 'looks like your account has been deleted, plz contact admin')
        if (!(await bcrypt.compare(body.password, user.password))) {
            throw new httpErrors(401, 'Wrong password')
        }
        console.log(user.access)
        user.token = await createJwt(user, user.access)
        return user
    }

}


