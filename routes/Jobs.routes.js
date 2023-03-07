const express = require("express");

const { JobsModel } = require("../models/Jobs.model");

const jobsRouter = express.Router();

//G E T   J O B S
jobsRouter.get("/", async (req, res) => {
  try {
    const jobs = await JobsModel.find();
    res.send(jobs);
  } catch (err) {
    console.log(err);
  }
});

//P O S T    J O B S
jobsRouter.post("/add", async (req, res) => {
  const payload = req.body;

  try {
    const newJob = new JobsModel(payload);
    await newJob.save();
    res.send({ msg: "Job Added" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something Went Wrong" });
  }
});

module.exports = {
  jobsRouter,
};
