import { Document } from "mongoose";

/**
 *
 * Contains interface model of users module
 *
 **/
export interface Users extends Document {
  name: string;
  email: string;
  password: string;
  access: string;
  organizationID: string;
  firstTimeLogin: boolean;
  createdAt: Date;
  modifiedAt: Date;
  isDelete: boolean;
  isDeleteReason : string
  onboardedOrganizationIds : []
}
