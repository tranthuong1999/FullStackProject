// import { Date } from "mongoose";

export default class Hotel {
    _id: string;
    image: string;
    codeHotel : string;
    nameHotel : string;
    address : string;
    introduce : string;
    title : string ;
    
    constructor(args: any = {}) {
      this._id = args._id;
      this.image = args.image;
      this.codeHotel = args.codeHotel;
      this.nameHotel = args.nameHotel;
      this.address = args.address;
      this.introduce = args.introduce;
      this.title = args.title ;
    }
  }