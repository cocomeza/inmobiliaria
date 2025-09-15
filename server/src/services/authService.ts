import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User.js';

export interface LoginResult {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  message?: string;
}

export const authService = {
  async login(username: string, password: string): Promise<LoginResult> {
    try {
      if (!username || !password) {
        return {
          success: false,
          message: 'Usuario y contraseña son requeridos'
        };
      }

      // Buscar usuario por username o email
      const user = await User.findOne({
        $or: [
          { username: username.toLowerCase().trim() },
          { email: username.toLowerCase().trim() }
        ]
      });

      if (!user) {
        return {
          success: false,
          message: 'Usuario o contraseña incorrectos'
        };
      }

      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        return {
          success: false,
          message: 'Usuario o contraseña incorrectos'
        };
      }

      // Generar token JWT
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET no está configurado');
      }

      const token = jwt.sign(
        { userId: (user._id as any).toString() },
        jwtSecret,
        { expiresIn: '24h' }
      );

      return {
        success: true,
        token,
        user: {
          id: (user._id as any).toString(),
          username: user.username,
          email: user.email,
          role: user.role
        }
      };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: 'Error interno del servidor'
      };
    }
  },

  async createUser(userData: {
    username: string;
    email: string;
    password: string;
    role?: 'admin' | 'user';
  }): Promise<{ success: boolean; user?: any; message?: string }> {
    try {
      const { username, email, password, role = 'user' } = userData;

      // Validar que no existe el usuario
      const existingUser = await User.findOne({
        $or: [
          { username: username.toLowerCase().trim() },
          { email: email.toLowerCase().trim() }
        ]
      });

      if (existingUser) {
        return {
          success: false,
          message: 'El usuario o email ya existe'
        };
      }

      // Hash de la contraseña
      const passwordHash = await bcrypt.hash(password, 12);

      // Crear usuario
      const user = new User({
        username: username.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        role
      });

      await user.save();

      return {
        success: true,
        user: {
          id: (user._id as any).toString(),
          username: user.username,
          email: user.email,
          role: user.role
        }
      };
    } catch (error) {
      console.error('Error creando usuario:', error);
      return {
        success: false,
        message: 'Error creando usuario'
      };
    }
  }
};