const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sequelize = require('./config').sequelize;
const Op = sequelize.Op;
const Todo = sequelize.import('./models/todo');
const TransactionOptions = require('./config').transactionOptions;

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/', (req, res, next) => {
  res.json({
    tdd: 'Hello world'
  });
});

app.get('/todos', async (req, res, next) => {
  let result = await sequelize.transaction(TransactionOptions, (t) => {
    return Todo.findAll({
      transaction: t
    });
  });

  res.json(result);
});

app.post('/todo', async (req, res, next) => {
  try {
    let todo = req.body;
    let result = await sequelize.transaction(TransactionOptions, (t) => {
      return Todo.create(todo, {
        transaction: t
      });
    });

    res.json({
      message: 'Create todo success',
      data: result
    });
  } catch (e) {
    res.status(500).json({
      message: 'Create todo failed'
    });
  }
});

app.put('/todo/:id', async (req, res, next) => {
  try {
    let todoId = parseInt(req.params.id, 10);
    let newTodo = req.body;

    let result = await sequelize.transaction(TransactionOptions, (t) => {
      return Todo.update({
        newTodo
      }, {
        where: {
          [Op.and]: { id: todoId }
        }
      });
    });

    res.json({
      message: 'Update todo success',
      data: result
    });
  } catch (e) {
    res.status(500).json({
      message: 'Update todo failed'
    });
  }
});

app.delete('/todo/:id', (req, res, next) => {

});

app.listen(3000, () => {
  console.log('App start port :3000');
});
