import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

// create academic dpt
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

// populate method impliment.
// model theke ref korte hobe. eta student er sathe connected ache
// get all academic dpt
// ###*************** notes *************####
// reference field er data anar jnno populate method use hoy.
// dhori academicDepartment er moddhe academicFaculty er info amra dekhte cai. 
// cz, 1ta faculty er under e onk gula dept thakte pare.
// tai kon dept kon faculty er under e ta jana lagbe
//  ekhane academicFaculty er data reference kora ache academicDepartment e.
// tai academicFaculty er data dekhar jnno populate method use korchi
const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartmentModel.find().populate(
    "academicFaculty"
  );
  return result;
};

// get single academic dpt
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id).populate(
    "academicFaculty"
  );
  return result;
};

// update academic dpt
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB,
}