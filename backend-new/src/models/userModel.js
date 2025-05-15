import { db } from "../config/db";
import bcrypt from 'bcryptjs';

// CRUD operations
export const getAllUser = async () => {
  const [rows] = await db.execute('SELECT * FROM user');
  return rows;
};

export const getUserByParams = async (params, data) => {
  const [rows] = await db.execute(`SELECT * FROM user WHERE ${params} = ?`, [data]);
  return rows[0];
}

export const createUser = async (user) => {
  const { nama, email, password, roles } = user;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const [result] = await db.execute(
    'INSERT INTO user (nama, email, password, roles) VALUES (?, ?, ?, ?)', 
    [nama, email, hashedPassword, roles]
  );
  return result;
};

// Fungsi untuk memverifikasi password
export const verifyPassword = (inputPassword, storedPassword) => {
  return bcrypt.compareSync(inputPassword, storedPassword);
};

export const updateUser = async (id, user) => {
  const { nama, email, roles } = user;
  const [result] = await db.execute(
    'UPDATE user SET nama = ?, email = ?, roles = ? WHERE id_user = ?', 
    [nama, email, roles, id]
  );
  return result;
};

