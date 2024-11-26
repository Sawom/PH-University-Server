// ##### transaction & rollback implimented #####
// ##### Student, faculty, admin => ri 3 type e user. tai shob type er user k user.service e create kore id generate kore nicchi
import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TFaculty } from "../Faculty/faculty.interface";
import { Faculty } from "../Faculty/faculty.model";
import { Student } from "../student/student.interface";
import { ModelofStudent } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utils";

// studentData er nam dichi payload
const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: Student
) => {
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

  if (!admissionSemester) {
    throw new AppError(400, "Admission semester not found");
  }

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
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// create faculty
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generated id
    userData.id = await generateFacultyId();

    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session }); // array

    // create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference id

    // create a faculty (transaction-2)
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  
};
