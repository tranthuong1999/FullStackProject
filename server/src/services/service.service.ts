import { startSession } from "mongoose";
import { ServerError } from '../common/error';
import { default as ServiceModel } from "../models/Service";
import UserTokenModel from "../models/UserToken";
import { comparePassword, decodePassword, hashPassword } from '../utils/encryption';
import { signCredentials } from '../utils/jwtHelper';
import Service from '../../../models/Service';


export default {
  create: async (args: { name: string, price : string  }) => {
    const { name, price} = args;
    // const exService = await ServiceModel.findOne({ sdt });
    // if (exService) throw new ServerError({ message: 'This sdt already exits' });
    const session = await startSession();
    try {
        const result = await ServiceModel.create([{ name, price}], { session });
        await session.endSession();
        return {
          service: result
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  update: async (args: {id: string, update:Service }) => {
    const { id,update} = args;
    console.log('Customer update id:',id);
    console.log('Customer update update:',update);
    const session = await startSession();
    try {
        const service = await ServiceModel.findByIdAndUpdate(
          id, 
          update,
          { new: true }
        )
        console.log('Customer find id:',service);
        // await session.endSession();
        return {
          service: service
        }
    } catch (error) {
      console.log('error:',error)
      throw new ServerError({ data: -1, message: "Register error (Transaction)" });
    }
  },
  delete: async (args: {id: string, update: Service }) => {
    const { id,update} = args;
    console.log('Delete update id:',id);
    try {
      const service = await ServiceModel.findByIdAndDelete(
        id, 
        update,
        // { new: true }
      )
      console.log('Service find id:',service);
      // await session.endSession();
      return {
        service: service
      }
  } catch (error) {
    console.log('error:',error)
    throw new ServerError({ data: -1, message: "Register error (Transaction)" });
  }
    //Viet them code vao day
  },
  get: async (args: { }) => {
    const service = await ServiceModel.find({})
    console.log('Service find id:',service);

    return { 
      service: service
    }
    //Viet them code vao day
  }
}