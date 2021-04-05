/**
 * This program should be run in order to populate the database with dummy data for testing purposes.
 */

import mongoose from 'mongoose';
import connectToDatabase from './db-connect';
import { dummyTodos } from './random-todos';
//import { createTodo } from './todos-dao';
import { Todo } from './todos-schema';

main();

async function main() {
    await connectToDatabase();
    console.log('Connected to database!');
    console.log();

    await clearDatabase();
    console.log();

    await addData();
    console.log();

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}

// TODO Exercise Two: Complete the clearDatabase() and addData() functions below.

async function clearDatabase() {
    const response = await Todo.deleteMany({});
    console.log(`Deleted ${response.deletedCount} todos from database`);
}

async function addData() {
    for (let dummyTodo of dummyTodos) {
        const dbTodo = new Todo(dummyTodo);
        await dbTodo.save();
        console.log(`Added ${dummyTodo}`)
    }

}