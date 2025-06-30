const listPrice = [
  { code: "p1", price: "Dưới 200.000 Đ" },
  { code: "p2", price: "200.000 Đ - 1.000.000 Đ" },
  { code: "p3", price: "1.000.000 Đ - 2.500.000 Đ" },
  { code: "p4", price: "2.500.000 Đ - 5.000.000 Đ" },
  { code: "p5", price: "Trên 5.000.000 Đ" },
];

const SideBar = ({ categories, setFormData, formData }) => {
  const handleOnChangeData = (valid) => {
    setFormData((p) => ({ ...p, [valid.target.name]: valid.target.value }));
  };

  const handleRemove = () => {
    setFormData({
      categories: "",
      price: "",
      supplier: "",
    });
  };
  return (
    <div className="w-[20%] h-full flex flex-col gap-7">
      {/* Danh Mục */}
      <div>
        <h1 className="text-[20px] font-[700] text-Primary uppercase">
          Danh Mục
        </h1>
        <ul className="w-full max-h-[300px] mt-3 flex flex-col gap-3 overflow-y-scroll isScroller">
          {categories &&
            categories.map((item) => (
              <li key={item._id} className="flex items-center gap-2 px-3">
                <input
                  type="checkbox"
                  id={item._id}
                  name="categories"
                  onChange={handleOnChangeData}
                  value={item.name}
                  checked={formData.categories !== item.name ? false : true}
                />
                <label htmlFor={item._id} className="font-[500] cursor-pointer">
                  {item.name}
                </label>
              </li>
            ))}
        </ul>
      </div>
      {/* Giá */}
      <div>
        <h1 className="text-[20px] font-[700] text-Primary uppercase">Giá</h1>
        <ul className="w-full max-h-[200px] mt-3 flex flex-col gap-3">
          {listPrice &&
            listPrice.map((item) => (
              <li key={item.price} className="flex items-center gap-2 px-3">
                <input
                  type="checkbox"
                  id={item.price}
                  name="price"
                  value={item.code}
                  onChange={handleOnChangeData}
                  checked={formData.price !== item.code ? false : true}
                />
                <label
                  htmlFor={item.price}
                  className="font-[500] cursor-pointer"
                >
                  {item.price}
                </label>
              </li>
            ))}
        </ul>
      </div>

      <button
        onClick={handleRemove}
        className=" py-2 w-full bg-Primary rounded-lg text-[16px] font-[600] text-white cursor-pointer hover:bg-Primary/85 transition-all duration-300 ease-linear mt-5"
      >
        Xóa bộ lọc
      </button>
    </div>
  );
};

export default SideBar;
