const mongoose = require("mongoose");

const jobsSchema = mongoose.Schema({
  Company: String,
  Position: String,
  Contract: String,
  Location: String,
});

const JobsModel = mongoose.model("job", jobsSchema);

module.exports = {
  JobsModel,
};
