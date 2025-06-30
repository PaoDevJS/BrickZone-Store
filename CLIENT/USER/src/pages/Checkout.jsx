import CheckoutListProducts from "../components/CheckoutListProducts";
import CheckoutPayment from "../components/CheckoutPayment";
import ChooseAddress from "../components/ChooseAddress";
import { useState, useEffect } from "react";
import axios from "axios";

const Checkout = () => {
  const [infoUser, setInfoUser] = useState("");
  const [listProducts, setListProducts] = useState([]);
  const linkUrlApiCallListCartOfUser =
    "http://localhost:3000/api/v1/cart/get-all-product-cart";
    
  useEffect(() => {
    const isFetchCallApiToCart = async () => {
      try {
        const result = await axios.get(linkUrlApiCallListCartOfUser, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setListProducts(result.data?.products);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    isFetchCallApiToCart();
  }, []);

  const [monies, setMonies] = useState("");

  useEffect(() => {
    const isListMonies = listProducts?.map(
      (item) => item?.product_id?.price * item?.quantity
    );
    const isTotalMonies = isListMonies?.reduce((init, item) => init + item, 0);
    setMonies(isTotalMonies);
  }, [listProducts]);

  return (
    <div className="m-auto container flex flex-col gap-10 my-10 px-10">
      <ChooseAddress setInfoUser={setInfoUser} infoUser={infoUser} />
      <CheckoutListProducts
        listProducts={listProducts}
        setListProducts={setListProducts}
      />
      <CheckoutPayment
        totalAmount={monies}
        listProducts={listProducts}
        infoUser={infoUser}
      />
    </div>
  );
};

export default Checkout;
