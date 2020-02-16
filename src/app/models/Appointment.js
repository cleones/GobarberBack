import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

const fillable = {
  date: Sequelize.DATE,
  canceled_at: Sequelize.DATE,
  past: {
    type: Sequelize.VIRTUAL,
    get() {
      return isBefore(this.date, new Date());
    },
  },
  cancelable: {
    type: Sequelize.VIRTUAL,
    get() {
      return isBefore(this.date, subHours(new Date(), 2));
    },
  },
};
class Appointment extends Model {
  static init(sequelize) {
    super.init(fillable, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}
export default Appointment;
