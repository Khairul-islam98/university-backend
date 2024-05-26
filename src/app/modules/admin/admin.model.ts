import { Schema } from 'mongoose';
import { TAdmin, TUserName } from './admin.interface';
import { BloodGroup, Gender } from './admin.constant';

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

const adminSchema = new Schema<TAdmin>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  designation: { type: String, required: [true, 'Designation is required'] },
  name: { type: userNameSchema, required: [true, 'Name is required'] },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: { values: Gender, message: '{VALUE} is not a valid gender' },
  },
  dateOfBirth: { type: Date },
  contactNo: { type: String, required: [true, 'contactNo is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'emergencyContact is required'],
  },
  bloodGroup: {
    type: String,
    enum: { values: BloodGroup, message: '{VALUE} is not a valid group' },
  },
  presentAddress: {
    type: String,
    required: [true, 'presentAddress is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'permanentAddress is required'],
  },
  profileImage: { type: String },
  isDeleted: { type: Boolean, default: false },
});
