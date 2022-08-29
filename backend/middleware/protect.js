import jsonwebtoken from "jsonwebtoken";
export default function protect(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];

      if (token) {
        const jwt = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.email = jwt.email;
        return next();
      }
    }
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized." });
  } catch (error) {
    console.log("err=>", error);
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized." });
  }
}
