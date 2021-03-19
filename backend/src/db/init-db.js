/**
 * This program should be run in order to populate the database with dummy data for testing purposes.
 */

import mongoose from 'mongoose';
import connectToDatabase from './db-connect';

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

}

async function addData() {

}