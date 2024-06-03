import { Schema, model } from 'mongoose';
import { TCourse } from './course.interface';


const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unqiue: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [
    {
      course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  }
},{
  timeStamps: true,
})


export const Course = model<TCourse>('Course', courseSchema)