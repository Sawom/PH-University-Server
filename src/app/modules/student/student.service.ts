// service e all business logic thakbe
// service database e query calabe
import { Student } from "./student.interface";
import { ModelofStudent } from "./student.model";

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
