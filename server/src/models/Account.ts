import { Document, model, Model, Schema } from "mongoose";
import Account from "../../../models/Account";

export const accountModelName = 'Account';

export interface AccountDocument extends Account, Document {
  _id: string;
}

const accountSchema = new Schema<AccountDocument>({
  name: String,
  sdt:String,
  dateOfBird:String,
  password: String,
  idPosition: String
}, {
  versionKey: false,
  timestamps: true
});

const AccountModel = model(accountModelName, accountSchema);

export default AccountModel;