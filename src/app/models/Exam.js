import Sequelize, { Model } from 'sequelize';

class Exam extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        expiry_date: Sequelize.DATE,
        note: Sequelize.TEXT,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id', as: 'responsible',
    });
  }
}

export default Exam;
