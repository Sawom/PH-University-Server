// id generated function

import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

// year, semester, 4digit number
export const generateStudentId = (payload: TAcademicSemester) => {
    // 1st time id 0000 theke start hoye +1 kore barbe
    // 4digit er number niye bakigula 0 boshay dibo
    const currentId = (0).toString().padStart(4,'0')


};

//admissionSemester e academicSemester id ta reference hisebe ache.
// admissionSemester er id diye user mane student er info find kortechi
// set generated id from function
userData.id = generateStudentId()
