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

// E D I T   J O B S
jobsRouter.patch("/edit/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  const job = await JobsModel.find({ _id: id });
  try {
    await JobsModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Updated Successfully");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something Went Wrong" });
  }
});

// D E L E T E  J O B
jobsRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await JobsModel.findByIdAndDelete({ _id: id });
    res.send("Deleted ");
  } catch (err) {
    console.log(err);
    res.send("Error in Deleting");
  }
});

module.exports = {
  jobsRouter,
};
