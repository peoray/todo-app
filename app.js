const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const todos = [];
const completed = [];

app.get('/', (req, res) => {
  res.render('index', { todos, completed });
});

app.post('/addTodo', (req, res) => {
  //   if (todos.length <= 0) {
  //     document.getElementById('top').style.display = 'none';
  //   } else {
  //     document.getElementById('top').style.display = 'block';
  //   }
  const newTodo = req.body.newTodo;
  todos.push(newTodo);
  res.redirect('/');
});

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

app.listen(3002, () => console.log('server is listening at port 3000'));
