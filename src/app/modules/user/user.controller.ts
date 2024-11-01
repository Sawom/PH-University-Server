import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";

// utils folder theke ashche. oikhane note kora ache
const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student is created successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
