module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type_question: {
        type: Sequelize.ENUM('TEXT', 'TEXTAREA', 'SELECT', 'MULTSELECT'),
      },
      body: {
        type: Sequelize.JSON,
      },
      question_groupo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'question_groups', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('questions');
  },
};
