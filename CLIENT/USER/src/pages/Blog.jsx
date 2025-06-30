import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { GrFormPreviousLink } from "react-icons/gr";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const linkUrlApiGetAllBlogs =
    "http://localhost:3000/api/v1/blog/get-all-blog";
  useEffect(() => {
    const fetchApiGetAllBlogs = async () => {
      try {
        const result = await axios.get(linkUrlApiGetAllBlogs);
        setBlogs(result.data?.blogs);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };

    fetchApiGetAllBlogs();
  }, []);

  return (
    <div className="m-auto container xl:px-0 px-10 my-20 relative">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
        className="grid grid-cols-12 gap-10"
      >
        {blogs &&
          blogs.map((item) => (
            <Link
              to={`/tin-tuc/${JSON.stringify(item.title)}/${item._id}`}
              key={item._id}
              className="col-span-6 w-[90%] m-auto"
            >
              <div className="rounded-md overflow-hidden">
                <div className="w-full h-[400px] overflow-hidden rounded-md">
                  <img
                    src={`http://localhost:3000/${item.imgUrl}`}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="my-5">
                  <h1 className="text-[20px] font-[600] text-center">
                    {item.title}
                  </h1>
                  <p className="text-gray-600 mt-3 text-[16px] whitespace-pre-wrap text-center">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </motion.div>
    </div>
  );
};

export default Blog;
