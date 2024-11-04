import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { Student } from "../student/student.interface";
import { ModelofStudent } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

// studentData er nam dichi payload
const createStudentIntoDB = async (password: string, payload: Student) => {
  //    create user obj
  const userData: Partial<TUser> = {};
  // id, password optional rakhar jnno and TUser k use korar jnno *partial use korche

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  //admissionSemester e academicSemester id ta reference hisebe ache.
  // admissionSemester er id diye user mane student er info find kortechi
  // set generated id function
  userData.id = await generateStudentId(admissionSemester);

  // create a user
  const newUser = await User.create(userData);

  // create a student 
  if (Object.keys(newUser).length) {
    // set id, _id as user

    // studentData er nam dichi payload
    payload.id = newUser.id;
    payload.user = newUser._id; //***  reference id
    const newStudent = await ModelofStudent.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
