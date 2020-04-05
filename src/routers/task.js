const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

// provide routes and functionalities 2
router.post('/tasks', auth, async (req, res) => {
	//const task = new Task(req.body);
	const task = new Task({
		...req.body, //copy every data to the object
		owner: req.user._id
	});

	try {
		const tasks = await task.save();
		res.status(201).send(tasks);
	} catch (e) {
		res.status(400).send(e);
	}

	// task.save().then(()=> {
	//     res.status(201).send(task);
	// }).catch((error) => {
	//     res.status(400).send(error);
	// })
});

// find all tasks
router.get('/tasks', auth, async (req, res) => {
	const match = {};
	const sort = {};

	if (req.query.completed) {
		match.completed = req.query.completed === 'true';
		// console.log(match.completed);
	}
	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
	}
	try {
		await req.user
			.populate({
				path: 'tasks',
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
					sort
				}
			})
			.execPopulate();
		res.send(req.user.tasks);
	} catch (e) {
		res.status(500).send(e);
	}
});

// find tasks by its id

router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;

	try {
		// const task = await Task.findById(_id);
		const task = await Task.findOne({
			_id,
			owner: req.user._id
		});

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (e) {
		res.status(500).send(e);
	}
	// Task.findById(_id).then((task) => {
	//     if(!task) {
	//         return res.status(404).send()
	//     }

	//     res.send(task);
	// }).catch((error) => {
	//     res.status(404).send(error);
	// })
});

router.patch('/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'description', 'completed' ];

	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({
			error: 'invalid updates'
		});
	}
	const task = await Task.findOne({
		_id: req.params.id,
		owner: req.user._id
	});
	// const task = await Task.findById(req.params.id);

	// const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})

	if (!task) {
		return res.status(404).send();
	}
	updates.forEach((update) => {
		task[update] = req.body[update];
	});

	await task.save();
	res.send(task);
});

router.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id
		});

		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.send(404).send(e);
	}
});

module.exports = router;
