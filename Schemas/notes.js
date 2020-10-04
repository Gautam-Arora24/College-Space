const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const noteSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 32,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Notes", noteSchema);
