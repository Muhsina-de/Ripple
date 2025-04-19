import Thought from '../models/thought.js';
import User from '../models/user.js';
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const createThought = async (req, res) => {
    try {
        const { userId, thoughtText } = req.body;
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User does not exist' });
            return; // ensure function exits after sending response
        }
        // Create the thought
        const thought = await Thought.create({
            thoughtText,
            username: user.username, // use real username from user doc
        });
        // Push thought to user's thoughts array
        user.thoughts.push(thought._id);
        await user.save();
        res.status(201).json(thought);
        // display user id and thought text
        console.log(`User ID: ${userId}, Thought Text: ${thoughtText}`);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create thought', details: err });
    }
};
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID' });
            return;
        }
        await User.findByIdAndUpdate({ username: thought.username }, { $pull: { thoughts: req.params.thoughtId } });
        res.json({ message: 'Thought deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        //display msg saying reaction deleted
        res.status(200).json({ message: 'Reaction deleted' });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
