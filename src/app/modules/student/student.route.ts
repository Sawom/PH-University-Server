import express from "express";
import validateRequest from "../../middlewares/validRequest";
import { StudentController } from "./student.controller";
import { updateStudentValidationSchema } from "./student.zod.validation";

// route, controller, service. new route banale sathe sathe controller & service eo update kora lage
const router = express.Router();

// will call controller
// router.post('/create-student', StudentController.createStudent )
// get all student
router.get("/", StudentController.getAllstudents);
// get single student
router.get("/:studentId", StudentController.getSinglestudent);
// delete student
router.delete("/:studentId", StudentController.deleteStudent);
// update student
router.patch(
  "/:studentId",
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;