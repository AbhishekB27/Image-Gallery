import express from "express";
import { body, validationResult } from "express-validator";
import { createJWT, verifyJWT } from "../helper/jwt";
import { verifyPassword } from "../helper/util";
import { User } from "../Services/mongodb";
// import { User } from "../Services/mongodb/models/User";
const router1 = express.Router();

let message = {
  status: "",
  data: null,
  message: "",
};

//signUp route
router1.post(
  "/signUp",
  // body("avtar").isURL(),
  body("userName").isLength({ min: 3 }),
  body("firstName").isLength({ min: 3 }),
  body("lastName").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      return false;
    })
    .withMessage("Password Does not matched"),
  // body("designation").isLength({ min: 3 }),
  async (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
      message = {
        status: "Failed",
        data: errors,
        message: `${errors[0].msg} 😒`,
      };
      return res.json(message);
    }
    try {
      const {
        avtar,
        userName,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        designation,
      } = req.body;
      const oldUser = await User.findOne({ email: email }); // findOne method returns a user object but find method returns array users
      console.log(oldUser);
      if (oldUser != null) {
        message = {
          status: "Failed",
          data: null,
          message: "User Already Exists 🤷‍♂️",
        };
        return res.json(message);
      }
      const user = new User({
        avtar,
        userName,
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        designation,
      });
      await user.save();
      message = {
        status: "Success",
        data: user,
        message: "Successfully Created😊",
      };
      res.json(message);
    } catch (error) {
      console.log(error.message);
      message = {
        status: "Failed",
        data: null,
        message: `${error.message} 😟`,
      };
      res.json(error.message);
    }
  }
);

//login route
router1.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  async (req, res) => {
    const { email, password } = req.body;
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      message = {
        status: "Failed",
        data: errors,
        message: `${errors[0].msg} 😒`,
      };
      return res.json(message);
    }
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        message = {
          status: "Failed",
          data: null,
          message: "User Not Found Plz Sign UP 🤦‍♀️",
        };
        return res.json(message);
      }
      const verifyPass = verifyPassword(password, user.password);
      if (verifyPass) {
        const token = createJWT({ id: user._id, email: user.email });
        message = {
          status: "Success",
          data: { user: user, token: token },
          message: "Welcome 😊",
        };
        return res.json(message);
      } else {
        message = {
          status: "Failed",
          data: null,
          message: "Incorrect Password",
        };
        return res.json(message);
      }
    } catch (error) {
      console.log("Error: " + error.message);
      message = {
        status: "Failed",
        data: null,
        message: `${error.message} 😟`,
      };
      return res.json(message);
    }
  }
);

// this route for verify token
router1.get("/verify/:token", async (req, res) => {
  try {
    const data = verifyJWT(req.params.token);
    if (data) {
      const user = await User.findOne({ _id: data.id });
      message = {
        status: "Success",
        data: { token: req.params.token, user: user },
        message: "Successfull",
      };
    } else {
      message = {
        status: "Failed",
        data: data,
        message: "Token Expired😟",
      };
    }
    res.json(message);
  } catch (error) {
    console.log(error.message);
    message = {
      status: "Failed",
      data: null,
      message: `${error.message} 😟`,
    };
    res.json(message);
  }
});

// this route for get a all users
router1.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    message = {
      status: "Success",
      data: users,
      message: "Successfully Fetched Users 😊",
    };
    res.json(message);
  } catch (error) {
    message = {
      status: "Failed",
      data: null,
      message: `${error.message} 😟`,
    };
    res.json(message);
    console.log(error.message);
  }
});

//Update Route
router1.put("/update", async (req, res) => {
  const data = req.body;
  // console.log(data)
  try {
    const userExist = await User.findOne({ _id: data.id });
    if (userExist) {
      await User.updateOne({ ...userExist }, { ...data });
      const updatedUser = await User.findOne({ _id: data.id });
      message = {
        status: "Success",
        data: updatedUser,
        message: "Updated😊",
      };
      res.json(message);
    }
  } catch (error) {
    message = {
      status: "Failed",
      data: null,
      message: `${error.message}😟`,
    };
    res.json(message);
    console.log(error.message);
  }
});
export default router1;
