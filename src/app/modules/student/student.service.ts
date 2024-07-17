// service e all business logic thakbe
// service database e query calabe
import { Student } from "./student.interface";
import { ModelofStudent } from "./student.model";

// const createStudentIntoDB = async (studentData: Student) => {
//   // 1st time
//   // const result = await StudentModel.create(studentData); // build in static method
//   // return result;
//   // instance use korle uporer line ta katte hoy cz oita static method


//   //**  custom instance method
//   // step 4. implimentation update
//   // student = instance
//   const student = new StudentModel(studentData); // create an  Instance
//   if (await student.isUserExists(studentData.id)) {
//     throw new Error("user has already exists");
//   }
//   const result = await student.save(); // built in instance method
//   return result;
// };

//**** */ user e student create kortechi tai eta lagbe na

const getAllstudentFromDB = async () => {
  const result = await ModelofStudent.find();
  return result;
};


// id diye zodi instance korte cai tahole, 
const getSinglestudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({id}); // id ta student id
  // aggregate o caile kora zay
  const userIdNumber = Number(id);
  const result1 = await ModelofStudent.aggregate([{ $match: { id: id } }]);
  return result1;
};

// delete
const deleteStudentFromDB = async (id: string) => {
  const result = await ModelofStudent.updateOne({ id }, { isDeleted: true }); // id ta student id
  return result;
};

export const StudentService = {
  getAllstudentFromDB,
  getSinglestudentFromDB,
  deleteStudentFromDB,
};
