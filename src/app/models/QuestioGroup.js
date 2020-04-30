import Sequelize, { Model } from 'sequelize';

class QuestioGroup extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        note: Sequelize.STRING,
        color: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
    return this;
  }
}

export default QuestioGroup;
