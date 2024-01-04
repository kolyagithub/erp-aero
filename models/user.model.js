module.exports = (sequelize, Sequelize) => {
  
  return sequelize.define("users", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING
    }
  });
  
};
