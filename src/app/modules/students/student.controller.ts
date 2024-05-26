import { StudentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrive successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrive successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is  Deleted successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const studentData = req.body;
  const result = await StudentServices.updateStudentfromDB(
    studentId,
    studentData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is  update successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
