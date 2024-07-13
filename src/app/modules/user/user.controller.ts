import { UserServices } from "./user.service";
import { Student } from "../student/student.interface";
import { User } from "./user.model";

const createStudent = async (req: Request, res: Response) => {
  try {
    const {password: string, studentData: Student} = req.body;
    const result = await UserServices.createStudentIntoDB( password, studentData);

    // send response with a message
    res.status(200).json({
      success: true,
      message: "student is created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      // simple message update. instance method user exists
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};