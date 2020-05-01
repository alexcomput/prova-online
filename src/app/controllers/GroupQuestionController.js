import * as Yup from 'yup';
import Exam from '../models/Exam';
import QuestionGroup from '../models/QuestionGroup';

class GroupQuestionController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const groupQuestion = await QuestionGroup.findAll({
      order: ['id'],
      attributes: ['id', 'description', 'color'],
      offset: (page - 1) * 20,
      include: [
        {
          where: {user_id: req.userId, canceled_at: null},
          model: Exam,
          as: 'exam',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(groupQuestion);
  }

  async store(req, res) {
    const shema = Yup.object().shape({
      description: Yup.string().required(),
      note: Yup.string(),
      color: Yup.string(),
      exam_id: Yup.number().required(),
    });

    if (!(await shema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade fails' });
    }
    const groupQuestion = await QuestionGroup.create({
      user_id: req.userId,
      ...req.body,
    });

    return res.json(groupQuestion);
  }

  async update(req, res) {
    const shema = Yup.object().shape({
      description: Yup.string().required(),
      note: Yup.string(),
      color: Yup.string(),
      exam_id: Yup.number().required(),
    });

    if (!(await shema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade fails' });
    }
    const { id, exam_id } = req.body;

    const groupQuestion = await QuestionGroup.findByPk(id,
      {
        where: { exam_id },
        include: [
          {
            where: { user_id: req.userId, canceled_at: null },
            model: Exam,
            as: 'exam',
            attributes: ['id', 'name'],
          },
        ],
      });

    if (!groupQuestion) {
      return res.status(400).json({ error: 'Group question not found' });
    }

    const ret = await groupQuestion.update(req.body);

    return res.json({ ret });
  }
}

export default new GroupQuestionController();
