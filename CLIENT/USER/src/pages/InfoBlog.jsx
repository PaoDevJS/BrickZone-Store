import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { GrFormPreviousLink } from "react-icons/gr";

const InfoBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const linkUrlApiGetItemBlog =
    "http://localhost:3000/api/v1/blog/get-item-blog/";
  useEffect(() => {
    const fetchApiGetItemBlog = async () => {
      try {
        const result = await axios.get(`${linkUrlApiGetItemBlog}${id}`);
        setBlog(result.data?.blog);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    fetchApiGetItemBlog();
  }, [id]);
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
      className="container m-auto my-12 xl:px-0 px-10 relative"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex text-gray-600 hover:text-black cursor-pointer font-[500] absolute top-0 left-[40px]"
      >
        <GrFormPreviousLink size={20} />
        <span>Quay lại</span>
      </button>
      <div className="pt-7">
        <div>
          <h1 className="text-[30px] font-[600] text-center">{blog.title}</h1>
          <p className="text-[18px] text-center mt-3 text-gray-700">
            {blog.desc}
          </p>
        </div>
        <div className="w-[50%] m-auto h-[400px] rounded-md overflow-hidden my-12">
          <img
            src={`http://localhost:3000/${blog.imgUrl}`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="prose prose-lg max-w-[70%] mx-auto text-justify">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    </motion.div>
  );
};

export default InfoBlog;
