import express from "express";
import Todo from "../models/Todo.js"; // Ensure the correct import path and include the .js extension

const router = express.Router();

//Get existing to-do
router.get("/", async (req, res) => {
	try {
		const result = await Todo.find({});
		res.send(result);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Create a new to-do
router.post("/", async (req, res) => {
	const { title, completed } = req.body;
	const newTodo = new Todo({
		title,
		completed: completed || false,
	});

	try {
		const savedTodo = await newTodo.save();
		res.status(201).send(savedTodo);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Update a to-do by ID
router.put("/:id", async (req, res) => {
	const id = req.params.id;
	const { title, completed } = req.body;

	try {
		const updatedTodo = await Todo.findByIdAndUpdate(
			id,
			{ title, completed },
			{ new: true }
		);
		if (updatedTodo) {
			res.send(updatedTodo);
		} else {
			res.status(404).send("Todo not found");
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

router.delete("/delete/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const deletedTodo = await Todo.findByIdAndDelete(id);
		if (deletedTodo) {
			res.send({ message: "Todo deleted" });
		} else {
			res.status(404).send("Todo not found");
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

// Other routes (GET, DELETE) as needed...

export default router;
