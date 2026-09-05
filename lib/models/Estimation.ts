import mongoose, { Schema, Document, Model } from "mongoose";

export type EstimationStatus =
  | "not_contacted"
  | "contacted"
  | "follow_up"
  | "completed"
  | "cancelled";

export interface IEstimation extends Document {
  estimationId: string;
  name: string;
  phone: string;
  service: string;
  projectType: string;
  dimensionsNotes: string;
  status: EstimationStatus;
  adminNotes?: string;
  contactedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const EstimationSchema = new Schema<IEstimation>(
  {
    estimationId: {
      type: String,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      default: "Valued Client",
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      default: "Glass Railing",
      trim: true,
    },
    projectType: {
      type: String,
      default: "Residential",
      trim: true,
    },
    dimensionsNotes: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "not_contacted",
        "contacted",
        "follow_up",
        "completed",
        "cancelled",
      ],
      default: "not_contacted",
      index: true,
    },
    adminNotes: {
      type: String,
      default: "",
    },
    contactedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate sequential readable estimationId EST-0001, EST-0002...
EstimationSchema.pre("save", async function () {
  if (!this.estimationId) {
    const EstimationModel = this.constructor as Model<IEstimation>;
    const count = await EstimationModel.countDocuments();
    const latest = await EstimationModel.findOne({}, { estimationId: 1 })
      .sort({ createdAt: -1 })
      .lean();

    let nextNumber = count + 1;
    if (latest && latest.estimationId) {
      const match = latest.estimationId.match(/EST-(\d+)/);
      if (match) {
        const lastNum = parseInt(match[1], 10);
        if (!isNaN(lastNum) && lastNum >= nextNumber) {
          nextNumber = lastNum + 1;
        }
      }
    }

    this.estimationId = `EST-${String(nextNumber).padStart(4, "0")}`;
  }
});

const Estimation: Model<IEstimation> =
  mongoose.models.Estimation ||
  mongoose.model<IEstimation>("Estimation", EstimationSchema);

export default Estimation;
