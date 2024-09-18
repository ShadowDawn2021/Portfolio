// routes/bmiRoute.js
import express from "express";
import BMI from "../models/bmi.js";

const router = express.Router();

// Calculate and store BMI
router.post("/", async (req, res) => {
	const { height, weight, name } = req.body;

	// BMI Calculation: weight (kg) / (height (m))^2
	const bmiValue = weight / (height / 100) ** 2;

	const newBMI = new BMI({
		name,
		height,
		weight,
		bmi: bmiValue,
	});

	try {
		const savedBMI = await newBMI.save();
		res.status(201).send(savedBMI);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Get all BMI records
router.get("/", async (req, res) => {
	try {
		const bmiRecords = await BMI.find({});
		res.send(bmiRecords);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Delete a BMI record
router.delete("/delete/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const deleteBMI = await BMI.findByIdAndDelete(id);
		if (deleteBMI) {
			res.status(200).send({ message: "BMI record deleted successfully" });
			console.log("BMI deleted");
		} else {
			res.status(404).send("Error in deleting BMI");
		}
	} catch (err) {
		console.log(err);
	}
});

export default router;
