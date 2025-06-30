import mongoose from "mongoose";

export const CreateTableOrderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  infoUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  totalAmount: {
    type: String,
    required: true,
  },
  listProducts: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    enum: ["Đang chuẩn bị hàng", "Đã xác nhận", "Đang vận chuyển", "Đã hủy",  "Giao thành công", "Giao không thành công", "Chờ xác nhận"],
    default: "Chờ xác nhận",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Đã thanh toán", "chưa thanh toán", "Đang chờ xử lý",  "Thanh toán thất bại", "Chờ thanh toán"],
    default: "chưa thanh toán",
  },
  orderTimer: {
    type: String
  }
});

export default mongoose.model("Order", CreateTableOrderSchema);
