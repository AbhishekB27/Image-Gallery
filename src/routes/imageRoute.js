import express from "express";
import { body, check, validationResult } from "express-validator";
import isAuthenticated from "../middleware/isAuthenticated";
import { ImageReservoir, Review } from "../Services/mongodb";
const router3 = express.Router();

let message = {
  status: "",
  data: null,
  message: "",
};

// route for upload images
router3.post(
  "/upload",
  isAuthenticated,
  // check("imgURL").isURL().withMessage("provide valid url"),
  async (req, res) => {
    // console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      message = {
        status: "Failed",
        data: errors.errors,
        message: `${errors.errors[0].msg} 😒`,
      };
      return res.json(message);
    }
    try {
      const data = req.body;
      data.map(item => console.log(item.imageName))
      const asyncResult = Promise.all(
        data.map(async (item) => {
          const images = new ImageReservoir({
            imageUrl: item.imageUrl,
            imageName: item.imageName,
            user: item.user,
            category: item.category,
          });
          await images.save();
          return images;
        })
      );
       console.log(await asyncResult);
      message = {
        status: "Success",
        data: await asyncResult,
        message: `Uploaded Successfully! 😊`,
      };
      return res.json(message);
    } catch (error) {
      console.log(error.message);
      message = {
        status: "Failed",
        data: null,
        message: `${error.message} 😊`,
      };
      return res.json(message);
    }
  }
);

//get all images by this route
router3.get("/all", async (req, res) => {
  try {
    const images = await ImageReservoir.find({})
      .populate("user")
      // .populate("review")
      // .populate("likes");
    message = {
      status: "Success",
      data: images,
      message: "Successfully Fetched Images 😊",
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

//Route for retrieving the image by pouplating a review
router3.get("/image/:id", async (req, res) => {
  try {
    const imageWR = await ImageReservoir.findOne({
      _id: req.params.id,
    }).populate("review");
    message = {
      status: "Success",
      data: imageWR,
      message: `Successful 😊`,
    };
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

//Route for createing a new review and updating a image 'review' field with it
router3.post(
  "/image/:id",
  body("stars").isNumeric(),
  body("review").isLength({ min: 5, max: 150 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      message = {
        status: "Failed",
        data: errors.errors,
        message: `${errors.errors[0].msg} 😒`,
      };
      return res.json(message);
    }

    const data = req.body;
    Review.create(data)
      .then((iReview) => {
        const imgExist = ImageReservoir.findOne({ _id: req.params.id });
        if (imgExist)
          return ImageReservoir.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { review: [iReview._id] } },
            { new: true }
          );
      })
      .then((imageWr) => {
        message = {
          status: "Success",
          data: imageWr,
          message: `Updated Review 😊`,
        };
        return res.json(message);
      })
      .catch((error) => {
        console.log(error);
        message = {
          status: "Failed",
          data: null,
          message: `Failed to Updated Review 😟`,
        };
        return res.json(message);
      });
  }
);

//Route for increment a like and updating a image 'like' field with it
router3.post("/image/:id/like", body("like").isBoolean(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    message = {
      status: "Failed",
      data: errors.errors,
      message: `${errors.errors[0].msg} 😒`,
    };
    return res.json(message);
  }

  const data = req.body;
  const imgExist = ImageReservoir.findOne({ _id: req.params.id });
  if (imgExist) {
    if (data.like) {
      ImageReservoir.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: +1 } },
        { new: true },
        (err, doc) => {
          if (err) {
            message = {
              status: "Failed",
              data: null,
              message: `Failed 😟`,
            };
            return res.json(message);
          } else {
            message = {
              status: "Success",
              data: doc,
              message: `Updated Liked😊`,
            };
            return res.json(message);
          }
        }
      );
    } else {
      ImageReservoir.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: -1 } },
        { new: true },
        (err, doc) => {
          if (err) {
            message = {
              status: "Failed",
              data: null,
              message: `Failed 😟`,
            };
            return res.json(message);
          } else {
            message = {
              status: "Success",
              data: doc,
              message: `Updated Liked😊`,
            };
            return res.json(message);
          }
        }
      );
    }
  }
});

export default router3;
