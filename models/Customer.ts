export default class Customer {
  _id: string;
  name: string;
  address: string;
  cccd: string;
  email: string;
  constructor(args: any = {}) {
    this._id = args._id;
    this.name = args.name;
    this.address = args.address;
    this.cccd = args.cccd;
    this.email = args.email;
  }
}