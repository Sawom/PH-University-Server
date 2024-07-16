// **validation er kaj gula model e kore**
//**** */ password bcrypt er kaj o model ei********
// create schema and model here
// required: true, maxlength etc..  >> mane eta build in validation
import { Schema, model } from "mongoose";
import validator from "validator";

import {
  Guardian,
  LocalGuardian,
  Student,
  StudentInstanceModel,
  StudentMethods,
  UserName,
} from "./student.interface";
// password bcrypt er kaj
import bcrypt from "bcrypt";
import config from "../../config";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    // mongoose er type capital hoy.like String,
    // ts e all small. like string
    required: [true, "first name is required"],
    trim: true, // space remove kore samne piche thakle
    // custom error msg.
    maxlength: [20, "first name can not be more than 20 character"],

    // custom validate by function
    // joi, zod third party validation library use korle custom validation er dorkar nai.

    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1); //first name 'Sawom' emn hobe
    //     if (value !== firstNameStr) {
    //       return false;
    //     }
    //     return true;
    //   },
    //   message: "{VALUE} is not in capitalize format",
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "last name is required"],

    // validate by validator library
    // npm i validator
    // npm i -D @types/validator
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//**  custom instance method
// step 3. model e update (instant method rest part)
// StudentInstanceModel, StudentMethods ..... egula parameter hisebe add kore dite hoy
const studentSchema = new Schema<Student, StudentInstanceModel, StudentMethods>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    // user
    user:{
      type: Schema.Types.ObjectId,
      required: [true, "user ID is required"],
      unique: true,
      ref: 'User', // student er sathe user er connect korar jnno
    },
    password: {
      type: String,
      required: [true, "password is required"],
      maxlength: [10, "password can not be more than 10 characters"],
    },
    // id duplicate na howar jnno unique use kora
    name: {
      type: userNameSchema,
      required: true,
    },
    // enum type
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not valid",
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate by validator library

      // validate:{
      //   validator: (value: string) => validator.isEmail(value),
      //   message: "{VALUE} is not a valid email type",
      // },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuradianSchema,
      required: true,
    },
    profileImg: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    //** virtual data on thake na. on kore nite hoy ***
    toJSON: {
      virtuals: true,
    },
    
  }
);
// // {
//   toJSON:{
//     virtuals: true,
//   }
// } *** virtual data on thake na. on kore nite hoy

//*******  virtual data *************
//******  virtual data: zei data direct database e nai, but ami just client side e dekhaite cai emn data k database theke ene dekhay dea.
// example: database e fullname nam e kichu nai. but 1stname , middle, last name ache. tai tinta milay ami fullname dekhabo.. eta virtual data.
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} + ${this.name.middleName} + ${this.name.lastName}`;
});

// **********password bcrypt****************
// model er baire kaj nai
// interface r model e password field add kora lagbe
// *** pre hook middleware hook use kore password k database e save korar age hashing korlam
// password hashing
// pre save middleware/hook: will work on create() save()
studentSchema.pre("save", async function (next) {
  console.log(this, "pre hook: we have saved data");
  // hashing password and save to db.
  // hasssing bolte real password ta save kore na db te.
  const user = this;
  // BCRYPT_SALT_ROUNDS .env file e ekta score dite hobe.
  // erpor index.ts theke export korte hobe.
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//***  post save middleware/hook *** password empty kore dibo
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
  console.log(this, "post hook: we have saved data");
}); // pass empty done

//***  query middleware*******
// ei function diye delete howa data gula dekhabo na.
// amra actually data remove kortechi na. data zokhn delete hobe tokhn isDelete: true kore ekta flag e on rakhbo. data ta show korbo na.
// data remove korle datar consistency nosto hoy tai data ta hide kore rakhbo zate show na kore delete howa data
studentSchema.pre("find", function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } }); // current query k bujhabe
  next();
});

// find_one er opr delete kaj kore. mane findone query calay dile delete howa data pawa zay.
//  eijnno findone er opr eo 'pre' calabo zeno delete howa data pawa na zay
studentSchema.pre("findOne", function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } }); // current query k bujhabe
  next();
});

// findone e delete howa data dicche na but aggregate e abar data dey. tai etaw prevent korte hobe.
// zeno aggregate korleo delete howa data na ashe
studentSchema.pre("aggregate", function (next) {
  // console.log(this);
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // current query k bujhabe
  // unshift korle 1st e add hoy. zegula delete = true hoy seigula age 1ta ary te add hoye then delete hobe
  next();
});
// end (delete howa data gula dekhabo na)

//**  custom instance method
// step 4. implimentation
studentSchema.methods.isUserExists = async function (id: string | number) : Promise<Student | null> {
  const existingUser = await StudentModel.findOne({ id: id });
  return existingUser;
};
// step 4. implementation... little kaj
// StudentModel update: StudentInstanceModel add kora lagbe
export const StudentModel = model<Student, StudentInstanceModel>(
  "Student",
  studentSchema
);
