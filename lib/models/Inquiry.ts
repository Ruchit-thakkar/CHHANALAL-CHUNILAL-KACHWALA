import mongoose, { Schema, Document, Model } from "mongoose";

export type InquiryStatus =
  | "not_contacted"
  | "contacted"
  | "follow_up"
  | "completed"
  | "cancelled";

export interface IInquiry extends Document {
  inquiryId: string;
  name: string;
  phone: string;
  service: string;
  projectDetails: string;
  preferredContact: "Phone Call" | "WhatsApp" | string;
  status: InquiryStatus;
  adminNotes?: string;
  contactedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    inquiryId: {
      type: String,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    service: {
      type: String,
      required: [true, "Service required is required"],
      trim: true,
    },
    projectDetails: {
      type: String,
      required: [true, "Project details are required"],
      trim: true,
    },
    preferredContact: {
      type: String,
      enum: ["Phone Call", "WhatsApp"],
      default: "Phone Call",
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

// Pre-save hook to generate sequential readable inquiryId CCK-0001, CCK-0002...
InquirySchema.pre("save", async function () {
  if (!this.inquiryId) {
    const InquiryModel = this.constructor as Model<IInquiry>;
    const count = await InquiryModel.countDocuments();
    // Fetch highest id to prevent collisions if any were deleted
    const latest = await InquiryModel.findOne({}, { inquiryId: 1 })
      .sort({ createdAt: -1 })
      .lean();

    let nextNumber = count + 1;
    if (latest && latest.inquiryId) {
      const match = latest.inquiryId.match(/CCK-(\d+)/);
      if (match) {
        const lastNum = parseInt(match[1], 10);
        if (!isNaN(lastNum) && lastNum >= nextNumber) {
          nextNumber = lastNum + 1;
        }
      }
    }

    this.inquiryId = `CCK-${String(nextNumber).padStart(4, "0")}`;
  }
});

// Avoid re-compiling model in Next.js hot reload
export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
