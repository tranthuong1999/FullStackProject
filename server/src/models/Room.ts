import { Document, model, Model, Schema } from "mongoose";
import Room from "../../../models/Room";

export const roomModelName = 'Room';

export interface RoomDocument extends Room, Document {
  _id: string;
}

const roomSchema = new Schema<RoomDocument>({
    name: String,
    idLocation:String,
    isStatus : Boolean,
    price : String,
    idHotel : String,
  
}, {
  versionKey: false,
  timestamps: true
});

const RoomModel = model(roomModelName, roomSchema);

export default RoomModel;