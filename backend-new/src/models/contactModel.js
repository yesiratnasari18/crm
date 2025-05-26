import { db } from "../config/db";

// CRUD operations
export const getAllContact = async () => {
  const rows = await db.execute('SELECT * FROM contact');
  return rows[0];
};

export const getContactById = async (id) => {
  const rows = await db.execute('SELECT * FROM contact WHERE id_contact = ?', [id]);
  return rows;
};

export const createContact = async (contact) => {
  const { nama, perusahaan, email, no_telp, id_sektor, alamat } = contact;
  const result = await db.execute(
    'INSERT INTO contact (nama, perusahaan, email, no_telp, id_sektor, alamat) VALUES (?, ?, ?, ?, ?, ?)', 
    [nama, perusahaan, email, no_telp, id_sektor, alamat]
  );
  return result;
};

export const updateContact = async (id, contact) => {
  const { nama, perusahaan, email, no_telp, id_sektor, alamat } = contact;
  const result = await db.execute(
    'UPDATE contact SET nama = ?, perusahaan = ?, email = ?, no_telp = ?, id_sektor = ?, alamat = ? WHERE id_contact = ?', 
    [nama, perusahaan, email, no_telp, id_sektor, alamat, id]
  );
  return result;
};

export const deleteContact = async (id) => {
  const result = await db.execute('DELETE FROM contact WHERE id_contact = ?', [id]);
  return result;
};
