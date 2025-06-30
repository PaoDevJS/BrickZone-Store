import mongoose from "mongoose";

const CreateTableAddressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listAddress: [
      {
        fullname: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Address", CreateTableAddressSchema);
