import mongoose, { Schema, Document } from 'mongoose';

interface ICourse extends Document {
  name: string;
  code: string;
  instructor: string;
  description?: string;
  credits: number;
  schedule?: string;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    credits: {
      type: Number,
      required: true,
    },
    schedule: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model<ICourse>('Course', courseSchema);
