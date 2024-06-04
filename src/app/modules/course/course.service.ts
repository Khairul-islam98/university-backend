import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCoursesFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //basic course information update
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update course information',
      );
    }
    // check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //filter out the deleted fields
      const deletedPrerequisites = preRequisiteCourses
        ?.filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPrerequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { Course: { $in: deletedPrerequisites } },
          },
        },
        { new: true, runValidators: true, session },
      );
      if (!deletedPrerequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
      // filter out the new couse fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      const newPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session },
      );
      //   console.log(newPreRequisiteCourse);
      if (!newPreRequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCoursesFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true },
  );
  return result;
};
const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoursesFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
