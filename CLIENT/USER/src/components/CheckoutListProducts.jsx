const CheckoutListProducts = ({ listProducts }) => {
  const money = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <table className="table-fixed w-full h-full rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-Primary text-white">
          <th className="w-[10%] border py-2">Ảnh</th>
          <th className="w-[35%] border py-2">Sản phẩm</th>
          <th className="w-[15%] border py-2">Đơn giá</th>
          <th className="w-[15%] border py-2">Số lượng</th>
          <th className="w-[15%] border py-2">Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        {listProducts &&
          listProducts.map((product, index) => (
            <tr key={index} className="odd:bg-[#e7e7e9] even:bg-[#fdfdfd]">
              <td className="py-2 px-4">
                <img
                  src={`http://localhost:3000/${product.product_id?.imgUrl[0]}`}
                  alt=""
                  className="w-[100px] rounded-md h-[70px] object-cover m-auto"
                />
              </td>
              <td className="py-2 px-4">
                <h1 className="font-[500] text-center">{product.product_id?.name}</h1>
              </td>
              <td className="text-center py-2 px-4 font-[600]">
                {money.format(product.product_id?.price)}
              </td>
              <td className="text-center py-2 px-4 font-[600]">
                {product.quantity}
              </td>
              <td className="text-center py-2 px-4 font-[600]">
                {money.format(product.product_id?.price * product.quantity)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CheckoutListProducts;
