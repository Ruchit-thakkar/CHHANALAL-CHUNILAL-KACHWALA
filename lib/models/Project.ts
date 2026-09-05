import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  subtitle?: string;
  locationType?: string;
  aspectRatio?: string;
  specs: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    categorySlug: {
      type: String,
      required: [true, "Category slug is required"],
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
      trim: true,
    },
    locationType: {
      type: String,
      default: "",
      trim: true,
    },
    aspectRatio: {
      type: String,
      default: "aspect-[4/5]",
      trim: true,
    },
    specs: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
