import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
// import { UserServices } from "./user.service";
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

// utils folder theke ashche. oikhane note kora ache
const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
//   const { password, student: studentData } = req.body;
  // req.body dilam cz valiadtion ta hocche route er req.body te
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is created successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
