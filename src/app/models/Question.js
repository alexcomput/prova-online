import Sequelize, { Model } from 'sequelize';

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        text: Sequelize.STRING,
        type: {
          type: Sequelize.ENUM({
            values: ['TEXT', 'TEXTAREA', 'SELECT', 'MULTSELECT'],
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
