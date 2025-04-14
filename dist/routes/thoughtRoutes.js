import { Router } from 'express';
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction } from '../controllers/thoughtController.js';
const router = Router();
// Routes for thoughts
// /api/thoughts
router.route('/')
    .get(getAllThoughts) // GET all thoughts
    .post(createThought); // POST a new thought
// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThoughtById) // GET a thought by ID
    .put(updateThought) // PUT to update a thought
    .delete(deleteThought); // DELETE a thought by ID
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction); // POST a reaction to a thought
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction); // DELETE a reaction by ID
export default router;
