const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");


// SEARCH PATIENT (by name)
router.get("/patients/search", async (req, res) => {
  try {
    const name = req.query.name;

    const patients = await Patient.find({
      fullName: { $regex: name, $options: "i" }
    });

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET ALL PATIENTS
router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET PATIENT BY ID
router.get("/patients/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// REGISTER NEW PATIENT
router.post("/patients", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();

    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// UPDATE PATIENT
router.put("/patients/:id", async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE PATIENT
router.delete("/patients/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;