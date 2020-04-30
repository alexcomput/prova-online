module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exam', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiry_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

    });

  },

  down: (queryInterface) => {
    return queryInterface.dropTable('exam');
  }
};
