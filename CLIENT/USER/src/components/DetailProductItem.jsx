import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductItemInfo from "./ProductItemInfo";
import ListImageUrlProductItem from "./ListImageUrlProductItem";
import Card from "../utils/Card";
import { GrFormPreviousLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const DetailProductItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const linkUrlApiGetItemProduct =
    "http://localhost:3000/api/v1/product/get-item-product/";
  const linkUrlApiGetAllProducts =
    "http://localhost:3000/api/v1/product/get-all-product";
  useEffect(() => {
    const isFetchApiGetItemProduct = async () => {
      try {
        const [products, product] = await Promise.all([
          axios.get(linkUrlApiGetAllProducts),
          axios.get(`${linkUrlApiGetItemProduct}${id}`),
        ]);
        setProducts(products.data?.products);
        setProduct(product.data);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    isFetchApiGetItemProduct();
  }, [id]);

  return (
    <div className="m-auto container my-10 2xl:px-0 px-10 flex flex-col gap-15">
      <button
        onClick={() => navigate(-1)}
        className="flex cursor-pointer gap-1 text-gray-600 hover:text-black font-[500] transition-all duration-300 ease-linear"
      >
        <GrFormPreviousLink size={20} />
        <span>Quay lại</span>
      </button>
      <div className="flex gap-5">
        <ListImageUrlProductItem images={product?.imgUrl} />
        <ProductItemInfo product={product} />
      </div>
      <div>
        <h1 className="text-3xl font-[600] mb-5">Mô tả sản phẩm</h1>
        <p className="whitespace-pre-wrap">{product?.desc}</p>
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-[600] mb-5 text-center">
          Sản phẩm liên quan
        </h1>
        <div className="w-full min-h-[380px] overflow-x-scroll isScroller p-3 grid grid-cols-12 gap-7 m-auto overflow-hidden">
          {products
            ?.filter(
              (item) =>
                item.supplier_id === product?.supplier_id?._id &&
                item.categories_id === product?.categories_id._id &&
                item._id !== product?._id
            )
            .map((item) => (
              <Card product={item} key={item._id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailProductItem;
