import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import util from 'util';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const shape = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await shape.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Error!' });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'User not found!' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect Password!' });
      }

      const token = await util.promisify(jwt.sign)(
        { id: user.id },
        authConfig.secrete
      );

      return res.json({
        user: {
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      return res.json({ error: 'Internal Error!' });
    }
  }
}

export default new SessionController();
