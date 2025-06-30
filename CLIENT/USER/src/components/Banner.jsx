import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <div className="bg-banner-image rounded-lg relative overflow-hidden">
      <div className="w-full h-full bg-black/20">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 1 } }}
          className="w-[40%] h-[50%] bg-white/20 rounded-md top-[50%] left-[50%] translate-[-50%] absolute flex flex-col items-center justify-center gap-7"
        >
          <p className="w-[50%] h-[5px] bg-white rounded-md"></p>
          <h1 className="text-6xl text-white font-[700]">Đồ Chơi</h1>
          <p className="text-white text-[16px] font-[600]">
            Khám Phá cửa hàng đồ chơi LEGO Chính Hãng
          </p>
          <Link to={'/cua-hang'} className="py-3 w-[200px] rounded-full bg-Primary text-center text-[18px] text-white font-[600] hover:scale-95 transition-all duration-200 ease-initial">
            Khám phá
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
