import { db } from "../config/db";

// CRUD operations
export const getAllList = async () => {
  try {
    const [lists] = await db.query("SELECT * FROM list");

    const columnLists = await Promise.all(
      lists.map(async (list) => {
        const [transactions] = await db.query(`
          SELECT 
            t.id_transaksi, c.id_contact, p.id_produk, l.id_list, l.nama_list, c.perusahaan, p.nama_produk, 
            t.jumlah, t.total_harga, t.catatan, t.add_date, t.last_update, 
            t.last_update_status, s.nama_sektor, s.bg_color, s.text_color
          FROM transaksi t
          JOIN list l ON l.id_list = t.id_list
          JOIN contact c ON c.id_contact = t.id_contact
          JOIN produk p ON p.id_produk = t.id_produk
          LEFT JOIN sektor s ON s.id_sektor = c.id_sektor
          WHERE l.id_list = ?
        `, [list.id_list]);

        return {
          id: list.id_list,
          name: list.nama_list,
          tasks: transactions.map(transaction => ({
            id_transaksi: transaction.id_transaksi,
            id_contact: transaction.id_contact,
            id_produk: transaction.id_produk,
            nama_list: transaction.nama_list,
            perusahaan: transaction.perusahaan,
            nama_produk: transaction.nama_produk,
            jumlah: transaction.jumlah,
            total_harga: transaction.total_harga,
            catatan: transaction.catatan,
            add_date: transaction.add_date,
            last_update: transaction.last_update,
            last_update_status: transaction.last_update_status,
            sektor: {
              title: transaction.nama_sektor || "Tidak ada Sektor",
              bg: transaction.bg_color || "#f0f0f0",
              text: transaction.text_color || "#000"
            }
          }))
        };
      })
    );

    return columnLists;
  } catch (error) {
    console.error("getAllList error:", error);
    throw error;
  }
};

export const getListById = async (id) => {
  const rows = await db.execute('SELECT * FROM list WHERE id_list = ?', [id]);
  return rows;
};

export const createList = async (list) => {
  const { nama_list } = list;
  const result = await db.execute(
    'INSERT INTO list (nama_list) VALUES (?)', 
    [nama_list]
  );
  return result;
};

export const updateList = async (id, list) => {
  const { nama_list } = list;
  const result = await db.execute(
    'UPDATE list SET nama_list = ? WHERE id_list = ?', 
    [nama_list, id]
  );
  return result;
};

export const deleteList = async (id) => {
  const result = await db.execute('DELETE FROM list WHERE id_list = ?', [id]);
  return result;
};
