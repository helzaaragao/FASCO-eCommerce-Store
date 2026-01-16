import { DataTypes, Sequelize, Model } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserInstance extends Model {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  
  verifyPassword(password: string): Promise<boolean>;
  getFullName(): string;
}

const User = (sequelize: Sequelize) => {
  const UserModel = sequelize.define<UserInstance>('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(value, saltRounds);
        this.setDataValue('password', hash);
      }
    }
  }, {
    timestamps: true
  });

  return UserModel;
};

export default User;