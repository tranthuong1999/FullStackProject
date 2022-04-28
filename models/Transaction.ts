// import { Date } from "mongoose";

export default class Room {
    _id: string;
    idRegisterRoom : string;
    idAccount : string;
    idService : string;
    quantity : string;
    byTime : Date;

   
    
    constructor(args: any = {}) {
      this._id = args._id;
      this.idRegisterRoom = args.idRegisterRoom;
      this.idAccount = args.idAccount;
      this.idService = args.idService;
      this.quantity = args.quantity;
      this.byTime = args.byTime;
    }
  }