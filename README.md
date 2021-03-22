# CS732 Lab 04
**Note:** When running `npm install` to install the dependencies, run it with the additional tag `--legacy-peer-deps` so that dependencies resolve correctly:

```sh
npm install --legacy-peer-deps
```

In this lab, we'll be building a simple application almost from scratch, both frontend and backend - that is, full-stack development! The app we'll be building - and *testing* - is a simple todo-list app.

You'll create the backend in exercises One - Five, and the frontend in the remaining exercises.

## Exercise One - Defining a schema
To begin, let's define the mongoose schema for a todo. Do this in the backend, [src/db/todos-schema.js](./backend/src/db/todos-schema.js).

Todos should have:

- An id (compulsory, unique)
- A title (compulsory)
- A description (optional)
- A created date (compulsory)
- A due date / time (compulsory)
- A completed status (compulsory)

**Hint:** Remember that, depending on the `mongoose.Schema` configuration used, some of the fields above will automatically be included without needing to define them.


## Exercise Two - Populating the database
Now, let's complete the [init-db](./backend/src/db/init-db.js) program that will populate the database with dummy data for testing purposes.

In `init-db.js`, complete the `clearDatabase()` and `addData()` functions. `clearDatabase()` should delete all data from the database, while `addData()` should add some number of dummy todo items, with a range of properties. You may either hardcode the dummy data or use the `dummy-json` library as shown in some of the examples / previous lab exercises. Either way, try to have at least one todo item with each of the following:

- A todo with a short description (20 words or less)
- A todo with a long description (100 words or more)
- A todo with no description
- A completed item
- An incomplete but not overdue item
- An overdue item


## Exercise Three - Implementing a DAO
Next, we'll use our schema in [todos-dao.js](./backend/src/db/todos-dao.js) in order to complete the five CRUD functions defined there.

- `createTodo()` should accept a JS object with a todo item's title, due date, completed status, and (optionally) description. It should use the info to create a database todo item, and return that item.

- `retrieveAllTodos()` should return all database todo items.

- `retrieveTodo()` should return the signle database todo with the given id, or `null` if there are no matches.

- `updateTodo()` should find the todo in the database whose id matches the id of the given object. It should then update the database todo item with the title, due date, completed status, and description of the incoming todo. The function should return a boolean value indicating whether or not the update was successful.

- `deleteTodo()` should delete the todo in the database with the given id, if any.


## Exercise Four - Implementing a REST service
Next, implement a REST service in [todos-routes.js](./backend/src/routes/api/todos-routes.js), which exposes the CRUD functionality implemented in Exercise Three. Specifically, the following should be supported:

- `POST /`: Should create a new todo in the database with the information contained in the request body, and return a `201` status with the new todo in the response body and a `Location` header pointing to the URL of the new todo. If a title isn't received for the new todo, then a `400` response should be returned.

- `GET /`: Should return a `200` response with all todos in the response body.

- `GET /:id`: Should return a `200` response with the todo with the given id in the response body, or a `404` if the todo with that id doesn't exist.

- `PUT /:id`: Should attempt to update the todo with the matching id with the information in the request body. Should return a `204` if successful, and a `404` if there was no matching todo item. If a title isn't given for the updated todo, either the existing title should be used or a `400` response should be returned (up to you).

- `DELETE /:id`: Should delete the todo with the matching id, if any, and return a `204` status.

**Note:** If whatever path param value is supplied to `:id` can't be converted to a MongoDB object id (`mongoose.types.ObjectId`), (for example, when navigating to `/api/todos/blah`, since "blah" isn't a valid object id), then using it to search the database will result in the database query promise rejecting (or throwing an exception if using `try / catch`). You should handle this case, either in these route handlers or in your Exercise Three DAO functions.


## Exercise Five - Testing the REST service
Now that we've got a backend, let's test it!
In the [api](./backend/src/routes/api) folder, create a new folder named `__tests__`. In that folder, create a test file called `todos-routes.test.js`.

Ideally, you should create unit tests for each of the following cases:

- Retrieves all todos successfully

- Retrieves a single todo successfully

- Responds with a 404 when trying to retrieve a nonexistant todo

- Creates a new todo successfully, responding with the correct status, headers, and body, and ensuring the new todo is saved in the database

- Responds with a 400 status when trying to create a new todo without a title, and doesn't update the database.

- Updates an existing todo successfully, responding with the correct status and ensuring the todo is updated in the database

- Responds with a 404 when trying to update a nonexistant todo (and that doesn't result in any changes to the database)

- Deletes a todo successuflly, and response with the correct status code (and the todo is actually deleted from the database)

- When trying to delete a nonexistant todo, gives the correct response status and doesn't change the database

For this lab, you're welcome to implemnet fewer tests than this if you're confident that you've got the hang of it. But it is good practice!

**Hint:** Remember that an axios promise will reject / throw an exception if the server responds with a 4xx or 5xx status code. Therefore these error cases should be checked using `try / catch` or one of the built-in Jest options for handling async successes / failures.


## Exercise Six - Getting todos from the frontend
After completing the first five exercises, we have a functional backend for our todo app. Now, we'll implement the frontend.

Start by adding code at an appropriate location (probably within [AppContextProvider](./frontend/src/AppContextProvider.js)) which will `GET` the list of todo items from the backend, and display them somewhere. For this exercise, we can simply `console.log()` the todos, to make sure our code is working properly and that the frontend is talking to the backend.


## Exercise Seven - The app's UI
For this exercise, create a React component that can dislay a single todo item. Exactly how you want the component to look is up to you, but it should be able to display the following information for a given todo item:

- its title
- its description, if any
- its created date & time
- its due date & time
- its completed status

It should also display a visual indication of some kind depending on whether the todo is:

- completed
- overdue (i.e. incomplete and the due date has already passed)
- upcoming (i.e. incomplete and the due date is within one day)
- incomplete (with a due date one day or more in the future)

This could be a different color, or some additional text, or anything else you like.

In preparation for a future exercise (Exercise Nine), you might wish to also include in the UI the ability to toggle a todo item's completed status, and to delete a todo item. You don't have to implement the logic behind these two points for this exercise though.

Once you've created your "todo" component, update the app so that it renders a list of these todo components - one for each todo item.


## Exercise Eight - Testing the UI
For this exercise, write unit tests for your todo component you completed in Exercise Seven.

Test that the component is rendered correctly in each of the following cases:

- No todo item is supplied
- A completed todo item is supplied
- An overdue todo item is supplied
- An upcoming todo item is supplied
- A todo item is suppplied which doesn't fit into one of the above categories

You may use any of the testing strategies examined in lectures (i.e. shallow testing, snapshot testing, or deep UI examination).

In your journals or the space below, write down your justification for choosing the testing strategy that you did.

```
Your answer here
```


## Exercise Nine - Adding, updating, and removing todos
In this exercise, we'll give the frontend the ability to modify our backend state - i.e. by adding, removing, and updating todos.

To begin, if you've not already done so, modify the todo component you wrote in Exercise Seven to add the ability to toggle a todo's completed status, and to delete a todo.

Next, add event handling to the "toggle" and "delete" UI elements above:

- When the user tries to toggle an item's completed status on the UI, this should result in your "Update" REST service method from Exercise Four correctly being called.

- When the user tries to delete an item on the UI, this should result in your "Delete" REST service method from Exercise Four correctly being called.

In both cases, if a success response is received from the backend, the UI should be updated to match. Exactly how you do this is up to you - one possibility is to make use of the `reFetch()` function provided in the [useGet()](./frontend/src/hooks/useGet.js) hook.

Next, modify the UI so that, underneath the list of todo items, there's a simple form allowing users to add new todo items. Users should be able to enter a new item's title, description, and due date. Users should only be able to actually add new todos if the title and due date are filled in (the description is optional).

When the user has entered the info for a new todo item and clicks a button, your "Create" REST service method from Exercise Four should be correctly called. Then, when a successful response is received, the new todo should be displayed in the existing list (again, you may use `reFetch()` or any other method you like to achieve this).


## Exercise Ten - Updating the tests
For this exercise, start by modifying the unit tests you wrote in Exercise Eight if necessary, such that any tests that broke because of your Exercise Nine implementation pass once again.

Next, add unit tests which exercise the add / update / remove functionality introduced in Exercise Nine. The tests should make sure that the appropriate REST calls are made by your frontend in response to user input, and, when the responses to those REST requests are recieved, that the UI updates properly.
