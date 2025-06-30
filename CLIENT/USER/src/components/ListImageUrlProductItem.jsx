import { useState } from "react";

const ListImageUrlProductItem = ({ images }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="w-[60%] max-h-full">
      <div className="border w-[80%] h-[500px] m-auto rounded-md overflow-hidden border-gray-300">
        <img
          src={`http://localhost:3000/${images && images[index]}`}
          alt=""
          className="w-full h-full object-fill"
        />
      </div>
      <div className="mt-5 border w-[90%] m-auto overflow-x-scroll isScroller relative flex items-center p-3 gap-3">
        {images &&
          images.map((img, key) => (
            <img
              src={`http://localhost:3000/${img}`}
              key={key}
              alt=""
              onClick={() => setIndex(key)}
              className={`w-[70px] h-[70px] object-cover rounded-md cursor-pointer overflow-hidden p-1 ${
                key === index
                  ? "border border-Primary"
                  : "border border-gray-300"
              }`}
            />
          ))}
      </div>
    </div>
  );
};

export default ListImageUrlProductItem;
