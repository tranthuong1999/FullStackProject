// import { Date } from "mongoose";

export default class Service {
  _id: string;
  name: String;
  price: String;

  constructor(args: any = {}) {
    this._id = args._id;
    this.name = args.name;
    this.price = args.price;
  }
}
