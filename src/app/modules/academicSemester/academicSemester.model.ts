import { Schema, model } from "mongoose";
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constant";



const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: Date,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemesterModel = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
