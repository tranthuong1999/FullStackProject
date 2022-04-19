import { startSession } from "mongoose";
import { ServerError } from '../common/error';
import { default as CustomerModel } from "../models/Customer";
import UserTokenModel from "../models/UserToken";
import { comparePassword, decodePassword, hashPassword } from '../utils/encryption';
import { signCredentials } from '../utils/jwtHelper';


export default {
  create: async (args: { name: string,email: string; address: string; cccd: string }) => {
    const { name, email, address,cccd } = args;
    const exCustomer = await CustomerModel.findOne({ email });
    if (exCustomer) throw new ServerError({ message: 'This email already exits' });
    const session = await startSession();
    try {
        const result = await CustomerModel.create([{ name, email, address, cccd }], { session });
        await session.endSession();
        return {
          customer: result
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  update: async (args: {id: string, update: string }) => {
    const { id,update} = args;
    console.log('Customer update id:',id);
    console.log('Customer update update:',update);
    const session = await startSession();
    try {
        const exCustomer = await CustomerModel.findByIdAndUpdate(
          id, 
          {update: update},
          { new: true }
        )
        console.log('Customer find id:',exCustomer);
        // await session.endSession();
        return {
          customer: exCustomer
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  }
}
