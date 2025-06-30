import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const UpdateItemProduct = () => {
  const [imgUrl, setImgUrl] = useState([]);
  const [prevImgUrl, setPrevImgUrl] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    stock: "",
    price: "",
    code: "",
    categories: "",
    supplier: "",
    status: false,
  });
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const { id } = useParams();

  const linkApiUrlGetAllCategories =
    "http://localhost:3000/api/v1/categories/get-all-categories";
  const linkApiUrlGetAllSuppliers =
    "http://localhost:3000/api/v1/supplier/get-all-suppliers";
  const linkApiUpdateItemProduct =
    "http://localhost:3000/api/v1/product/update-item-product/";
  const linkUrlGetItemProduct =
    "http://localhost:3000/api/v1/product/get-item-product/";

  useEffect(() => {
    const fetchApiGetAllCategoriesAndSupplier = async () => {
      try {
        const [categories, suppliers, product] = await Promise.all([
          axios.get(linkApiUrlGetAllCategories),
          axios.get(linkApiUrlGetAllSuppliers),
          axios.get(`${linkUrlGetItemProduct}${id}`),
        ]);
        setCategories(categories.data?.categories);
        setSuppliers(suppliers.data?.suppliers);
        setImgUrl(product.data?.imgUrl);
        setFormData({
          name: product.data?.name,
          desc: product.data?.desc,
          stock: product.data?.stock,
          price: product.data?.price,
          code: product.data?.code_product,
          categories: product.data?.categories_id?.name,
          supplier: product.data?.supplier_id?.name,
          status: product.data?.status,
        });
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };

    fetchApiGetAllCategoriesAndSupplier();
  }, [id]);

  //
  const handleChangeFormData = (valid) => {
    setFormData((p) => ({ ...p, [valid.target.name]: valid.target.value }));
  };

  // remove ảnh
  const handleRemoveImgUrl = (name) => {
    setImgUrl(imgUrl.filter((item) => item !== name));
  };

  const handleRemovePrevImgUrl = (name) => {
    setPrevImgUrl(prevImgUrl.filter((item) => item.name !== name));
  };
  console.log(prevImgUrl);
  //   thêm mới sản phẩm
  const fetchApiNewCreateProduct = async () => {
    try {
      const dataForm = new FormData();
      imgUrl.forEach((item) => {
        dataForm.append("imgUrls", item);
      });
      prevImgUrl.forEach((item) => {
        dataForm.append("imgUrls", item);
      });
      dataForm.append("name", formData.name);
      dataForm.append("desc", formData.desc);
      dataForm.append("code_product", formData.code);
      dataForm.append("stock", formData.stock);
      dataForm.append("price", formData.price);
      dataForm.append("status", formData.status);
      dataForm.append("supplier_id", formData.supplier);
      dataForm.append("categories_id", formData.categories);

      const result = await axios.put(linkApiUpdateItemProduct + id, dataForm);
      toast.success(result.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleSubmitNewCreateProduct = (e) => {
    e.preventDefault();
    fetchApiNewCreateProduct();
  };

  return (
    <div className="w-full h-full relative overflow-y-scroll Scroller">
      <Link
        to={"/quan-ly-san-pham/danh-sach-san-pham"}
        className="flex items-center gap-1 text-gray-500 hover:text-black transition-all duration-300 ease-linear absolute top-0 left-0"
      >
        <IoMdArrowRoundBack size={16} />
        <span className="font-[500]">Quay lại</span>
      </Link>
      <h1 className="uppercase font-[700] text-xl text-center py-5 text-gray-700">
        Thêm Sản Phẩm Mới
      </h1>
      <form className="w-[60%] m-auto py-5 flex flex-col gap-5">
        <div>
          <label
            htmlFor="code"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Mã sản phẩm:
          </label>
          <input
            type="text"
            name="code"
            id="code"
            value={formData.code}
            onChange={handleChangeFormData}
            placeholder="Nhập mã sản phẩm tại đây..."
            className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600]"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Tên sản phẩm:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChangeFormData}
            placeholder="Nhập tên sản phẩm tại đây..."
            className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600]"
          />
        </div>
        <div>
          <label
            htmlFor="desc"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Mô tả:
          </label>
          <textarea
            type="text"
            name="desc"
            id="desc"
            value={formData.desc}
            onChange={handleChangeFormData}
            placeholder="Nhập mô tả tại đây..."
            className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600] min-h-[400px] max-h-[400px]"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Giá sản phẩm:
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChangeFormData}
            placeholder="Nhập giá sản phẩm tại đây..."
            className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600]"
          />
        </div>
        <div>
          <label
            htmlFor="stock"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Số lượng sản phẩm:
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={formData.stock}
            onChange={handleChangeFormData}
            placeholder="Nhập số lượng sản phẩm tại đây..."
            className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600]"
          />
        </div>
        <div>
          <label
            htmlFor="categories"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            danh mục sản phẩm:
          </label>
          <div className="border border-gray-300 outline-none w-full mt-3 py-2 px-3 rounded-md flex items-center justify-between">
            <h1 className="font-[600]">{formData.categories}</h1>
            <select
              name="categories"
              id="categories"
              value={formData.categories}
              onChange={handleChangeFormData}
              className="border rounded-md border-gray-300 p-2 outline-none"
            >
              <option value={""} disabled>
                Vui lòng chọn danh mục
              </option>
              {categories &&
                categories.map((item) => (
                  <option value={item.name} key={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="supplier"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Nhà cung cấp sản phẩm:
          </label>
          <div className="border border-gray-300 outline-none w-full mt-3 py-2 px-3 rounded-md flex items-center justify-between">
            <h1 className="font-[600]">{formData.supplier}</h1>
            <select
              name="supplier"
              id="supplier"
              onChange={handleChangeFormData}
              value={formData.supplier}
              className="border rounded-md border-gray-300 p-2 outline-none"
            >
              <option value={""} disabled>
                Vui lòng chọn nhà cung cấp
              </option>
              {suppliers &&
                suppliers.map((item) => (
                  <option value={item.name} key={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="status"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Trạng thái sản phẩm:
          </label>
          <div className="border border-gray-300 outline-none w-full mt-3 py-2 px-3 rounded-md flex items-center justify-between">
            <h1 className="font-[600]">{formData.status}</h1>
            <select
              name="status"
              id="status"
              onChange={handleChangeFormData}
              value={formData.status}
              className="border rounded-md border-gray-300 p-2 outline-none"
            >
              <option value={""} disabled>
                Vui lòng chọn nhà cung cấp
              </option>
              <option value={"Ẩn"}>Ẩn</option>
              <option value={"Hiện"}>Hiện</option>
            </select>
          </div>
        </div>
        <div>
          <h3 className="min-w-[25%] text-[16px] font-[600] text-gray-600">
            Ảnh sản phẩm:
          </h3>
          <div className="border border-gray-300 outline-none w-full max-h-[300px] mt-3 py-2 px-3 rounded-md grid grid-cols-12 gap-3">
            {imgUrl &&
              imgUrl?.map(
                (item, index) =>
                  item && (
                    <div
                      key={index}
                      className="w-[70px] h-[70px] border border-gray-300 rounded-md overflow-hidden col-span-2 m-auto relative"
                    >
                      <IoClose
                        size={18}
                        onClick={() => handleRemoveImgUrl(item)}
                        className="absolute right-0 top-0 cursor-pointer"
                      />
                      <img
                        src={`http://localhost:3000/${item}`}
                        alt=""
                        key={index}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
              )}
            {prevImgUrl?.map(
              (url, key) =>
                url && (
                  <div
                    key={key}
                    className="w-[85px] h-[85px] border border-gray-300 rounded-md overflow-hidden col-span-2 m-auto relative"
                  >
                    <IoClose
                      size={18}
                      onClick={() => handleRemovePrevImgUrl(url.name)}
                      className="absolute right-0 top-0 cursor-pointer"
                    />
                    <img
                      src={URL.createObjectURL(url)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
            )}
            <div className="w-[85px] h-[85px] border border-gray-300 rounded-md m-auto overflow-hidden col-span-2">
              <label htmlFor="imgUrl">
                <img
                  src="https://media.istockphoto.com/id/1021471354/vector/image-upload-icon.jpg?s=612x612&w=0&k=20&c=TBKGW7vES1EtPcaxIvCAKxXL0W9EGd5FPBWHhtC2kFg="
                  alt=""
                  className="w-full h-full object-cover"
                />
              </label>
              <input
                type="file"
                onChange={(valid) =>
                  setPrevImgUrl((p) => [...p, valid.target.files[0]])
                }
                name="imgUrl"
                id="imgUrl"
                placeholder="Nhập địa chỉ tại đây..."
                className="border p-3 w-full rounded border-gray-300 placeholder:font-[600] outline-none"
                hidden
                required
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmitNewCreateProduct}
          className="bg-RedDrank w-full py-3 rounded-md text-white uppercase text-[18px] font-[600] cursor-pointer mt-7"
        >
          Thêm Sản Phẩm
        </button>
      </form>
    </div>
  );
};

export default UpdateItemProduct;
