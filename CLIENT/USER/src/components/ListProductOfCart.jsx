import { MdDelete } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";

const ListProductOfCart = ({
  products,
  handleMinusQuantity,
  handlePlusQuantity,
  handleRemoveProductInCart,
}) => {
  const money = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <table className="table-fixed w-full h-full rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-Primary text-white">
            <th className="w-[10%] border py-2">Ảnh</th>
            <th className="w-[35%] border py-2">Sản phẩm</th>
            <th className="w-[15%] border py-2">Đơn giá</th>
            <th className="w-[15%] border py-2">Số lượng</th>
            <th className="w-[15%] border py-2">Thành tiền</th>
            <th className="w-[10%] border py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products?.products &&
            products?.products.map((product, index) => (
              <tr key={index} className="odd:bg-[#e7e7e9] even:bg-[#fdfdfd]">
                <td className="py-2 px-4">
                  <img
                    src={`http://localhost:3000/${product.product_id?.imgUrl[0]}`}
                    alt=""
                    className="w-[100px] rounded-md h-[70px] object-cover m-auto"
                  />
                </td>
                <td className="py-2 px-4">
                  <h1 className="font-[500] text-center">
                    {product.product_id?.name}
                  </h1>
                </td>
                <td className="text-center py-2 px-4 font-[600]">
                  {money.format(product.product_id?.price)}
                </td>
                <td className="py-2 px-4 font-[600]">
                  <div className="w-[80%] m-auto flex items-center gap-5">
                    <button
                      onClick={() => handleMinusQuantity(product._id)}
                      className="cursor-pointer text-gray-400 hover:text-black transition-all duration-150 ease-in"
                    >
                      <FaMinus />
                    </button>
                    <h3 className="w-[50%] border border-gray-300 rounded-md px-3 py-1 outline-none text-center">
                      {product.quantity}
                    </h3>
                    <button
                      onClick={() => handlePlusQuantity(product._id)}
                      className="cursor-pointer text-gray-400 hover:text-black transition-all duration-150 ease-in"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </td>
                <td className="text-center py-2 px-4 font-[600]">
                  {money.format(product.product_id?.price * product.quantity)}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={handleRemoveProductInCart}
                    className="m-auto block bg-Primary p-1 rounded-md cursor-pointer border border-Primary hover:bg-transparent hover:text-Primary transition-all duration-200 ease-in text-white"
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListProductOfCart;

