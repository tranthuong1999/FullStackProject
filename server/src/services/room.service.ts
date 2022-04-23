import { startSession } from "mongoose";
import { ServerError } from '../common/error';
import { default as RoomModel } from "../models/Room";
import UserTokenModel from "../models/UserToken";
import { comparePassword, decodePassword, hashPassword } from '../utils/encryption';
import { signCredentials } from '../utils/jwtHelper';
import Room from '../../../models/Room';


export default {
  create: async (args: { name: string, idLocation: string, isStatus: boolean , price : string , idHotel : string  }) => {
    const { name, idLocation , isStatus , price , idHotel} = args;
    // const exRoom = await RoomModel.findOne({ sdt });
    // if (exRoom) throw new ServerError({ message: 'This sdt already exits' });
    const session = await startSession();
    try {
        const result = await RoomModel.create([{name, idLocation , isStatus , price , idHotel}], { session });
        await session.endSession();
        return {
          account: result
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  update: async (args: {id: string, update:Room }) => {
    const { id,update} = args;
    console.log('Customer update id:',id);
    console.log('Customer update update:',update);
    const session = await startSession();
    try {
        const account = await RoomModel.findByIdAndUpdate(
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
  delete: async (args: {id: string, update: Room }) => {
    const { id,update} = args;
    console.log('Delete update id:',id);
    try {
      const account = await RoomModel.findByIdAndDelete(
        id, 
        update,
        // { new: true }
      )
      console.log('Room find id:',account);
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
    const account = await RoomModel.find({})
    console.log('Room find id:',account);

    return { 
      account: account
    }
    //Viet them code vao day
  }
}