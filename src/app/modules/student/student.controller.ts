import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentService } from "./student.service";

// create student
// user age create korte hobe tai ekhaner createStudent function user.controller e niye geche

//** get Single student
const getSinglestudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getSinglestudentFromDB(studentId);
  // send response er kaj controller e evabeo kora zay.
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student is get successfully",
    data: result,
  });
});

//**  get all students
const getAllstudents: RequestHandler = catchAsync(async (req, res) => {
  // req, res. next er type alada declear na kore 1bare RequestHandler dileo hobe. same kaj

  const result = await StudentService.getAllstudentFromDB();
  // send response er kaj controller e evabeo kora zay.
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "students are getting successfully",
    data: result,
  });
});

// delete students
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteStudentFromDB(studentId);

  // send response er kaj controller e evabeo kora zay.
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "students is deleted successfully",
    data: result,
  });
});

export const StudentController = {
  getAllstudents,
  getSinglestudent,
  deleteStudent,
};
