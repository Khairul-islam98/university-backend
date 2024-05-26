import { Schema } from 'mongoose';
import { TFaculty, TUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxLength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    maxLength: [20, 'Name can not be more than 20 characters'],
  },
});

const facultySchema = new Schema<TFaculty>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  designation: { type: String, required: [true, 'Designation is required'] },
  name: { type: userNameSchema, required: [true, 'Name is required'] },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: { values: Gender, message: '{VALUE} is not a valid gender' },
  },
  dateOfBirth: { type: Date },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: { values: BloodGroup, message: '{VALUE} is not a valid group' },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  profileImg: { type: String },
  isDeleted: { type: Boolean, default: false },
});
