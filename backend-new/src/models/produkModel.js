import { db } from "../config/db";

// CRUD operations
export const getAllProduk = async () => {
  const [rows] = await db.execute('SELECT * FROM produk');
  return rows;
};

export const getProdukById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM produk WHERE id_produk = ?', [id]);
  return rows[0];
};

export const createProduk = async (produk) => {
  const { nama_produk, harga_produk } = produk;
  const [result] = await db.execute(
    'INSERT INTO produk (nama_produk, harga_produk) VALUES (?, ?)', 
    [nama_produk, harga_produk]
  );
  return result;
};

export const updateProduk = async (id, produk) => {
  const { nama_produk, harga_produk } = produk;
  const [result] = await db.execute(
    'UPDATE produk SET nama_produk = ?, harga_produk = ? WHERE id_produk = ?', 
    [nama_produk, harga_produk, id]
  );
  return result;
};

export const deleteProduk = async (id) => {
  const [result] = await db.execute('DELETE FROM produk WHERE id_produk = ?', [id]);
  return result;
};
