// import { Date } from "mongoose";

export default class Room {
    _id: string;
    name: string;
    idLocation:string;
    isStatus : boolean;
    price : string;
    idHotel : string;
    
    constructor(args: any = {}) {
      this._id = args._id;
      this.name = args.name;
      this.idLocation = args.idLocation;
      this.isStatus = args.isStatus;
      this.price = args.price;
      this.idHotel = args.idHotel
    }
  }