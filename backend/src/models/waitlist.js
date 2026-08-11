import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Waitlist = sequelize.define('Waitlist', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});

export default Waitlist;