import { Document, model, Model, Schema } from "mongoose";
import Transaction from "../../../models/Transaction";

export const transactionModelName = 'Transaction';

export interface TransactionDocument extends Transaction, Document {
  _id: string;
}

const transactionSchema = new Schema<TransactionDocument>({
    idRegisterRoom : String,
    idAccount : String,
    idService : String,
    quantity : String,
    byTime : Date
}, {
  versionKey: false,
  timestamps: true
});

const TransactionModel = model(transactionModelName, transactionSchema);

export default TransactionModel;