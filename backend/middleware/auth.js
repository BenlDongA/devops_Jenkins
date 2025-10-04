import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load biến môi trường từ file .env
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; // fallback nếu thiếu

// Tạo JWT Token
export const generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

// Xác thực JWT Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

// Middleware: Bảo vệ route (yêu cầu đăng nhập)
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = token ? verifyToken(token) : null;

  if (!decoded) {
    return res.status(401).json({ error: 'Không được phép' });
  }

  req.user = decoded;
  next();
};

// Middleware: Chỉ cho phép admin
export const admin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Truy cập bị từ chối' });
  }
  next();
};
