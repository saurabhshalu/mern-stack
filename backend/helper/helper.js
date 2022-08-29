import jsonwebtoken from "jsonwebtoken";
export const getAuthToken = (email) => {
  return (
    "Bearer " +
    jsonwebtoken.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" })
  );
};
