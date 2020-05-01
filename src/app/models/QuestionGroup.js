import Sequelize, { Model } from 'sequelize';

class QuestionGroup extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        note: Sequelize.TEXT,
        color: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Exam, {
      foreignKey: 'exam_id', as: 'exam',
    });
  }
}

export default QuestionGroup;
