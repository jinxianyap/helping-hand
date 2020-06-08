const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema

const VolunteerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    default: '',
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

const Volunteer = mongoose.model("volunteer", VolunteerSchema);

module.exports = Volunteer;