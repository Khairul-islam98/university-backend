/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // crate a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';
  userData.email = payload.email;

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // set auto generated id
  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file?.path;
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImg = secure_url;
    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};
const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  if (await Faculty.isUserExist(payload.email)) {
    throw new Error(`${payload.email} is already exists`);
  }
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not given, user default password
  userData.password = password || (config.default_pass as string);
  // set student role
  userData.role = 'faculty';
  userData.email = payload.email;
  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(400, 'Academic department is not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set generated id
    userData.id = await generateFacultyId();
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file?.path;
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session });
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImg = secure_url;

    // create a faculty
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not given, user default password
  userData.password = password || (config.default_pass as string);
  // set student role
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set generated id
    userData.id = await generateAdminId();
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file?.path;
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session });
    // create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImage = secure_url;

    // create a admin (transaction - 2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession;
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
