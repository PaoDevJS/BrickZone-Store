import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SendOpt = ({ email, setPage }) => {
  const [second, setSecond] = useState(60);
  const [running, setRunning] = useState(false);
  const [otp, setOtp] = useState("");
  const linkUrlApiSendEmail = "http://localhost:3000/api/v1/user/check-otp";

  useEffect(() => {
    let timer;
    if (second > 0) {
      timer = setInterval(() => {
        setSecond((p) => p - 1);
      }, 1000);
    } else if (second === 0) {
      setSecond(60);
      setRunning(false);
    }

    return () => clearInterval(timer);
  }, [second]);

  const handleBtnSendOtp = async () => {
    if (!running) {
      try {
        setRunning(true);
        await axios.post(linkUrlApiSendEmail, { email });
      } catch (error) {
        console.log(error.response?.data?.message);
        setRunning(false);
      }
    }
  };

  const handleIsCheckOtp = async () => {
    try {
      const result = await axios.post(linkUrlApiSendEmail, { otp, email });
      toast.success(result.data?.message)
      setPage(result.data?.page)
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-[70vh] flex items-center justify-between">
      <div className="w-[30%] py-10 px-15 border border-gray-100 rounded-md shadow-lg shadow-Gray/30 m-auto flex flex-col gap-10">
        <div className="text-center flex flex-col gap-2">
          <h4 className="text-2xl font-[500]"> Xác nhận OTP </h4>
          <div className="text-gray-600">
            <p>Mã xác thực (OTP) đã được gửi tới email:</p>
            <p>{email.replace(/(.{3}).+(@.+)/, "$1***$2")}</p>
          </div>
        </div>
        <div>
          <div>
            <input
              type="text"
              placeholder="Nhập mã xác thực OTP tại đây..."
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 rounded border border-gray-200 outline-none placeholder:font-[500]"
            />
            <div className="mt-5 text-center">
              <h4 className="text-gray-600">Bạn chưa có mã xác thực?</h4>
              <button onClick={handleBtnSendOtp} className="cursor-pointer">
                {!running ? "Chờ " + second + "s" : "Gửi OTP"}
              </button>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-5">
            <button
              onClick={handleIsCheckOtp}
              className="bg-Primary w-[70%] m-auto block rounded py-2 cursor-pointer text-[16px] font-[500] text-white hover:scale-95 transition-all ease-in duration-150"
            >
              Xác thực
            </button>
            <button
              onClick={() => setPage(1)}
              className="text-Primary font-[500] cursor-pointer"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOpt;
