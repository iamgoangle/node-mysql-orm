module.exports = (sequelize, DataTypes) => {
  let Todo = sequelize.define('todos', {
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    done: {
      type: DataTypes.BOOLEAN,
      field: 'done',
      default: false
    }
  }, {
    tableName: 'todos'
  });

  return Todo;
};