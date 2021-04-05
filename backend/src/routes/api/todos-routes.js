import express from 'express';
import * as todoDao from '../../db/todos-dao';

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

// TODO Exercise Four: Add your RESTful routes here.
//Create new todo
router.post('/', async(req, res) => {
    const newTodo = await todoDao.createTodo(req.body);
    res.status(HTTP_CREATED).header('Location', `/api/todos/${newTodo._id}`).json(newTodo);
});

//retrieve all todos
router.get('/', async(req, res) => {
    const data1 = await todoDao.retrieveAllTodos();
    res.json(data1)
});

//retrieve single todo
router.get('/:id', async(req, res) => {
    try {
        const todo = await todoDao.retrieveTodo(req.params.id);

        if (todo) {
            res.json(todo);
        } else {
            res.sendStatus(HTTP_NOT_FOUND);
        }
    } catch (error) {
        res.sendStatus(400)
    }


});

//update todos
router.put('/:id', async(req, res) => {

    const todo = {...req.body, _id: req.params.id };
    const success = await todoDao.updateTodo(todo);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

//delete todo
router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await todoDao.deleteTodo(id);
        res.sendStatus(HTTP_NO_CONTENT);
    } catch (error) {
        res.sendStatus(400)
    }

});
export default router;