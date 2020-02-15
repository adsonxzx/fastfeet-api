import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Valitation error' });
    }

    try {
      const recipient = await Recipient.create(req.body);
      return res.json(recipient);
    } catch (error) {
      return res.status(500).json({ error: 'Internal error!' });
    }
  }

  async index(req, res) {
    try {
      const recipients = await Recipient.findAll();

      return res.json(recipients);
    } catch (error) {
      return res.status(500).json({ error: 'Internal error!' });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const recipient = await Recipient.findByPk(id);
      return res.json(recipient);
    } catch (error) {
      return res.status(500).json({ error: 'Internal error!' });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      cep: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Valitation error' });
    }

    const { id } = req.params;

    try {
      const recipient = await Recipient.findByPk(id);

      if (!recipient) {
        return res.status(404).json({ error: 'Recipient not found' });
      }

      await recipient.update(req.body);

      return res.json(recipient);
    } catch (error) {
      return res.status(500).json({ error: 'Internal error!' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const recipient = await Recipient.findByPk(id);

      if (!recipient) {
        return res.status(404).json({ error: 'Recipient not found' });
      }

      await recipient.destroy();

      return res.json({ success: 'Removido com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal error!' });
    }
  }
}

export default new RecipientController();
