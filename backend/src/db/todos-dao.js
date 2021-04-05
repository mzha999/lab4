/**
 * This file contains functions which interact with MongoDB, via mongoose, to perform Todo-related
 * CRUD operations.
 */

// TODO Exercise Three: Implement the five functions below.

import { Todo } from './todos-schema';

export async function createTodo(todo) {
    const dbTodo = new Todo(todo);
    await dbTodo.save();
    return dbTodo;
}

export async function retrieveAllTodos() {
    return await Todo.find();
}

export async function retrieveTodo(id) {
    return await Todo.findById(id);
}

export async function updateTodo(todo) {
    const dbTodo = await Todo.findById(todo._id);
    if (dbTodo) {
        dbTodo.title = todo.title;
        dbTodo.description = todo.description;
        dbTodo.dueDate = todo.dueDate;
        dbTodo.isComplete = todo.isComplete;

        await dbTodo.save()
    } else {
        return false
    }
}

export async function deleteTodo(id) {
    await Todo.deleteOne({ _id: id });
}