import React, { useState, useEffect } from "react";
import axios from "axios";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id_contact: string;
    nama: string;
    perusahaan: string;
    email: string;
    no_telp: string;
    alamat: string;
    produk: string | null;
    jumlah: number | null;
    harga: string | null;
    catatan: string | null;
    sektor: {
      title: string;
      bg: string;
      text: string;
    };
  };
  onSave: (updatedTask: any) => void;
}

const handleEdit = () => {
  // Disini
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({ ...task });
  const [sektorOptions, setSektorOptions] = useState<{ id_sektor: string; nama_sektor: string }[]>([]);
  // Fetch sektor options from the API
  const fetchSektor = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/sektor");
      setSektorOptions(response.data.sektor || []);
    } catch (error) {
      console.error("Error fetching sektor:", error);
    }
  };
  useEffect(() => {
    fetchSektor();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Ensure we send the correct sektorId, not the title
    const updatedTask = {
      ...formData,
      id_sektor: formData.sektorId, // Ensure this matches the backend's expected field
    };
    onSave(updatedTask);
  };

  return (
    <div className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? "grid" : "hidden"}`}>
      <div className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20" onClick={onClose}></div>
      <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center px-5 py-4">
        <div className="w-full h-[70vh] overflow-auto flex flex-col gap-3">
          {/* Form Fields */}
          <div className="w-full flex items-center gap-2">
            <label htmlFor="nama" className="w-[30%] text-sm font-medium">Nama Kontak</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Nama Kontak"
              className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <label htmlFor="perusahaan" className="w-[30%] text-sm font-medium">Perusahaan</label>
            <input
              type="text"
              id="perusahaan"
              name="perusahaan"
              value={formData.perusahaan}
              onChange={handleChange}
              placeholder="Perusahaan"
              className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <label htmlFor="email" className="w-[30%] text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <label htmlFor="no_telp" className="w-[30%] text-sm font-medium">No Telepon</label>
            <input
              type="text"
              id="no_telp"
              name="no_telp"
              value={formData.no_telp}
              onChange={handleChange}
              placeholder="No Telepon"
              className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <label htmlFor="alamat" className="w-[30%] text-sm font-medium">Alamat</label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Alamat"
              className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <label htmlFor="produk" className="w-[30%] text-sm font-medium">Produk</label>
            <input
              type="text"
              id="produk"
              name="produk"
              value={formData.produk || ""}
              onChange={handleChange}
              placeholder="Produk"
              className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <label htmlFor="jumlah" className="w-[30%] text-sm font-medium">Jumlah</label>
            <input
              type="number"
              id="jumlah"
              name="jumlah"
              value={formData.jumlah || ""}
              onChange={handleChange}
              placeholder="Jumlah"
              className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <label htmlFor="harga" className="w-[30%] text-sm font-medium">Harga</label>
            <input
              type="text"
              id="harga"
              name="harga"
              value={formData.harga || ""}
              onChange={handleChange}
              placeholder="Harga"
              className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <label htmlFor="catatan" className="w-[30%] text-sm font-medium">Catatan</label>
            <textarea
              id="catatan"
              name="catatan"
              value={formData.catatan || ""}
              onChange={handleChange}
              placeholder="Catatan"
              className="w-[70%] h-16 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            />
          </div>

          {/* Dropdown for Sektor */}
          <div className="flex flex-row w-full items-center gap-2">
            <label htmlFor="sektorId" className="text-sm font-medium w-[30%]">Sektor</label>
            <select
              id="sektorId"
              name="sektorId"
              onChange={handleChange}
              className="w-[70%] h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            >
              <option value="">Pilih Sektor</option>
              {sektorOptions.map((sektor) => (
                <option key={sektor.id_sektor} value={sektor.id_sektor} selected={sektor.nama_sektor == formData.sektor.title}>
                  {sektor.nama_sektor}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full justify-between mt-3">
            <button
              onClick={onClose}
              className="w-[48%] rounded-md h-9 bg-red-500 text-white font-medium"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="w-[48%] rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
