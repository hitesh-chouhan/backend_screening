import { Schema, model } from "mongoose";
import { Users } from "./users.interface";

/**
 *
 * Contains database schema of users module
 *
 **/

// Users collection
const usersTable = "users"

const usersSchema = new Schema<Users>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    access: { type: String, enum: ["superAdmin", "admin", "editor", "viewer"] },
    organizationID: { type: String, required:true },       //must assign a valid organizationID
    firstTimeLogin: { type: Boolean, default: true },
    createdAt: { type: Date },
    modifiedAt: { type: Date },
    isDelete: { type: Boolean, default: false },
    isDeleteReason: { type: String },
});

export const UsersModel = model<Users>(usersTable, usersSchema, usersTable);
