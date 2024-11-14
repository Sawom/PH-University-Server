import QueryBuilder from "../../builder/QueryBuilder"
import { FacultySearchableFields } from "./faculty.constant"
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model"

// get all faculty
const getAllFacultiesFromDB = async(query: Record<string, unknown>)=>{
    const facultyQuery = new QueryBuilder(
        Faculty.find().populate('academicDepartment'),
        query,
    ).search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await facultyQuery.modelQuery;
    return result;
}

// get single faculty
const getSingleFacultyFromDB = async(id: string) =>{
    const result = await Faculty.findById(id).populate('academicDepartment');
    return result;
}

// update faculty
const updateFacultyIntoDB = async(id: string, payload: Partial<TFaculty>) =>{

    
}