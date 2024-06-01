

import express from 'express'
import { FacultyControllers } from './faculty.controller'
import { updateFacultyValidationSchema } from './faculty.validation'

const router = express.Router()

router.get('/', FacultyControllers.getAllFaculty)
router.get('/:facultyId', FacultyControllers.getSingleFaculty)
router.patch('/:facultyId', validateRequest(updateFacultyValidationSchema), FacultyControllers.updateSingleFaculty)

export const FacultyRoutes = router;