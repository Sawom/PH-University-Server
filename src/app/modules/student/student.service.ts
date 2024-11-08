// service e all business logic thakbe
// service database e query calabe
import { ModelofStudent } from "./student.model";

//**** */ user e student create kortechi tai eta lagbe na
// ###populate notes### academicDepertment.service.ts file e dea ache
// zehetu 2ta field k populate kortechi tai chaining kortechi.
// mane 1ta populate sesh hole r 1ta lej lagay dite hobe
const getAllstudentFromDB = async () => {
  const result = await ModelofStudent.find()
    .populate("admissionSemester")
    // academicDepartment ta academicFaculty k refer kore.
    // ejnno academicDepartment er path bole dichi
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  return result;
};

// id diye zodi instance korte cai tahole,
const getSinglestudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({id}); // id ta student id
  // aggregate o caile kora zay

  const result = await ModelofStudent.findById(id)
    .populate("admissionSemester")
    // academicDepartment ta academicFaculty k refer kore.
    // ejnno academicDepartment er path bole dichi
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
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
