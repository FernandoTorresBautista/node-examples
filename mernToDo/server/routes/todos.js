import express from 'express';
import { createTodo, readTodos } from '../controllers/todos.js';

const router = express.Router();

router.get('/', readTodos);
router.post('/', createTodo);

export default router;