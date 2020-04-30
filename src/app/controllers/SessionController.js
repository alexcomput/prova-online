import jwt from 'jsonwebtoken';

import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const shema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await shema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade fails' });
    }
    const { email, password } = req.body;
    const user = await User.findOne({
      where:
      { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Passsword does not math' });
    }

    const { id, name, avatar, provider } = user;

    const role = 'user';

    return res.json(
      {
        user: {
          id,
          name,
          email,
          provider,
          avatar,
          role,
        },
        token: jwt.sign({ id, role }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      },
    );
  }
}

export default new SessionController();
