import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!isProvider) {
      return res.status(401).json({
        error: 'Only provider can load notification',
      });
    }

    const notification = await Notification.find({
      user: req.userId,
    }).sort({ createdAt: 'desc' });
    return res.json(notification);
  }

  async update(req, res) {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}
export default new NotificationController();
