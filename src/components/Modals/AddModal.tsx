import React, { useState } from "react";

const AddModal = ({ isOpen, onClose, handleAddTask, sektorOptions }: any) => {
  const [taskData, setTaskData] = useState({
    nama: "",
    perusahaan: "",
    email: "",
    no_telp: "",
    alamat: "",
    produk: '-',
    jumlah: 0,
    harga: 0,
    catatan: '-',
    columnId: "", // ID kolom tujuan
    sektorId: "", // ID sektor
    add_date: new Date().toISOString(),


  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = () => {
    // Validate all required fields
    if (!taskData.nama || !taskData.sektorId || !taskData.add_date) {
      alert("Nama, Kolom, dan Sektor wajib diisi!");
      return;
    }

    handleAddTask(taskData);
  };


  if (!isOpen) return null;

  return (
    <div className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? "grid" : "hidden"}`}>
      <div className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20" onClick={onClose}></div>
      <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
        {/* Nama */}
        <div className="flex flex-row w-full items-center gap-2">
          <label htmlFor="nama" className="text-sm font-medium w-[30%]">Nama Pelanggan</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={taskData.nama}
            onChange={handleChange}
            placeholder="Nama Kontak"
            className="w-[70%] h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
          />
        </div>

        {/* Perusahaan */}
        <div className="flex flex-row w-full items-center gap-2">
          <label htmlFor="perusahaan" className="text-sm font-medium w-[30%]">Perusahaan</label>
          <input
            type="text"
            id="perusahaan"
            name="perusahaan"
            value={taskData.perusahaan}
            onChange={handleChange}
            placeholder="Perusahaan"
            className="w-[70%] h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
          />
        </div>

        {/* Email */}
        <div className="flex flex-row w-full items-center gap-2">
          <label htmlFor="email" className="text-sm font-medium w-[30%]">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={taskData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-[70%] h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
          />
        </div>

        {/* No Telepon */}
        <div className="flex flex-row w-full items-center gap-2">
          <label htmlFor="no_telp" className="text-sm font-medium w-[30%]">No Telepon</label>
          <input
            type="text"
            id="no_telp"
            name="no_telp"
            value={taskData.no_telp}
            onChange={handleChange}
            placeholder="No Telepon"
            className="w-[70%] h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
          />
        </div>

        {/* Alamat */}
        <div className="flex flex-row w-full items-center gap-2">
          <label htmlFor="alamat" className="text-sm font-medium w-[30%]">Alamat</label>
          <input
            type="text"
            id="alamat"
            name="alamat"
            value={taskData.alamat}
            onChange={handleChange}
            placeholder="Alamat"
            className="w-[70%] h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
          />
        </div>

        {/* Dropdown for Sektor */}
        <div className="flex flex-row w-full items-center gap-2">
          <label htmlFor="sektorId" className="text-sm font-medium w-[30%]">Sektor</label>
          <select
            id="sektorId"
            name="sektorId"
            value={taskData.sektorId}
            onChange={handleChange}
            className="w-[70%] h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
          >
            <option value="">Pilih Sektor</option>
            {sektorOptions.map((sektor: any) => (
              <option key={sektor.id_sektor} value={sektor.id_sektor}>
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
            onClick={handleSubmit}
            className="w-[48%] rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
