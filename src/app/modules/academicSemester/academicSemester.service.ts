import { TAcademicSemesterCode } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";


// parameter hisebe 1ta data receive korbe zeta amra payload nam dichi
const createAcademicSemesterIntoDB = async(payload: TAcademicSemesterCode ) =>{
    // semester name er sathe se,ester er code match kortechi zate wrong entry na hoy
    // Autumn = 01, Summar = 02, Fall = 03
    
    // map type declear korlam. key hobe string r za hold korteche oitaw string
    // subidha => infuture semester new add hole type niye pera nai
    type TAcademicSemesterNameCodeMapper = {
        [key: string]: string;
    }

    const academicSemesterNameCodeMapper : TAcademicSemesterNameCodeMapper = {
        Autumn : "01", 
        Summar : "02", 
        Fall : "03",
    }


    const result = await AcademicSemesterModel.create(payload);
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
}