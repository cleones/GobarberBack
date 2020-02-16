import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const user = await User.findOne({
      where: { id: req.userId },
    });
    if (!user.isProvider()) {
      return res.status(400).json({
        error: 'User is not a provider',
      });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appintments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    return res.json(appintments);
  }
}
export default new ScheduleController();
