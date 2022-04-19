import { startSession } from "mongoose";
import { ServerError } from '../common/error';
import { default as CustomerModel } from "../models/Customer";
import UserTokenModel from "../models/UserToken";
import { comparePassword, decodePassword, hashPassword } from '../utils/encryption';
import { signCredentials } from '../utils/jwtHelper';


export default {
  create: async (args: { name: string,email: string; address: string; cccd: string }) => {
    const { name, email, address,cccd } = args;
    console.log('Customer service create:', args)
    const exCustomer = await CustomerModel.findOne({ where: { email } });
    console.log('exCustomer:',exCustomer);
    if (exCustomer) throw new ServerError({ message: 'This email already exits' });
    const session = await startSession();
    try {
      const result = await CustomerModel.create([{ name, email, address, cccd }], { session });
      console.log('Create customer result:', result)
      await session.commitTransaction();
      session.endSession();
      // return {
      //   customerId: customer._id,
      //   email
      // }
    } catch (error) {
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  }
}
