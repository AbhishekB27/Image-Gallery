import { verifyJWT } from "../helper/jwt";

let message = {
  status: "",
  data: null,
  message: "",
};
const isAuthenticated = (req, res, next) => {
  try {

    const token = req.headers["x-access-token"] || req.headers["Authorization"];
    // const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decodedToken = verifyJWT(token);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      message = {
        status: "Failed",
        data: null,
        message: "Invalid user ID 😟",
      };
      //   throw 'Invalid user ID';
      return res.json(message);
    } else {
      next();
    }
  } catch {
    message = {
      status: "Failed",
      data: null,
      message: "Invalid Request! 😒",
    };
    res.status(401).json({
      message,
    });
  }
};

export default isAuthenticated