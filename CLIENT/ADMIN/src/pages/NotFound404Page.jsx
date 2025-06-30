import { useNavigate } from "react-router-dom"

const NotFound404Page = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 px-6 text-center">
      <div className="bg-white bg-opacity-90 rounded-3xl p-10 max-w-sm shadow-lg">
        <svg
          className="mx-auto mb-6 w-24 h-24 text-red-500 animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h1 className="text-7xl font-extrabold text-gray-800 mb-4 select-none">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Trang không tìm thấy
        </h2>
        <p className="text-gray-600 mb-8">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition"
        >
          Quay lại Trang chủ
        </button>
      </div>
    </div>
  );
}

export default NotFound404Page