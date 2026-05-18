import { DataTypes, Sequelize, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import {isValidPhoneNumber, parsePhoneNumberWithError} from 'libphonenumber-js'

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

// validação no nível da aplicação, antes de chegar ao banco.

const User = (sequelize: Sequelize) => {
  const UserModel = sequelize.define<UserInstance>('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'First name is required.'},
        notEmpty: {msg: 'First name needs to be filled in.'},
        len:{args: [3, 20], msg: 'Must be between 3 and 20 characters.'} ,
        isAlpha: { msg: 'Only letters are allowed.' }
      }, 
      set(value: string) {
        this.setDataValue("firstName", value.toLowerCase())
      }
      
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Last name is required.'},
        notEmpty: {msg: 'Last name cannot be empty.'}, 
        len:{args: [3, 40], msg: 'Must be between 3 and 40 characters.'} ,
        isAlpha: { msg: 'Only letters are allowed.' }
      },
      set(value: string) {
        this.setDataValue("lastName", value.toLowerCase())
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {msg: 'Email needs to be filled in.'},
        notNull: { msg: 'Email is required.'},
        isEmail: { msg: 'Invalid email format.' }
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Phone needs to be filled in.'},
        notNull: { msg: 'Phone is required.'},
        isValidPhone(value: string) {
          if (!isValidPhoneNumber(value)){
            throw new Error('Invalid phone number.')
          }
        }
      },
      set(value:string){
        try {
          const parsed = parsePhoneNumberWithError(value);
          this.setDataValue('phone', parsed.format('E.164'))
        } catch{
          this.setDataValue('phone', value)
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      //falta algo: Explicar minha lógica para  IA de deixar a confirmação fora e só validar no frontend lá mesmo| faz sentido esse arquivo ser User.ts?
      //regra: 6 caracteres, com letras maiúsculas, minúsculas, números e símbolos
      validate: {
        notEmpty: { msg: 'Password needs to be filled in.'},
        notNull: { msg: 'Password is required.'},
        len:{args: [6, 20], msg: 'Must be between 6 and 20 characters.'}, 
        noSpaces(value: string){
          if(/\s/.test(value)){
            throw new Error('Password cannot contain spaces.')
          }
        }, 
        isStrong(value: string){
          if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/.test(value)){
            throw new Error('Password must contain uppercase, lowercase, number and special character')
          }
        }
      }, 
    }
  }, {
    timestamps: true
  });
  
  UserModel.addHook('beforeCreate', async (user: UserInstance) => {
  user.password = await bcrypt.hash(user.password, 10); });

  UserModel.addHook('beforeUpdate', async (user: UserInstance) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  return UserModel;
};

export default User;