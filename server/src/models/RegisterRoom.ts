import { Document, model, Model, Schema } from "mongoose";
import RegisterRoom from "../../../models/RegisterRoom";

export const registerRoomModelName = 'RegisterRoom';

export interface RegisterRoomDocument extends RegisterRoom, Document {
  _id: string;
}

const registerRoomSchema = new Schema<RegisterRoomDocument>({
  idClient : String,
  idRoom : String ,
  idAccount : String,
  status : Boolean ,
  start : Number ,
  end : Number ,
  total : String ,
  pay :Number
}, {
  versionKey: false,
  timestamps: true
});

const RoomRegisterModel = model(registerRoomModelName, registerRoomSchema);

export default RoomRegisterModel;