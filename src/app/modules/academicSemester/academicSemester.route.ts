import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

// create semester
router.post('/create-academic-semester', validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester, )

// get single semester
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);

// update semester
router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

// get all data academ
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router;