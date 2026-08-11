import { sequelize } from '../config/db.js';
import Waitlist from './waitlist.js';

const models = {
  Waitlist
};

export { sequelize, models };
export default models;