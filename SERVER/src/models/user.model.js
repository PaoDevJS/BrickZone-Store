import mongoose from "mongoose";

const CreateTableUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "customer",
      enum: ["admin", "customer"],
    },
    status: {
      type: String,
      enum: ["Khóa", "Hoạt động"],
      default: "Hoạt động",
    },
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
    },
    otp: {
      type: String,
    },
    otpExpireAt: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", CreateTableUserSchema);
