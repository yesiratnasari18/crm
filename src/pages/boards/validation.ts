import { z } from "zod";

const schemaLeads = z.object({
  id_list: z.string({
    message: `Harap pilih leads`
  }),
  id_contact: z.string({
    message: `Harap pilih salah satu kontak!`
  }),
  id_produk: z.string({
    message: `Harap pilih salah satu produk!`
  }),
  jumlah: z.string({
    message: `Harap masukkan kuantitas yang dipesan!`
  }),
  catatan: z.string().optional()
});

export { schemaLeads };