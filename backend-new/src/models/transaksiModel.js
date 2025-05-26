import { db } from "../config/db";

// CRUD operations
export const getAllTransaksi = async () => {
  try {
    const [transaksis] = await db.query("SELECT * FROM transaksi");

    const columnTransaksis = await Promise.all(
      transaksis.map(async (transaksi) => {
        const [transactions] = await db.query(`
          SELECT 
            t.id_transaksi, l.nama_transaksi, c.perusahaan, p.nama_produk, 
            t.jumlah, t.total_harga, t.catatan, t.add_date, t.last_update, 
            t.last_update_status, s.nama_sektor, s.bg_color, s.text_color
          FROM transaksi t
          JOIN transaksi l ON l.id_transaksi = t.id_transaksi
          JOIN contact c ON c.id_contact = t.id_contact
          JOIN produk p ON p.id_produk = t.id_produk
          LEFT JOIN sektor s ON s.id_sektor = c.id_sektor
          WHERE l.id_transaksi = ?
        `, [transaksi.id_transaksi]);

        return {
          id: transaksi.id_transaksi,
          name: transaksi.nama_transaksi,
          tasks: transactions.map(transaction => ({
            id_transaksi: transaction.id_transaksi,
            nama_transaksi: transaction.nama_transaksi,
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

    return columnTransaksis;
  } catch (error) {
    console.error("getAllTransaksi error:", error);
    throw error;
  }
};

export const getTransaksiById = async (id) => {
  const rows = await db.execute('SELECT * FROM transaksi WHERE id_transaksi = ?', [id]);
  return rows;
};

export const createTransaksi = async (transaksi) => {
  const { id_list, id_contact, id_produk, jumlah, catatan } = transaksi;
  // const produk = await db.execute('SELECT * FROM produk WHERE id_produk = ?', [id_produk]);
  // const total_harga = produk[0].harga_produk * jumlah;
  const result = await db.execute(
    'INSERT INTO transaksi (id_list, id_contact, id_produk, jumlah, catatan) VALUES (?, ?, ?, ?, ?)', 
    [id_list, id_contact, id_produk, jumlah, catatan]
  );
  return result;
};

export const updateTransaksi = async (id, transaksi) => {
  const { id_contact, id_produk, jumlah, catatan } = transaksi;
  const result = await db.execute(
    'UPDATE transaksi SET id_contact = ?, id_produk = ?, jumlah = ?, catatan = ? WHERE id_transaksi = ?', 
    [id_contact, id_produk, jumlah, catatan, id]
  );
  return result;
};

export const updateListTransaksi = async (id, transaksi) => {
  const { id_list } = transaksi;
  const result = await db.execute(
    'UPDATE transaksi SET id_list = ? WHERE id_transaksi = ?', 
    [id_list, id]
  );
  return result;
}

export const deleteTransaksi = async (id) => {
  const result = await db.execute('DELETE FROM transaksi WHERE id_transaksi = ?', [id]);
  return result;
};
