import mongoose, { Schema }  from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";

const semesterRegestrationSchema = new mongoose.Schema<TSemesterRegistration>(
    {
        academicSemester:{
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'AcademicSemester',
        },
        status:{
            type: String,
            enum: SemesterRegistration
        }

    }
)

