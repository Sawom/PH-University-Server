import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Student } from "../student/student.interface";
import { ModelofStudent } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: Student) => {
  //    create user obj
  const userData: Partial<TUser> = {};
  // id, password optional rakhar jnno and TUser k use korar jnno *partial use korche

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // id generated function
  // year, semester, 4digit number
  const generateStudentId = (payload: TAcademicSemester)=>{

  }

  // set generated id from function
  userData.id = generateStudentId();

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference id
    const newStudent = await ModelofStudent.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
