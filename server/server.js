import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoute from "./routes/todoRoute.js";
import timerRoute from "./routes/timerRoute.js";
import bmiRoute from "./routes/bmiRoute.js";
import weatherRoute from "./routes/weatherRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

async function connect() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.log(err);
	}
}
connect();

// Routes
app.use("/api/todos", todoRoute);
app.use("/api/timer", timerRoute);
app.use("/api/bmi", bmiRoute);
app.use("/api/weather", weatherRoute);

app.listen(8080, () => {
	console.log("listening to port 8080");
});
