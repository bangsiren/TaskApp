const mongoose = require("../db");
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema(
  {
    email: {
      desc: "The user's email address.",
      trim: true,
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      desc: "user password",
      trim: true,
      type: String,
      required: true,
    },
    name: {
      desc: "The user's name.",
      trim: true,
      type: String,
      required: true,
    },
  
    isActive: {
      desc: "is Active.",
      type: Boolean,
      default: true,
      required: true,
    },
    userType: {
      desc: "user roles.",
      trim: true,
      type: String,
      enum: ["Admin", "User"],
      default: "Admin",
      required: true,
    },
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

schema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model("Users", schema);