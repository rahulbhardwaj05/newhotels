const express = require("express");
const router = express.Router();

const person = require("./../models/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // create a new person document using the mongoose model
    const newPerson = new person(data);

    // save new person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await person.find({ work: workType });
      console.log("response fetched...");
      res.status(300).json(response);
    } else {
      res.status(404).json({ error: "Invalid workTypr" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePerosonId = req.body;

    const response = await person.findByIdAndUpdate(personId, updatePerosonId, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data updated..");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await person.findOneAndDelete({ _id: personId });

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data deleted..");
    res.status(200).json({ message: "person deleted succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
