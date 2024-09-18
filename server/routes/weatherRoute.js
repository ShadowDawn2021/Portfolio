// server/routes/weather.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const API_KEY = process.env.WEATHER_API_KEY;

// Route to get current weather by city
router.get("/current/:city", async (req, res) => {
	const city = req.params.city;

	try {
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
		);
		res.send(response.data);
	} catch (error) {
		console.error("Error fetching weather data:", error.message);
		res.status(500).send({ error: "Failed to fetch weather data" });
	}
});

// Route to get 5-day forecast by city
router.get("/forecast/:city", async (req, res) => {
	const city = req.params.city;

	try {
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
		);
		res.send(response.data);
	} catch (error) {
		console.error("Error fetching forecast data:", error.message);
		res.status(500).send({ error: "Failed to fetch forecast data" });
	}
});

export default router;
