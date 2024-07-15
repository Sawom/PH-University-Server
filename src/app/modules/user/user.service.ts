import config from "../../config";
import { Student } from "../student/student.interface";
import { NewUser, TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: Student) => {
    //    create user obj
    const userData : Partial<TUser> = {};
    // id, password optional rakhar jnno and TUser k use korar jnno *partial use korche
   
    // if password is not given, use default password
    userData.password = password || ( config.default_password as string ) ;
    

    // set student role
    userData.role = 'student';

    // set manually generated id
    userData.id = '2030100001';

    // create a user
    const result = await User.create(userData);
    
    // create a student
    if( Object.keys(result).length){
        // set id, _id as user
        studentData.id = result.id;

    }
    
    
    return result;
};

export const UserServices = {
  createStudentIntoDB,
};