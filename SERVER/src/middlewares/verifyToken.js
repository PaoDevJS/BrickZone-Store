import jwt from "jsonwebtoken";

export const verifyTokenOfUser = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"].split(" ")[1] ||
      req.authorization.split(" ")[1];
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN);
    req.id = decode.id;
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};