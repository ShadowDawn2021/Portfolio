// models/Timer.js
import mongoose from "mongoose";

const timerSchema = new mongoose.Schema({
	endTime: { type: Date, required: true },
});

const Timer = mongoose.model("Timer", timerSchema);

export default Timer;
