const Sequelize = require('sequelize');

module.exports = {
  sequelize: new Sequelize('mysql://root:test@127.0.0.1:3306/todo', {
    pool: {
      timezone: '+07:00',
      max: 100,
      min: 10,
      idle: 10000
    }
  }),
  transactionOptions: {
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    autocommit: false
  }
};