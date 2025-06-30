import collection1 from "../assets/images/collertion-1.avif";
import collection2 from "../assets/images/collertion-2.avif";
import collection3 from "../assets/images/collertion-3.avif";
import collection4 from "../assets/images/collertion-4.avif";
import collection5 from "../assets/images/collertion-5.avif";
import collection6 from "../assets/images/collertion-6.avif";
import collection7 from "../assets/images/collection-7.avif";
import collection8 from "../assets/images/collection-8.avif";
import collection9 from "../assets/images/collection-9.avif";
import { motion } from "motion/react";

const arrImage = [
  collection1,
  collection2,
  collection3,
  collection4,
  collection5,
  collection6,
];

const Collection = () => {
  return (
    <div className="container m-auto my-15 px-10">
      <div>
        <div className="text-center">
          <h1 className="text-[40px] font-[600]"> Bộ sưu tập </h1>
          <p className="text-[16px] mt-3 text-gray-600">
            Khám phá những bộ sưu tập LEGO mới nhất tại đây!
          </p>
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          className="grid grid-cols-12 gap-5 my-15"
        >
          {arrImage &&
            arrImage.map((item, index) => (
              <img
                src={item}
                key={index}
                alt={`Ảnh bộ sưu tập ${index + 1}`}
                className="col-span-6 m-auto w-full object-cover rounded-xl"
              />
            ))}
        </motion.div>
      </div>
      <div className="mt-32">
        <div>
          <h1 className="text-[40px] font-[600]"> Bộ sưu tập </h1>
          <p className="text-[16px] mt-3 text-gray-600">
            Khám phá các bộ sưu tập đồ chơi LEGO chính hãng.
          </p>
        </div>
        <div className="mt-24">
          <motion.div initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1, transition: {duration: 1}}} className="flex items-center justify-between gap-15">
            <img
              src={collection7}
              alt="Ảnh bộ sưu tập 7"
              className="rounded-xl w-[40%] object-cover"
            />
            <div className="w-[50%]">
              <h3 className="text-[32px] font-[600]">Sản phẩm mới</h3>
              <p className="text-[16px] mt-3 text-gray-600">
                Chúng tôi luôn cập nhật những bộ sản phẩm LEGO mới nhất để đáp
                ứng nhu cầu của khách hàng và đại lý trên toàn quốc.
              </p>
            </div>
          </motion.div>
          <motion.div initial={{x: 100, opacity: 0}} animate={{x: 0, opacity: 1, transition: {duration: 1}}} className="flex items-center justify-between mt-15">
            <img
              src={collection8}
              alt="Ảnh bộ sưu tập 8"
              className="rounded-xl w-[40%] object-cover"
            />
            <div className="w-[50%]">
              <h3 className="text-[32px] font-[600]">Khuyến mãi</h3>
              <p className="text-[16px] mt-3 text-gray-600">
                Theo dõi các chương trình khuyến mãi hấp dẫn cho các bộ sưu tập
                LEGO chính hãng tại Việt Nam.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1, transition: {duration: 1}}} className="flex items-center gap-15 justify-between mt-38">
        <div className="w-[50%]">
          <h3 className="text-[32px] font-[600]">
            Chào mừng đến với LEGO Việt Nam
          </h3>
          <p className="text-[16px] mt-3 text-gray-600">
            Brickzone Store chuyên cung cấp và phân phối đồ chơi LEGO chính
            hãng, mang đến cho bạn những bộ sưu tập mới nhất và thông tin cập
            nhật nhất về LEGO.
          </p>
          <div className="flex items-center justify-around my-15">
            <div>
              <h1 className="text-6xl font-[700] text-Primary">150+</h1>
              <p className="text-[16px] text-gray-600 text-center mt-2 font-[600]">
                Đồ chơi
              </p>
            </div>
            <div>
              <h1 className="text-6xl font-[700] text-Primary text-center">
                15
              </h1>
              <p className="text-[16px] text-gray-600 text-center mt-2 font-[600]">
                Chất lượng hàng đầu
              </p>
            </div>
          </div>
        </div>
        <img
          src={collection9}
          alt="Ảnh bộ sưu tập 9"
          className="rounded-xl object-cover w-[40%]"
        />
      </motion.div>
    </div>
  );
};

export default Collection;
