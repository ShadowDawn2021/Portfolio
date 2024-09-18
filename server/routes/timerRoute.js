// routes/timerRoute.js
import express from "express";
import Timer from "../models/Timer.js";

const router = express.Router();

// Get the current timer
router.get("/", async (req, res) => {
	try {
		const timer = await Timer.findOne();
		res.send(timer);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Set a new timer
router.post("/", async (req, res) => {
	const { endTime } = req.body;

	try {
		await Timer.deleteMany({}); // Clear existing timers
		const newTimer = new Timer({ endTime });
		const savedTimer = await newTimer.save();
		res.status(201).send(savedTimer);
	} catch (err) {
		res.status(500).send(err);
	}
});

export default router;
