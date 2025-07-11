import ListProductOfStore from "../components/ListProductOfStore";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import DetailProductItem from "../components/DetailProductItem";
const Store = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categories: "",
    price: "",
    supplier: "",
    age: ""
  });

  const linkUrlApiGetAllProducts =
    "http://localhost:3000/api/v1/product/get-all-product";
  const linkUrlApiGetAllCategories =
    "http://localhost:3000/api/v1/categories/get-all-categories";

  useEffect(() => {
    const isFetchCallApi = async () => {
      try {
        const [products, categories] = await Promise.all([
          axios.get(linkUrlApiGetAllProducts),
          axios.get(linkUrlApiGetAllCategories),
        ]);
        setProducts(products.data?.products);
        setCategories(categories.data?.categories);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };

    isFetchCallApi();
  }, []);
  return (
    <div className="m-auto container flex gap-10 my-10 px-10">
      <SideBar
        categories={categories}
        setFormData={setFormData}
        formData={formData}
      />
      <ListProductOfStore products={products} formData={formData} />
    </div>
  );
};

export default Store;
