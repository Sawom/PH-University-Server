// import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    // send response with a message
    res.status(200).json({
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
    next(err)

  }
};

export const UserControllers = {
  createStudent,
};
