import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "abhishekb27";

const createJWT = (payload) => jwt.sign(payload, secret, { expiresIn: "1d" });

const verifyJWT = (token) => {
  try {
    const data = jwt.verify(token, secret);
    if (data) return data;
  } catch (error) {
    console.log("Error: " + error.message);
  }
};

const decodeJWT = (token) => jwt.decode(token);

export { createJWT, verifyJWT, decodeJWT };
