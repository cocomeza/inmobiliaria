import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User.js';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticateToken = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token de acceso requerido' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET no está configurado');
      res.status(500).json({ message: 'Error de configuración del servidor' });
      return;
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as { userId: string };
      
      // Verificar que el usuario existe en la base de datos
      const user = await User.findById(decoded.userId);
      if (!user) {
        res.status(403).json({ message: 'Usuario no encontrado' });
        return;
      }

      req.user = user;
      next();
    } catch (jwtError) {
      res.status(403).json({ message: 'Token inválido' });
      return;
    }
  } catch (error) {
    console.error('Error en authenticateToken:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
    return;
  }
};

export const requireAdmin = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Usuario no autenticado' });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Acceso denegado: se requieren permisos de administrador' });
    return;
  }

  next();
};