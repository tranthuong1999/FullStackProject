// import { Date } from "mongoose";

export default class Account {
    _id: string;
    name: string;
    sdt:string;
    dateOfBird: string;
    password: string;
    idPosition : string

    
    constructor(args: any = {}) {
      this._id = args._id;
      this.name = args.name;
      this.sdt = args.sdt;
      this.dateOfBird = args.dateOfBird;
      this.password = args.password;
      this.idPosition = args.isPosition
    }
  }