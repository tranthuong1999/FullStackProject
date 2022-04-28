// import { Date } from "mongoose";

export default class RegisterRoom {
    _id: string;
    idClient: string;
    idRoom : string;
    idAccount : string ;
    status : boolean;
    start: Date;
    end : Date;
    total : String;
    pay : Number

    constructor(args: any = {}) {
      this._id = args._id;
      this.idClient = args.idClient;
      this.idRoom = args.idRoom;
      this.idAccount = args.idAccount;
      this.status = args.status ;
      this.start = args.start;
      this.end = args.end;
      this.total = args.total;
      this.pay = args.pay ;
    }
  }