import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

const fillable = {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
};
class User extends Model {
  static init(sequelize) {
    super.init(fillable, { sequelize });
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  isProvider() {
    return this.provider;
  }
}
export default User;
