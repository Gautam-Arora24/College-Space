const mongoose = require("mongoose");
const { Schema } = mongoose;
const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  emailID: {
    type: String,
    unique: true,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  announcements: [
    {
      type: String,
    },
  ],
  notes: {
    name: String,
    desc: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
