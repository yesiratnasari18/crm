import { db } from "../config/db";

// CRUD operations
export const getAllSektor = async () => {
  const [rows] = await db.execute('SELECT * FROM sektor');
  return rows;
};

export const getSektorById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM sektor WHERE id_sektor = ?', [id]);
  return rows[0];
};

export const createSektor = async (sektor) => {
  const { nama_sektor, bg_color, text_color } = sektor;
  const [result] = await db.execute(
    'INSERT INTO sektor (nama_sektor, bg_color, text_color) VALUES (?, ?, ?)', 
    [nama_sektor, bg_color, text_color]
  );
  return result;
};

export const updateSektor = async (id, sektor) => {
  const { nama_sektor, bg_color, text_color } = sektor;
  const [result] = await db.execute(
    'UPDATE sektor SET nama_sektor = ?, bg_color = ?, text_color = ? WHERE id_sektor = ?', 
    [nama_sektor, bg_color, text_color, id]
  );
  return result;
};

export const deleteSektor = async (id) => {
  const [result] = await db.execute('DELETE FROM sektor WHERE id_sektor = ?', [id]);
  return result;
};
