import mongoose, { Schema } from 'mongoose';

const statusSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    color: {
      type: String,
      required: true,
      default: '#3b82f6',
    },
    count: {
      type: Number,
      default: 0,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

statusSchema.index({ userId: 1, name: 1 }, { unique: true });

export default mongoose.model('Status', statusSchema);
