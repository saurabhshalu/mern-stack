import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      validate: {
        validator(data) {
          return validator.isEmail(data);
        },
        message: "Please enter valid email.",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      validate: {
        validator(data) {
          return validator.isMobilePhone(data);
        },
        message: "Please enter valid mobile number.",
      },
    },
    profession: {
      type: String,
      required: [true, "Profession is required."],
      enum: ["Developer", "Teacher", "Student"],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: [6, "Password should be minimum 6 characher long."],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  const salt = bcryptjs.genSaltSync();
  const hashPassword = bcryptjs.hashSync(user.password, salt);
  user.password = hashPassword;
  next();
});

userSchema.methods.comparePassowrd = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

const userModel = mongoose.model("users", userSchema);

export default userModel;
