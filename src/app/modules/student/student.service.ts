// ### transaction & rollback implimented ###
// service e all business logic thakbe
// service database e query calabe
import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { ModelofStudent } from "./student.model";

//**** */ user e student create kortechi tai eta lagbe na
// ###populate notes### academicDepertment.service.ts file e dea ache
// zehetu 2ta field k populate kortechi tai chaining kortechi.
// mane 1ta populate sesh hole r 1ta lej lagay dite hobe
const getAllstudentFromDB = async () => {
  const result = await ModelofStudent.find()
    .populate("admissionSemester")
    // academicDepartment ta academicFaculty k refer kore.
    // ejnno academicDepartment er path bole dichi
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  return result;
};

// get a single student
// id diye zodi instance korte cai tahole,
const getSinglestudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({id}); // id ta student id
  // aggregate o caile kora zay

  const result = await ModelofStudent.findOne({id})
    .populate("admissionSemester")
    // academicDepartment ta academicFaculty k refer kore.
    // ejnno academicDepartment er path bole dichi
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

// update student 
const updateStudentFromDB = async (id: string) => {

  const result = await ModelofStudent.findOne({id})
    
  return result;
};

// delete
// transaction & rollback implimented********
// user & student collection 2ta connected. student delete korle user o delete korte hobe.
// 2ta collection e 1sathe delete operation colbe. eijnno transaction & rollback use korchi.
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // mongoose er nijer _id zodi use kori tahole findById usekorte hobe.
    // amader generate kora id zodi use kori then findOneAndUpdate use korte hobe.
    // ekhane amader generate kora id use kore delete korbo tai findOneAndUpdate use korchi.

    // delete student
    const deletedStudent = await ModelofStudent.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    ); // id ta student id

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    // delete user
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction(); // commit korle data database e permanently save hoy
    await session.endSession(); // then endSession korte hoy

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentService = {
  getAllstudentFromDB,
  getSinglestudentFromDB,
  deleteStudentFromDB,
};
