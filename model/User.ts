import { BaseApp } from "../core/BaseApp";

export class UserDataModel extends BaseApp<any> {
  constructor() {
    super("user");
  }

  async profileParsed(user: any) {
    const result = {
      fullname: user.fristname + " " + user.lastname,
      fristChar: user.fristname ? user.fristname[0].toUpperCase() : user.phone[0]+user.phone[1],
      fristname: user.fristname,
      lastname: user.lastname,
      id: user.id,
      phone: user.phone,
      email: user.email
    };
    this.saveItem(result);
    return result;
  }
}
