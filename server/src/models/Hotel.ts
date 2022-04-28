import { Document, model, Model, Schema } from "mongoose";
import Hotel from "../../../models/Hotel";

export const hotelModelName = 'Hotel';

export interface HotelDocument extends Hotel, Document {
  _id: string;
}

const hotelSchema = new Schema<HotelDocument>({
    image: String,
    codeHotel: String,
    nameHotel : String,
    address:String,
    introduce:String,
    title: String
}, {
  versionKey: false,
  timestamps: true
});

const HotelModel = model(hotelModelName, hotelSchema);

export default HotelModel;