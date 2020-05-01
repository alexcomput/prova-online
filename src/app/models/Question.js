import Sequelize, { Model } from 'sequelize';

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        type_question: {
          type: Sequelize.ENUM({
            values: ['TEXT', 'TEXTAREA', 'SELECT', 'SELECTMULT', 'CHECK', 'CHECKMULT'],
          }),
        },
        body: Sequelize.JSON, // { 'FIELD': 'Descrição', 'VALUE': 'Valor do field'}
      },
      {
        sequelize,
      },
    );
    return this;
  }
}

export default Question;
