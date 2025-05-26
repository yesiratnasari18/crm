import { useForm } from "react-hook-form";
import { schemaLeads } from "./validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Contact, Produk, Transaksi } from "../../types";
import api from "../../lib";
import { toast } from "react-toastify";
const FormLeads = ({
  defaultList,
  promises,
  setOpen,
  editMode,
  data
}: {
  defaultList?: string;
  promises: () => void;
  setOpen: (params: boolean) => void;
  editMode?: boolean;
  data?: Transaksi
}) => {
  console.log(data);
  const [contacts, setContact] = useState<Contact[]>([]);
  const [produks, setProduk] = useState<Produk[]>([]);
  const token = localStorage.getItem("token");
  const fetchContacts = async () => {
    try {
      const response = await api.get('/contact', {
        headers: {
          "authorization": token
        }
      });
      if (response.status == 200) {
        setContact(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchProduks = async () => {
    try {
      const response = await api.get('/produk', {
        headers: {
          "authorization": token
        }
      });
      if (response.status == 200) {
        setProduk(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  } 

  type FormLeadsValue = z.infer<typeof schemaLeads>;
  const defaultValue: FormLeadsValue = {
    id_contact: data?.id_contact ? data.id_contact.toString() : '',
    id_list: data?.id_list ? data.id_list.toString() : '',
    id_produk: data?.id_produk ? data.id_produk.toString() : '',
    jumlah: data?.jumlah ? data.jumlah.toString() : '',
    catatan: data?.catatan ?? undefined,
  }
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemaLeads),
    defaultValues: defaultValue
  });
  useEffect(() => {
    fetchContacts();
    fetchProduks();
  }, []);

  const onSubmit = async (data: FormLeadsValue) => {
    const newData = { ...data, id_list: defaultList ?? '1' };
    try {
      const response = await api.post('/transaksi/store', newData, {
        headers: {
          'authorization': token
        }
      });
      if (response.status == 201) {
        setOpen(false);
        // alert(`Successfully to insert transaction data`);
        toast.success(`Successfully to insert transaction data`);
        promises();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form method="post" className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full gap-2">
          <label htmlFor="id_contact" className="text-sm font-medium w-[30%]">Nama Pelanggan</label>
          <select className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
          aria-placeholder="Pilih Kontak"
          defaultValue={data?.id_contact.toString()}
          {...register('id_contact')}>
            <option value="">-- Pilih Kontak --</option>
            {contacts.map((contact, idx) => {
              return (
              <option value={`${contact.id_contact}`} key={idx}>{contact.nama}</option>
            )
            })}
          </select>
          {errors.id_contact && <small className="text-red-500 text-sm">{errors.id_contact.message}</small>}
        </div>
        <div className="flex flex-col w-full gap-2">
            <label htmlFor="id_produk" className="text-sm font-medium w-[30%]">Nama Produk</label>
            <select className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
            aria-placeholder="Pilih Produk"
            defaultValue={data?.id_produk.toString()}
            {...register('id_produk')}>
              <option value="">-- Pilih Produk --</option>
              {produks.map((produk, prdx) => {
                return (
                <option value={`${produk.id_produk}`} key={prdx}>{produk.nama_produk}</option>
              )
              })}
            </select>
            {errors.id_produk && <small className="text-red-500 text-sm">{errors.id_produk.message}</small>}
        </div>
        <div className="flex flex-col w-full gap-2">
            <label htmlFor="jumlah" className="text-sm font-medium w-[30%]">Jumlah</label>
            <input type="number" className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium" {...register('jumlah')} />
            {errors.jumlah && <small className="text-red-500 text-sm">{errors.jumlah.message}</small>}
        </div>
        <div className="flex flex-col w-full gap-2">
            <label htmlFor="catatan" className="text-sm font-medium w-[30%]">Catatan</label>
            <textarea {...register('catatan')} className="w-full px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium" rows={5}></textarea>
            {errors.catatan && <small className="text-red-500 text-sm">{errors.catatan.message}</small>}
        </div>
        <div className="flex flex-col w-full">

          <button className={`py-2 text-white rounded-lg shadow-sm ${editMode ? `bg-yellow-500` : `bg-blue-500`}`} type="submit">
            {editMode ? `Update` : `Create`}
          </button>
        </div>
    </form>
  )
}
export default FormLeads;