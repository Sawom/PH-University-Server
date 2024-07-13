import { Request, Response } from "express";
import { StudentService } from "./student.service";

// create student 
// user age create korte hobe tai ekhaner function user e niye geche

// get Single student 
const getSinglestudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSinglestudentFromDB(studentId);
    // send response
    res.status(200).json({
      success: true,
      message: "student is get successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

// get all students
const getAllstudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllstudentFromDB();
    // send response
    res.status(200).json({
      success: true,
      message: "students are getting successfully",
      data: result,
    });
  } catch (err: any) {
    // vs code er console.log e error na dekhay ekhn postmane dekhabe
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err,
    });
  }
};

// delete students
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentFromDB(studentId);
    
    // send response
    res.status(200).json({
      success: true,
      message: "student is deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};


export const StudentController = {
  getAllstudents,
  getSinglestudent,
  deleteStudent,
};
