import { Types } from "mongoose";

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses?: [TPreRequisiteCourses];
};

// same course multiple faculty nite paren. tai faculty ary nea
export type TCoursefaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
