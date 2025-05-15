import jwt from 'jsonwebtoken';
import { getUserByParams, verifyPassword } from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

// Fungsi untuk login pengguna dan mengembalikan JWT jika valid
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Cek apakah email dan password diberikan
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Cari pengguna berdasarkan email
    const user = await getUserByParams('email', email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verifikasi password
    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Jika password valid, buat token JWT
    const token = jwt.sign(
      { userId: user.id_user, email: user.email },
      process.env.SECRET_KEY, // Kunci rahasia untuk menandatangani token
      { expiresIn: process.env.JWT_EXPIRE } // Token kedaluwarsa setelah waktu tertentu
    );

    // Kirimkan token ke pengguna
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
