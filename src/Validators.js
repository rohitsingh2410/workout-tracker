var validator = require("validator");

export class Validators {
  static async validateString(data, type) {
    switch (type) {
      case "name":
        if (!validator.isAlpha(data)) {
          return { status: false, message: "please enter alphabets" };
        }
        break;
      case "gender":
        if (!validator.isAlpha(data)) {
          return { status: false, message: "please choose an option" };
        }
        break;
      case "password":
      case "confirm":
        
        if (data.length<=4) {
            return { status: false, message: "Password length is too short" };
          }
        break;
      case "email":
        if (!validator.isEmail(data)) {
          return { status: false, message: "please enter a valid email" };
        }
      default:
        return { status: true, message: "" };
    }

    return { status: true, message: "" };
  }
}
