import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";

// create faculty
const createAcademicFacultyIntoDB = async(payload: TAcademicFaculty ) =>{
    const result = await AcademicFacultyModel.create(payload);
    return result;
}

// getall faculty
const getAllAcademicFacultiesFromDB = async() =>{
    const result = await AcademicFacultyModel.find();
  return result;
}

// single faculty load
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};

// update faculty load
const updateAcademicFacultyIntoDB = async( id: string, payload: Partial<TAcademicFaculty> ) =>{
    const result = await AcademicFacultyModel.findOneAndUpdate({_id: id}, payload,{
        new: true,
    })
    return result;
}

export const AcademicFacultyServices ={
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}