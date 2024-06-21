import { Schema, model } from 'mongoose';
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

const adminSchema = new Schema<TAdmin>(
  {
    id: { type: String, required: [true, 'ID is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    designation: { type: String, required: [true, 'Designation is required'] },
    name: { type: userNameSchema, required: [true, 'Name is required'] },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: { values: Gender, message: '{VALUE} is not a valid gender' },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
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
    profileImage: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

adminSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Admin = model<TAdmin>('Admin', adminSchema);
