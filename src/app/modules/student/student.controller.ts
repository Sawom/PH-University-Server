import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { StudentService } from "./student.service";

// create student
// user age create korte hobe tai ekhaner function user e niye geche

// async function 1ta promise return kore. promise resolve hobe na hole error
//  ta catch block e return korbe & global error handler er moddhe pathay dicchi.
// bar bar try catch na likhe catchAsync likhlam

// catchAsync 1ta higher order function. mane 1ta function parameter hisebe receive kore r return o kore 1ta function
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

//** get Single student
const getSinglestudent = catchAsync(async (req, res, next) => {
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
const getAllstudents: RequestHandler = catchAsync(async (req, res, next) => {
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
const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
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
