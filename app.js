//dependencies required for the app
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// middlewares
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// arrays for added todos
const todos = [];
// arrays for completed todos
const completed = [];

// route to render index.ejs
app.get('/', (req, res) => {
  res.render('index', {
    todos,
    completed
  });
});

//post route for adding new task
app.post('/addTodo', (req, res) => {
  const newTodo = req.body.newTodo;
  todos.push(newTodo);
  res.redirect('/');
});

//post route for removing task
app.post('/removeTodo', (req, res) => {
  const checked = req.body.check;
  if (typeof checked === 'string') {
    completed.push(checked);
    todos.splice(todos.indexOf(checked), 1);
  } else if (typeof checked === 'object') {
    checked.forEach(check => {
      completed.push(check);
      todos.splice(todos.indexOf(check), 1);
    });
  }
  res.redirect('/');
});

//set app to listen on port 3000
app.listen(3000, () => console.log('server is listening at port 3000'));