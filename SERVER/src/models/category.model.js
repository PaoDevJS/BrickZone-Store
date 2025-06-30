import mongoose from "mongoose";

const CreateTableCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Categories", CreateTableCategoriesSchema);
