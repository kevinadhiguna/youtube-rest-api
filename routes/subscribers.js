const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// == CRUD Actions ==

// [1] Read/Retrive
// Getting all
router.get("/", async (req, res) => {
	// Try-Catch is used here to tell a user what happened if an error occurs
	try {
		const subscribers = await Subscriber.find();
		// Send 'subscribers' to the user if succeed
		res.json(subscribers);
	} catch (err) {
		// Set status to '500' on error to notify a user that something is wrong with server.. (Server Error)
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get("/:id", getSubscriber, (req, res) => {
	// Send a response to a user based on what he/she wants to request (find)
	res.json(res.subscriber);
	// res.send(req.params.id);
});

// [2] Create
// Creating One
router.post("/", async (req, res) => {
	// Pass a new subscriber according to what a user requested
	const subscriber = new Subscriber({
		name: req.body.name,
		subscribedToChannel: req.body.subscribedToChannel,
	});

	try {
		const newSubscriber = await subscriber.save();
		// status '201' means a user has successfully created something new. More specific than '200'
		res.status(201).json(newSubscriber);
	} catch (err) {
		// An error mainly occurs here when a user does not pass some required fields such as subscriber's name. Hence the error will be on client-side (status: 4XX).
		res.status(400).json({ message: err.message });
	}
});

// [3] Update

// Note:
// -> I use 'patch' instead of 'put' because I want to update only based on what user passed.
// -> On the other hand, 'put' changes all existing fields even if a user only changes one field.

// Updating One
router.patch("/:id", getSubscriber, async (req, res) => {
	if (req.body.name !== null) {
		res.subscriber.name = req.body.name;
	}
	if (req.body.subscribedToChannel != null) {
		res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
	}

	try {
		const updatedSubscriber = await res.subscriber.save();
		res.json(updatedSubscriber);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// [4] Delete
// Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
	try {
		await res.subscriber.remove();
		res.json({ message: "Successfully deleted a subscriber!" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getSubscriber(req, res, next) {
	let subscriber;

	try {
		subscriber = await Subscriber.findById(req.params.id);

		if (subscriber == null) {
			return res.status(404).json({ message: "Can not find Subscriber..." });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.subscriber = subscriber;
	next();
}

module.exports = router;
