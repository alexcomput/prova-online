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
}

export default QuestionGroup;
