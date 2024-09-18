// models/BMI.js
import mongoose from "mongoose";

const bmiSchema = new mongoose.Schema({
	name: { type: String, required: true },
	height: { type: Number, required: true },
	weight: { type: Number, required: true },
	bmi: { type: Number, required: true },
	date: { type: Date, default: Date.now },
});

const BMI = mongoose.model("BMI", bmiSchema);
export default BMI;
