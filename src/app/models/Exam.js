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
}

export default Exam;
