// ##### transaction & rollback implimented #####

import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { Student } from "../student/student.interface";
import { ModelofStudent } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

// studentData er nam dichi payload
const createStudentIntoDB = async (password: string, payload: Student) => {
  // create user obj
  const userData: Partial<TUser> = {};
  // id, password optional rakhar jnno and TUser k use korar jnno *partial use korche

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester
  );

  //** */ transaction & rollback
  // concept: zodi data add korar somoy database er nam thake or match kore tahole data add hobe mane write hobe
  // otherwise hobe na. ejnno 2ta seassion banate hobe
  // 1sathe 2ta collection e operation kora zay
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //admissionSemester e academicSemester id ta reference hisebe ache.
    // admissionSemester er id diye user mane student er info find kortechi
    // set generated id function
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session }); // transaction user er jnno array. age obj chilo

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // set id, _id as user
    // studentData er nam dichi payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //***  reference id

    // create a student (transaction - 2)
    const newStudent = await ModelofStudent.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction(); // commit korle data database e permanently save hoy
    await session.endSession(); // endSession korlam

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
