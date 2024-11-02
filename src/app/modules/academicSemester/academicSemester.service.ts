import { TAcademicSemesterCode } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";


// parameter hisebe 1ta data receive korbe zeta amra payload nam dichi
const createAcademicSemesterIntoDB = async(payload: TAcademicSemesterCode ) =>{
    const result = await AcademicSemesterModel.create(payload);
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
}