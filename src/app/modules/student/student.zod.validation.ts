import { z } from "zod";
// student.model.ts theke model copy kore ene chat gpt theke zod schema create kore nibo

// ** zod er kaj controller e.  student.controller.ts e

// define zod schema for nested structure
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string(),
  lastName: z.string(),
});

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const createStudentValidationZodSchema = z.object({
  body: z.object({
    // id: z.string(),
    password: z.string().max(10),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(["male", "female"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      admissionSemester: z.string(),
      profileImg: z.string(),
    }),
  }),
});

// upate hote pare tai obj hisebe export korchi
export const studentValidations = {
  createStudentValidationZodSchema,
};
