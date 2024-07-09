import  express  from "express";
import { StudentController } from "./student.controller";

// route, controller, service. new route banale sathe sathe controller & service eo update kora lage
const router = express.Router();

// will call controller
router.post('/create-student', StudentController.createStudent )

router.get('/', StudentController.getAllstudents);

router.get('/:studentId', StudentController.getSinglestudent);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;