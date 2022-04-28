import { startSession } from "mongoose";
import { ServerError } from '../common/error';
import { default as HotelModel } from "../models/Hotel";
import UserTokenModel from "../models/UserToken";
import { comparePassword, decodePassword, hashPassword } from '../utils/encryption';
import { signCredentials } from '../utils/jwtHelper';
import Hotel from '../../../models/Hotel';


export default {
  create: async (args: { image: string, codeHotel: string , nameHotel: string , address : string , introduce : string , title :string  }) => {
    const { image , codeHotel, nameHotel , address, introduce ,title} = args;
    console.log("create hotel ")
    // const exHotel = await HotelModel.findOne({ sdt });
    // if (exHotel) throw new ServerError({ message: 'This sdt already exits' });
    const session = await startSession();
    try {
        const result = await HotelModel.create([{ image , codeHotel, nameHotel , address, introduce ,title}], { session });
        await session.endSession();
        return {
          hotel: result
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  update: async (args: {id: string, update:Hotel }) => {
    const { id,update} = args;
    console.log('Customer update id:',id);
    console.log('Customer update update:',update);
    const session = await startSession();
    try {
        const hotel = await HotelModel.findByIdAndUpdate(
          id, 
          update,
          { new: true }
        )
        console.log('Customer find id:',hotel);
        // await session.endSession();
        return {
          hotel: hotel
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  delete: async (args: {id: string, update: Hotel }) => {
    const { id,update} = args;
    console.log('Delete update id:',id);
    try {
      const hotel = await HotelModel.findByIdAndDelete(
        id, 
        update,
        // { new: true }
      )
      console.log('Hotel find id:',hotel);
      // await session.endSession();
      return {
        hotel: hotel
      }
  } catch (error) {
    console.log('error:',error)
    throw new ServerError({ data: -1, message: "Register error (Transaction)" });
  }
    //Viet them code vao day
  },
  get: async (args: { }) => {
    const hotel = await HotelModel.find({})
    console.log('Hotel find id:',hotel);

    return { 
      hotel: hotel
    }
    //Viet them code vao day
  }
}