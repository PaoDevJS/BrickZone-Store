import mongoose from "mongoose";

const CreateTableSupplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    imgUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Supplier", CreateTableSupplierSchema);
