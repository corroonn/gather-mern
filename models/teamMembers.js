const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const teamMemberSchema = new Schema({
  name: String,
  title: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

// Model
const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
