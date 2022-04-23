import { startSession } from "mongoose";
import { ServerError } from '../common/error';
import { default as RegisterRoomModel } from "../models/RegisterRoom";
import UserTokenModel from "../models/UserToken";
import { comparePassword, decodePassword, hashPassword } from '../utils/encryption';
import { signCredentials } from '../utils/jwtHelper';
import RegisterRoom from '../../../models/RegisterRoom';


export default {
  create: async (args: { idClient: string, idRoom: string , idAccount: string , status : boolean , start : string , end : string , total : string ,pay : string  }) => {
    const { idClient, idRoom ,idAccount ,status,start,end, total , pay} = args;
    // const exRegisterRoom = await RegisterRoomModel.findOne({ sdt });
    // if (exRegisterRoom) throw new ServerError({ message: 'This sdt already exits' });
    const session = await startSession();
    try {
        const result = await RegisterRoomModel.create([{ idClient, idRoom ,idAccount ,status,start,end, total , pay}], { session });
        await session.endSession();
        return {
          customer: result
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  update: async (args: {id: string, update:RegisterRoom }) => {
    const { id,update} = args;
    console.log('RegisterRoom update id:',id);
    console.log('RegisterRoom update update:',update);
    const session = await startSession();
    try {
        const customer = await RegisterRoomModel.findByIdAndUpdate(
          id, 
          update,
          { new: true }
        )
        console.log('RegisterRoom find id:',customer);
        // await session.endSession();
        return {
          customer: customer
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  delete: async (args: {id: string, update: RegisterRoom }) => {
    const { id,update} = args;
    console.log('Delete update id:',id);
    try {
      const customer = await RegisterRoomModel.findByIdAndDelete(
        id, 
        update,
        // { new: true }
      )
      console.log('RegisterRoom find id:',customer);
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
    const customer = await RegisterRoomModel.find({})
    console.log('RegisterRoom find id:',customer);

    return { 
      customer: customer
    }
    //Viet them code vao day
  }
}