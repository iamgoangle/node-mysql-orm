const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sequelize = require('./config').sequelize;
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

app.post('/todos', (req, res, next) => {

});

app.put('/todo/:id', (req, res, next) => {

});

app.delete('/todo/:id', (req, res, next) => {

});

app.listen(3000, () => {
  console.log('App start port :3000');
});
