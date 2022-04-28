import { Document, model, Model, Schema } from "mongoose";
import Service from "../../../models/Service";

export const serviceModelName = 'Service';

export interface ServiceDocument extends Service, Document {
  _id: string;
}

const serviceSchema = new Schema<ServiceDocument>({
    name: String,
    price:String
}, {
  versionKey: false,
  timestamps: true
});

const ServiceModel = model(serviceModelName, serviceSchema);

export default ServiceModel;