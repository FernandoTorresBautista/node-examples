import mongoose from 'mongoose';
import Todo from '../models/todos.js';

export const readTodos = async(req, res) => {
  try{
    const todos = await Todo.find();
    res.status(200).json(todos)
  }catch(error) {
    res.status(404).json({error: error.message})
  }
}

export const createTodo = async(req, res) => {
  const todo = new Todo(req.body);
  try{
    await todo.save()
    res.status(200).json(todo)
  }catch(error) {
    res.status(404).json({error: error.message})
  }
}

export const updateTodo = async(req, res) => {
  const {id} = req.params;
  const {title, content} = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404),send(`The id ${id} is not valid`);
  }
  const todo = {title, content};
  await Todo.findByIdAndUpdate(id, todo, {
    new: true
  })
  res.status(200).json(todo);
}

export const deleteTodo = async(req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404),send(`The id ${id} is not valid`);
  }
  await Todo.findByIdAndRemove(id);
  res.status(200).json({msg: 'Todo Deleted successfully'});
}
