import mongoose from "mongoose";

const CreateTableProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code_product: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: Array,
      required: true,
    },
    categories_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    supplier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    status: {
      type: String,
      enum: ["Ẩn", "Hiện", "Hết hàng"],
      default: "Hiện",
    },
    voucher: {
      type: Number
    },
    outstand: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", CreateTableProductSchema);
