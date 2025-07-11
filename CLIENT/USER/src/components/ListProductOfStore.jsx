import Card from "../utils/Card";
import { useState } from "react";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const ListProductOfStore = ({ products, formData }) => {
  const { key } = useParams();
  const [page, setPage] = useState(1);

  // Tìm kiếm theo danh mục
  const isFilterCategories = (categories) => {
    const keySearch = formData.categories.toLowerCase();
    return categories?.toLowerCase().includes(keySearch);
  };
  // Tìm kiếm theo tên sản phẩm
  const isFilterKeySearchProduct = (keyName, keyCategories) => {
    const keySearch = key ? JSON.parse(key).toLowerCase() : "";
    console.log(keySearch)
    return keyName?.toLowerCase().includes(keySearch) || keyCategories?.toLowerCase().includes(keySearch);
  };
  // Tìm kiếm theo bảng giá
  const isFilterPrice = (price) => {
    switch (formData.price) {
      case "p1":
        return price <= 200000;
      case "p2":
        return price >= 200000 && price <= 1000000;
      case "p3":
        return price >= 1000000 && price <= 2500000;
      case "p4":
        return price >= 2500000 && price <= 5000000;
      case "p5":
        return price >= 5000000;
      default:
        return price;
    }
  };
  // Tìm kiếm theo bảng giá
  const isFilterAge = (age) => {
    switch (formData.age) {
      case "A1":
        return age >= 1 && age <= 3;
      case "A2":
        return age >= 3 && age <= 6;
      case "A3":
        return age >= 6 && age <= 12;
      case "A4":
        return age >= 12;
      default:
        return age;
    }
  };

  const handleBtnCircleChevronLeft = () => {
    if (page <= 1) return;
    setPage((prev) => prev - 1);
  };

  const handleBtnCircleChevronRight = () => {
    const maxPage = Math.ceil(products.length / 20);
    if (page >= maxPage) return;
    setPage((prev) => prev + 1);
  };

  const isFilterProducts = products?.filter(
    (item) =>
      isFilterKeySearchProduct(item.name, item.categories_id.name) &&
      (isFilterPrice(item.price) &&
      isFilterCategories(item.categories_id.name))
  );
  return (
    <>
      {isFilterProducts?.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-lg w-[80%]">
          <p className="text-lg font-semibold">
            Không tìm thấy sản phẩm phù hợp
          </p>
          <p className="text-sm">
            Hãy thử thay đổi từ khóa, danh mục hoặc mức giá.
          </p>
        </div>
      ) : (
        <div className="w-[80%]">
          <div className="grid grid-cols-12 gap-7">
            {isFilterProducts
              .slice(20 * (page - 1), 20 * page)
              .map((product) => {
                return <Card key={product._id} product={product} />;
              })}
          </div>
          {isFilterProducts?.length > 20 && (
            <div className="flex items-center gap-7 mt-10 float-end">
              <FaCircleChevronLeft
                onClick={handleBtnCircleChevronLeft}
                size={20}
                className="cursor-pointer text-[#b7bbaf]"
              />
              <h2 className="text-[20px] font-[600]">{page}</h2>
              <FaCircleChevronRight
                onClick={handleBtnCircleChevronRight}
                size={20}
                className="cursor-pointer text-[#b7bbaf]"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ListProductOfStore;
