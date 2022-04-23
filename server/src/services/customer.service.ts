import { startSession } from "mongoose";
import { ServerError } from '../common/error';
import { default as CustomerModel } from "../models/Customer";
import UserTokenModel from "../models/UserToken";
import { comparePassword, decodePassword, hashPassword } from '../utils/encryption';
import { signCredentials } from '../utils/jwtHelper';
import Customer from '../../../models/Customer';


export default {
  create: async (args: { name: string, address: string , cccd: string , email : string , sdt : string , isMale : string  }) => {
    const { name ,address ,cccd ,email ,sdt ,isMale} = args;
    const exCustomer = await CustomerModel.findOne({ sdt });
    if (exCustomer) throw new ServerError({ message: 'This sdt already exits' });
    const session = await startSession();
    try {
        const result = await CustomerModel.create([{ name ,address ,cccd ,email ,sdt ,isMale}], { session });
        await session.endSession();
        return {
          customer: result
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  update: async (args: {id: string, update:Customer }) => {
    const { id,update} = args;
    console.log('Customer update id:',id);
    console.log('Customer update update:',update);
    const session = await startSession();
    try {
        const customer = await CustomerModel.findByIdAndUpdate(
          id, 
          update,
          { new: true }
        )
        console.log('Customer find id:',customer);
        // await session.endSession();
        return {
          customer: customer
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  delete: async (args: {id: string, update: Customer }) => {
    const { id,update} = args;
    console.log('Delete update id:',id);
    try {
      const customer = await CustomerModel.findByIdAndDelete(
        id, 
        update,
        // { new: true }
      )
      console.log('Customer find id:',customer);
      // await session.endSession();
      return {
        customer: customer
      }
  } catch (error) {
    console.log('error:',error)
    throw new ServerError({ data: -1, message: "Register error (Transaction)" });
  }
    //Viet them code vao day
  },
  get: async (args: { }) => {
    const customer = await CustomerModel.find({})
    console.log('Customer find id:',customer);

    return { 
      customer: customer
    }
    //Viet them code vao day
  }
}