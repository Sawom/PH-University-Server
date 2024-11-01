// import httpStatus from 'http-status';
import { RequestHandler } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    // send response with a message
    // res.status(200).json({
    //   success: true,
    //   message: "student is created successfully",
    //   data: result,
    // });

    // controller evabeo kora zay abar student er controller e zevabe ache oivabeo hoy
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "student is created successfully",
      data: result,
    });
  } catch (err: any) {
    // res.status(500).json({
    //   success: false,
    //   // simple message update. instance method user exists
    //   message: err.message || "something went wrong",
    //   error: err,
    // });

    // err handle alternative way
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
