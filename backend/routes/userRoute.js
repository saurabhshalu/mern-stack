import express from "express";
import { getAuthToken } from "../helper/helper.js";
import protect from "../middleware/protect.js";
import User from "../models/UserModel.js";

const router = express.Router();

router.route("/login").post(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && user.comparePassowrd(req.body.password)) {
    const token = getAuthToken(user.email);
    res.setHeader("Authorization", token);
    return res.json({ success: true, message: "User logged in successfully." });
  }
  return res
    .status(401)
    .json({ success: false, message: "Email or password invalid." });
});

router.route("/register").post(async (req, res) => {
  const data = req.body;
  const user = new User(data);
  try {
    await user.save();
    res.setHeader("Authorization", getAuthToken(user.email));
    return res.json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.route("/").get(async (_, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

router
  .route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.json(user);
  })
  .put(protect, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .delete(protect, async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json(user);
  });

export default router;
