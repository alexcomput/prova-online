import * as Yup from 'yup';
import Exam from '../models/Exam';
import User from '../models/User';

class ExamController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const exam = await Exam.findAll({
      where: {user_id: req.userId, canceled_at: null},
      order: ['id'],
      attributes: ['id', 'name', 'expiry_date'],
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'responsible',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(exam);
  }

  async store(req, res) {
    const shema = Yup.object().shape({
      name: Yup.string().required(),
      note: Yup.string(),
    });

    if (!(await shema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade fails' });
    }

    const {name, note} = req.body;

    const exam = await Exam.create({
      user_id: req.userId,
      name,
      note,
    });

    return res.json(exam);
  }

  async update(req, res) {
    const { id } = req.body;

    const exam = await Exam.findByPk(id);

    const ret = await exam.update(req.body);

    return res.json({ ret });
  }
}

export default new ExamController();
