import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// TODO Exercise One: Model your schema here. Make sure to export it!
const todosSchema = new Schema({

    title: { type: String, required: true },
    description: String,
    dueDate: { type: Date, required: true },
    isComplete: Boolean
}, {
    timestamps: {}
})
const Todo = mongoose.model('Todo', todosSchema);
export { Todo };