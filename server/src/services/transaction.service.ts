import { startSession } from "mongoose";
import { ServerError } from '../common/error';
import { default as TransactionModel } from "../models/Transaction";
import UserTokenModel from "../models/UserToken";
import { comparePassword, decodePassword, hashPassword } from '../utils/encryption';
import { signCredentials } from '../utils/jwtHelper';
import Transaction from '../../../models/Transaction';


export default {
  create: async (args: { idRegisterRoom: string, idAccount: string , idService: string , quantity : string , byTime : Date  }) => {
    const { idRegisterRoom , idAccount ,idService , quantity ,byTime} = args;
    // const exTransaction = await TransactionModel.findOne({ sdt });
    // if (exTransaction) throw new ServerError({ message: 'This sdt already exits' });
    const session = await startSession();
    try {
        const result = await TransactionModel.create([{ idRegisterRoom , idAccount ,idService , quantity ,byTime}], { session });
        await session.endSession();
        return {
          transaction: result
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  update: async (args: {id: string, update:Transaction }) => {
    const { id,update} = args;
    console.log('Customer update id:',id);
    console.log('Customer update update:',update);
    const session = await startSession();
    try {
        const transaction = await TransactionModel.findByIdAndUpdate(
          id, 
          update,
          { new: true }
        )
        console.log('Customer find id:',transaction);
        // await session.endSession();
        return {
          transaction: transaction
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  delete: async (args: {id: string, update: Transaction }) => {
    const { id,update} = args;
    console.log('Delete update id:',id);
    try {
      const transaction = await TransactionModel.findByIdAndDelete(
        id, 
        update,
        // { new: true }
      )
      console.log('Transaction find id:',transaction);
      // await session.endSession();
      return {
        transaction: transaction
      }
  } catch (error) {
    console.log('error:',error)
    throw new ServerError({ data: -1, message: "Register error (Transaction)" });
  }
    //Viet them code vao day
  },
  get: async (args: { }) => {
    const transaction = await TransactionModel.find({})
    console.log('Transaction find id:',transaction);

    return { 
      transaction: transaction
    }
    //Viet them code vao day
  }
}