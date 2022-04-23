import { Document, model, Model, Schema } from "mongoose";
import Customer from "../../../models/Customer";

export const customerModelName = 'Customer';

export interface CustomerDocument extends Customer, Document {
  _id: string;
}

const customerSchema = new Schema<CustomerDocument>({
  name: String,
  address: String,
  cccd: String,
  email: String,
  sdt: String,
  isMale:String,
}, {
  versionKey: false,
  timestamps: true
});

const CustomerModel = model(customerModelName, customerSchema);

export default CustomerModel;