import Sequelize, { Model } from 'sequelize';

const fillable = {
  name: Sequelize.STRING,
  path: Sequelize.STRING,
  url: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${process.env.APP_URL}/${this.path}`;
    },
  },
};
class File extends Model {
  static init(sequelize) {
    super.init(fillable, { sequelize });
    return this;
  }
}
export default File;
