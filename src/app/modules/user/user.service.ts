import { TUser } from "./user.interface";

const createStudentIntoDB = async (studentData: TUser) => {
  // 1st time
  // const result = await StudentModel.create(studentData); // build in static method
  // return result;
  // instance use korle uporer line ta katte hoy cz oita static method


  //**  custom instance method
  // step 4. implimentation update
  // student = instance
  const student = new StudentModel(studentData); // create an  Instance
  if (await student.isUserExists(studentData.id)) {
    throw new Error("user has already exists");
  }
  const result = await student.save(); // built in instance method
  return result;
};