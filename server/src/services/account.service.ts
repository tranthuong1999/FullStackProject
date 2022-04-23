import { startSession } from "mongoose";
import { ServerError } from '../common/error';
import { default as AccountModel } from "../models/Account";
import UserTokenModel from "../models/UserToken";
import { comparePassword, decodePassword, hashPassword } from '../utils/encryption';
import { signCredentials } from '../utils/jwtHelper';
import Account from '../../../models/Account';


export default {
  create: async (args: { name: string, sdt: string , dateOfBird: string , password : string , idPosition : string  }) => {
    const { name, sdt , dateOfBird , password , idPosition} = args;
    const exAccount = await AccountModel.findOne({ sdt });
    if (exAccount) throw new ServerError({ message: 'This sdt already exits' });
    const session = await startSession();
    try {
        const result = await AccountModel.create([{ name, sdt , dateOfBird , password , idPosition}], { session });
        await session.endSession();
        return {
          account: result
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  update: async (args: {id: string, update:Account }) => {
    const { id,update} = args;
    console.log('Customer update id:',id);
    console.log('Customer update update:',update);
    const session = await startSession();
    try {
        const account = await AccountModel.findByIdAndUpdate(
          id, 
          update,
          { new: true }
        )
        console.log('Customer find id:',account);
        // await session.endSession();
        return {
          account: account
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  delete: async (args: {id: string, update: Account }) => {
    const { id,update} = args;
    console.log('Delete update id:',id);
    try {
      const account = await AccountModel.findByIdAndDelete(
        id, 
        update,
        // { new: true }
      )
      console.log('Account find id:',account);
      // await session.endSession();
      return {
        account: account
      }
  } catch (error) {
    console.log('error:',error)
    throw new ServerError({ data: -1, message: "Register error (Transaction)" });
  }
    //Viet them code vao day
  },
  get: async (args: { }) => {
    const account = await AccountModel.find({})
    console.log('Account find id:',account);

    return { 
      account: account
    }
    //Viet them code vao day
  }
}