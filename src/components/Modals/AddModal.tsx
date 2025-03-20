// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { getRandomColors } from "../../helpers/getRandomColors";
// import { v4 as uuidv4 } from "uuid";

// interface Tag {
//     title: string;
//     bg: string;
//     text: string;
// }

// interface AddModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     handleAddTask: (taskData: any) => void;
// }

// const AddModal = ({ isOpen, onClose, setOpen, handleAddTask }: AddModalProps) => {
//     const initialTaskData = {
//         id_contact: uuidv4(),
//         nama: "",
//         perusahaan: "",
//         email: "",
//         no_telp: "",
//         alamat: "",
//         image: "",
//         alt: "",
//         tags: [] as Tag[],
//     };

//     const [taskData, setTaskData] = useState(initialTaskData);
//     const [tagTitle, setTagTitle] = useState("");

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//     ) => {
//         const { name, value } = e.target;
//         setTaskData({ ...taskData, [name]: value });
//     };

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const reader = new FileReader();
//             reader.onload = function (e) {
//                 if (e.target) {
//                     setTaskData({ ...taskData, image: e.target.result as string });
//                 }
//             };
//             reader.readAsDataURL(e.target.files[0]);
//         }
//     };

//     const handleAddTag = () => {
//         if (tagTitle.trim() !== "") {
//             const { bg, text } = getRandomColors();
//             const newTag: Tag = { title: tagTitle.trim(), bg, text };
//             setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
//             setTagTitle("");
//         }
//     };

//     const handleRemoveTag = (index: number) => {
//         const updatedTags = taskData.tags.filter((_, i) => i !== index);
//         setTaskData({ ...taskData, tags: updatedTags });
//     };

//     const closeModal = () => {
//         setOpen(false);
//         onClose();
//         setTaskData(initialTaskData); // Reset form data
//     };

//     const handleSubmit = () => {
//         if (!taskData?.nama) {
//             alert("Nama Harus Diisi");
//             return;
//         }
//         if (!taskData?.perusahaan) {
//             alert("Perusahaan Harus Diisi");
//             return;
//         }
//         if (!taskData?.email) {
//             alert("Email Harus Diisi");
//             return;
//         }
//         if (!taskData?.no_telp) {
//             alert("Nomor Telepon Harus Diisi");
//             return;
//         }
//         if (!taskData?.alamat) {
//             alert("Alamat Harus Diisi");
//             return;
//         }
//         handleAddTask(taskData);
//         closeModal();
//     };

//     return (
//         <div
//             className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? "grid" : "hidden"}`}
//         >
//             <div
//                 className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
//                 onClick={closeModal}
//             ></div>
//             <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
//                 <input
//                     type="text"
//                     name="nama"
//                     value={taskData.nama}
//                     onChange={handleChange}
//                     placeholder="Nama Pelanggan"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     type="text"
//                     name="perusahaan"
//                     value={taskData.perusahaan}
//                     onChange={handleChange}
//                     placeholder="Nama Perusahaan"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     name="email"
//                     onChange={handleChange}
//                     value={taskData.email}
//                     placeholder="Email"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     name="no_telp"
//                     value={taskData.no_telp}
//                     onChange={handleChange}
//                     placeholder="Masukkan Nomor Telepon"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 />
//                 <input
//                     name="alamat"
//                     value={taskData.alamat}
//                     onChange={handleChange}
//                     placeholder="Alamat"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 />
//                 <select
//                     value={tagTitle}
//                     onChange={(e) => setTagTitle(e.target.value)} // Menyimpan nilai yang dipilih
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 >
//                     <option value="">Sektor</option>
//                     <option value="Perbankan">Perbankan</option>
//                     <option value="Manufaktur">Manufaktur</option>
//                     <option value="Industri">Industri</option>
//                     <option value="Pemerinta">Pemerinta</option>
//                     <option value="BUMN">BUMN</option>
//                     <option value="Entertaiment">Entertaiment</option>
//                 </select>
//                 <button
//                     className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
//                     onClick={handleAddTag}
//                 >
//                     Add Tag
//                 </button>
//                 <div className="w-full">
//                     {taskData.tags.length > 0 && <span>Tags:</span>}
//                     {taskData.tags.map((tag, index) => (
//                         <div
//                             key={index}
//                             className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md relative"
//                             style={{ backgroundColor: tag.bg, color: tag.text }}
//                         >
//                             {tag.title}
//                             <button
//                                 onClick={() => handleRemoveTag(index)} // Tombol hapus tag
//                                 className="absolute top-0 right-0 p-1 text-red-500"
//                             >
//                                 x
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex w-full justify-between mt-3">
//                     <button
//                         className="w-[48%] rounded-md h-9 bg-red-500 text-white font-medium"
//                         onClick={closeModal} // Call to close modal on cancel
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className="w-[48%] rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
//                         onClick={handleSubmit}
//                     >
//                         Submit Task
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddModal;

// 2
// import React, { useState } from 'react';
// import { getRandomColors } from '../../helpers/getRandomColors';
// import { v4 as uuidv4 } from 'uuid';

// const AddModal = ({ isOpen, onClose, setOpen, handleAddTask }) => {
//     const initialTaskData = {
//         id_contact: uuidv4(),
//         nama: '',
//         perusahaan: '',
//         email: '',
//         no_telp: '',
//         alamat: '',
//         image: '',
//         alt: '',
//         tags: [],
//     };

//     const [taskData, setTaskData] = useState(initialTaskData);
//     const [tagTitle, setTagTitle] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTaskData({ ...taskData, [name]: value });
//     };

//     const handleImageChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             const reader = new FileReader();
//             reader.onload = function (e) {
//                 if (e.target) {
//                     setTaskData({ ...taskData, image: e.target.result });
//                 }
//             };
//             reader.readAsDataURL(e.target.files[0]);
//         }
//     };

//     const handleAddTag = () => {
//         if (tagTitle.trim() !== '') {
//             const { bg, text } = getRandomColors();
//             const newTag = { title: tagTitle.trim(), bg, text };
//             setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
//             setTagTitle('');
//         }
//     };

//     const handleRemoveTag = (index) => {
//         const updatedTags = taskData.tags.filter((_, i) => i !== index);
//         setTaskData({ ...taskData, tags: updatedTags });
//     };

//     const handleSubmit = () => {
//         if (!taskData.nama || !taskData.perusahaan || !taskData.email || !taskData.no_telp || !taskData.alamat) {
//             alert('All fields are required!');
//             return;
//         }
//         handleAddTask(taskData);
//         setTaskData(initialTaskData); // Reset after submit
//         setOpen(false); // Close modal
//     };

//     return (
//         <div
//             className={`${
//                 isOpen ? 'block' : 'hidden'
//             } fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)]`}
//         >
//             <div className="flex justify-center items-center w-full h-full">
//                 <div className="bg-white p-6 rounded-md w-[400px]">
//                     <h2 className="text-xl font-semibold">Add Task</h2>
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium">Name</label>
//                         <input
//                             type="text"
//                             name="nama"
//                             value={taskData.nama}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md mt-1"
//                         />
//                     </div>
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium">Company</label>
//                         <input
//                             type="text"
//                             name="perusahaan"
//                             value={taskData.perusahaan}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md mt-1"
//                         />
//                     </div>
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={taskData.email}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md mt-1"
//                         />
//                     </div>
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium">Phone</label>
//                         <input
//                             type="text"
//                             name="no_telp"
//                             value={taskData.no_telp}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md mt-1"
//                         />
//                     </div>
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium">Address</label>
//                         <input
//                             type="text"
//                             name="alamat"
//                             value={taskData.alamat}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-gray-300 rounded-md mt-1"
//                         />
//                     </div>
//                     <div className="mt-4">
//                         <label className="block text-sm font-medium">Tags</label>
//                         <div className="flex items-center gap-2">
//                             <input
//                                 type="text"
//                                 value={tagTitle}
//                                 onChange={(e) => setTagTitle(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded-md mt-1"
//                             />
//                             <button
//                                 onClick={handleAddTag}
//                                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                             >
//                                 Add Tag
//                             </button>
//                         </div>
//                         <div className="flex flex-wrap mt-2 gap-2">
//                             {taskData.tags.map((tag, index) => (
//                                 <span
//                                     key={index}
//                                     className={`inline-flex items-center px-2 py-1 rounded-lg text-sm ${tag.bg}`}
//                                 >
//                                     <span className={`text-sm ${tag.text}`}>{tag.title}</span>
//                                     <button
//                                         onClick={() => handleRemoveTag(index)}
//                                         className="ml-2 text-gray-500"
//                                     >
//                                         x
//                                     </button>
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="mt-6 flex justify-between">
//                         <button
//                             onClick={onClose}
//                             className="bg-gray-300 text-black px-4 py-2 rounded-md"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             onClick={handleSubmit}
//                             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                         >
//                             Add Task
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddModal;

// 3

// import React, { useState } from 'react';
// import { getRandomColors } from '../../helpers/getRandomColors';
// import { v4 as uuidv4 } from 'uuid';

// const AddModal = ({ isOpen, onClose, handleAddTask }) => {
//     const initialTaskData = {
//         id_contact: uuidv4(),
//         nama: '',
//         perusahaan: '',
//         email: '',
//         no_telp: '',
//         alamat: '',
//         sektor: '', // Mengganti tag menjadi sektor
//     };

//     const [taskData, setTaskData] = useState(initialTaskData);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTaskData({ ...taskData, [name]: value });
//     };

//     const handleSubmit = () => {
//         const { nama, perusahaan, email, no_telp, alamat, sektor } = taskData;

//         if (!nama || !perusahaan || !email || !no_telp || !alamat || !sektor) {
//             alert('All fields are required!');
//             return;
//         }

//         handleAddTask(taskData);
//         setTaskData(initialTaskData); // Reset form setelah submit
//         onClose(); // Menutup modal
//     };

//     return (
//         <div
//             className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? 'grid' : 'hidden'}`}
//         >
//             <div
//                 className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
//                 onClick={onClose}
//             ></div>
//             <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
//                 <input
//                     type="text"
//                     name="nama"
//                     value={taskData.nama}
//                     onChange={handleChange}
//                     placeholder="Nama Pelanggan"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     type="text"
//                     name="perusahaan"
//                     value={taskData.perusahaan}
//                     onChange={handleChange}
//                     placeholder="Nama Perusahaan"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     name="email"
//                     value={taskData.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     name="no_telp"
//                     value={taskData.no_telp}
//                     onChange={handleChange}
//                     placeholder="Masukkan Nomor Telepon"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 />
//                 <input
//                     name="alamat"
//                     value={taskData.alamat}
//                     onChange={handleChange}
//                     placeholder="Alamat"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 />
//                 <select
//                     name="sektor"
//                     value={taskData.sektor}
//                     onChange={handleChange}
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 >
//                     <option value="">Pilih Sektor</option>
//                     <option value="Perbankan">Perbankan</option>
//                     <option value="Manufaktur">Manufaktur</option>
//                     <option value="Industri">Industri</option>
//                     <option value="Pemerintahan">Pemerintahan</option>
//                     <option value="BUMN">BUMN</option>
//                     <option value="Entertaiment">Entertaiment</option>
//                 </select>
//                 <div className="flex w-full justify-between mt-3">
//                     <button
//                         className="w-[48%] rounded-md h-9 bg-red-500 text-white font-medium"
//                         onClick={onClose} // Memastikan tombol Cancel menutup modal
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className="w-[48%] rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
//                         onClick={handleSubmit}
//                     >
//                         Submit Task
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddModal;


// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';

// const AddModal = ({ isOpen, onClose, handleAddTask }) => {
//     const initialTaskData = {
//         id_contact: uuidv4(),
//         nama: '',
//         perusahaan: '',
//         email: '',
//         no_telp: '',
//         alamat: '',
//         sektor: '',
//     };

//     const [taskData, setTaskData] = useState(initialTaskData);
//     const [sektorOptions, setSektorOptions] = useState([]);

//     // Fetch sektor data from the server
//     useEffect(() => {
//         const fetchSektor = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/user/sektor');
//                 setSektorOptions(response.data.sektor);
//             } catch (error) {
//                 console.error('Error fetching sektor data:', error);
//             }
//         };

//         if (isOpen) fetchSektor();
//     }, [isOpen]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTaskData({ ...taskData, [name]: value });
//     };

//     const handleSubmit = async () => {
//         const { nama, perusahaan, email, no_telp, alamat, sektor } = taskData;

//         if (!nama || !perusahaan || !email || !no_telp || !alamat || !sektor) {
//             alert('All fields are required!');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:3000/user/contact', {
//                 nama,
//                 perusahaan,
//                 email,
//                 no_telp,
//                 alamat,
//                 id_sektor: sektor,
//             });
//             handleAddTask(response.data);
//             setTaskData(initialTaskData);
//             onClose();
//         } catch (error) {
//             console.error('Error adding contact:', error);
//         }
//     };

//     return (
//         <div className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? 'grid' : 'hidden'}`}>
//             <div
//                 className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
//                 onClick={onClose}
//             ></div>
//             <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
//                 <input
//                     type="text"
//                     name="nama"
//                     value={taskData.nama}
//                     onChange={handleChange}
//                     placeholder="Nama Pelanggan"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     type="text"
//                     name="perusahaan"
//                     value={taskData.perusahaan}
//                     onChange={handleChange}
//                     placeholder="Nama Perusahaan"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     value={taskData.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     type="text"
//                     name="no_telp"
//                     value={taskData.no_telp}
//                     onChange={handleChange}
//                     placeholder="Masukkan Nomor Telepon"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 />
//                 <input
//                     type="text"
//                     name="alamat"
//                     value={taskData.alamat}
//                     onChange={handleChange}
//                     placeholder="Alamat"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 />
//                 <select
//                     name="sektor"
//                     value={taskData.sektor}
//                     onChange={handleChange}
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 >
//                     <option value="">Pilih Sektor</option>
//                     {sektorOptions.map((sektor) => (
//                         <option key={sektor.id_sektor} value={sektor.id_sektor}>
//                             {sektor.nama_sektor}
//                         </option>
//                     ))}
//                 </select>
//                 <div className="flex w-full justify-between mt-3">
//                     <button
//                         className="w-[48%] rounded-md h-9 bg-red-500 text-white font-medium"
//                         onClick={onClose}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className="w-[48%] rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
//                         onClick={handleSubmit}
//                     >
//                         Submit Task
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddModal;


// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';

// const AddModal = ({ isOpen, onClose, handleAddTask }) => {
//     const initialTaskData = {
//         id_contact: uuidv4(),
//         nama: '',
//         perusahaan: '',
//         email: '',
//         no_telp: '',
//         alamat: '',
//         sektor: '',
//     };

//     const [taskData, setTaskData] = useState(initialTaskData);
//     const [sektorOptions, setSektorOptions] = useState([]);

//     useEffect(() => {
//         const fetchSektor = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/user/sektor');
//                 setSektorOptions(response.data.sektor);
//             } catch (error) {
//                 console.error('Error fetching sektor data:', error);
//             }
//         };

//         if (isOpen) fetchSektor();
//     }, [isOpen]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTaskData({ ...taskData, [name]: value });
//     };

//     const handleSubmit = async () => {
//         const { nama, perusahaan, email, no_telp, alamat, sektor } = taskData;

//         if (!nama || !perusahaan || !email || !no_telp || !alamat || !sektor) {
//             alert('All fields are required!');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:3000/user/add/contact', {
//                 nama,
//                 perusahaan,
//                 email,
//                 no_telp,
//                 alamat,
//                 id_sektor: sektor,
//             });
//             handleAddTask(response.data);
//             setTaskData(initialTaskData);
//             onClose();
//         } catch (error) {
//             console.error('Error adding contact:', error);
//         }
//     };

//     return (
//         <div className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? 'grid' : 'hidden'}`}>
//             <div
//                 className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
//                 onClick={onClose}
//             ></div>
//             <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
//                 <input
//                     type="text"
//                     name="nama"
//                     value={taskData.nama}
//                     onChange={handleChange}
//                     placeholder="Nama Pelanggan"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     type="text"
//                     name="perusahaan"
//                     value={taskData.perusahaan}
//                     onChange={handleChange}
//                     placeholder="Nama Perusahaan"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     value={taskData.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                 />
//                 <input
//                     type="text"
//                     name="no_telp"
//                     value={taskData.no_telp}
//                     onChange={handleChange}
//                     placeholder="Nomor Telepon"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 />
//                 <input
//                     type="text"
//                     name="alamat"
//                     value={taskData.alamat}
//                     onChange={handleChange}
//                     placeholder="Alamat"
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 />
//                 <select
//                     name="sektor"
//                     value={taskData.sektor}
//                     onChange={handleChange}
//                     className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                 >
//                     <option value="">Pilih Sektor</option>
//                     {sektorOptions.map((sektor) => (
//                         <option key={sektor.id_sektor} value={sektor.id_sektor}>
//                             {sektor.nama_sektor}
//                         </option>
//                     ))}
//                 </select>
//                 <div className="flex w-full justify-between mt-3">
//                     <button
//                         className="w-[48%] rounded-md h-9 bg-red-500 text-white font-medium"
//                         onClick={onClose}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className="w-[48%] rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
//                         onClick={handleSubmit}
//                     >
//                         Submit
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddModal;


// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';

// const AddModal = ({ isOpen, onClose, handleAddTask }) => {
//     const initialTaskData = {
//         id_contact: uuidv4(),
//         nama: '',
//         perusahaan: '',
//         email: '',
//         no_telp: '',
//         alamat: '',
//         sektor: '',
//     };

//     const [taskData, setTaskData] = useState(initialTaskData);
//     const [sektorOptions, setSektorOptions] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     useEffect(() => {
//         const fetchSektor = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/user/sektor');
//                 setSektorOptions(response.data.sektor);
//             } catch (error) {
//                 console.error('Error fetching sektor data:', error);
//             }
//         };

//         if (isOpen) fetchSektor();
//     }, [isOpen]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTaskData({ ...taskData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (isSubmitting) return;
//         setIsSubmitting(true);

//         const { nama, perusahaan, email, no_telp, alamat, sektor } = taskData;

//         if (!nama || !perusahaan || !email || !no_telp || !alamat || !sektor) {
//             alert('All fields are required!');
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:3000/user/add/contact', {
//                 nama,
//                 perusahaan,
//                 email,
//                 no_telp,
//                 alamat,
//                 id_sektor: sektor,
//             });
//             handleAddTask(response.data);
//             setTaskData(initialTaskData);
//             onClose();
//         } catch (error) {
//             console.error('Error adding contact:', error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? 'grid' : 'hidden'}`}>
//             <div
//                 className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
//                 onClick={onClose}
//             ></div>
//             <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
//                 <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
//                     <input
//                         type="text"
//                         name="nama"
//                         value={taskData.nama}
//                         onChange={handleChange}
//                         placeholder="Nama Pelanggan"
//                         className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                     />
//                     <input
//                         type="text"
//                         name="perusahaan"
//                         value={taskData.perusahaan}
//                         onChange={handleChange}
//                         placeholder="Nama Perusahaan"
//                         className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                     />
//                     <input
//                         type="email"
//                         name="email"
//                         value={taskData.email}
//                         onChange={handleChange}
//                         placeholder="Email"
//                         className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//                     />
//                     <input
//                         type="text"
//                         name="no_telp"
//                         value={taskData.no_telp}
//                         onChange={handleChange}
//                         placeholder="Nomor Telepon"
//                         className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                     />
//                     <input
//                         type="text"
//                         name="alamat"
//                         value={taskData.alamat}
//                         onChange={handleChange}
//                         placeholder="Alamat"
//                         className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                     />
//                     <select
//                         name="sektor"
//                         value={taskData.sektor}
//                         onChange={handleChange}
//                         className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//                     >
//                         <option value="">Pilih Sektor</option>
//                         {sektorOptions.map((sektor) => (
//                             <option key={sektor.id_sektor} value={sektor.id_sektor}>
//                                 {sektor.nama_sektor}
//                             </option>
//                         ))}
//                     </select>
//                     <div className="flex w-full justify-between mt-3">
//                         <button
//                             type="button"
//                             className="w-[48%] rounded-md h-9 bg-red-500 text-white font-medium"
//                             onClick={onClose}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="w-[48%] rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
//                             disabled={isSubmitting}
//                         >
//                             {isSubmitting ? 'Submitting...' : 'Submit'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddModal;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Sektor {
//   id_sektor: number;
//   nama_sektor: string;
// }

// interface AddModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   handleAddTask: (newTask: Task) => void;
// }

// interface Task {
//   nama: string;
//   perusahaan: string;
//   email: string;
//   no_telp: string;
//   alamat: string;
//   produk: string;
//   jumlah: number;
//   harga: number;
//   catatan: string;
//   sektor: string;
// }

// const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, handleAddTask }) => {
//   const [newTask, setNewTask] = useState<Task>({
//     nama: '',
//     perusahaan: '',
//     email: '',
//     no_telp: '',
//     alamat: '',
//     produk: '',
//     jumlah: 0,
//     harga: 0,
//     catatan: '',
//     sektor: '',
//   });

//   const [sektors, setSektors] = useState<Sektor[]>([]);

//   useEffect(() => {
//     const fetchSektors = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/user/sektor');
//         setSektors(response.data.sektor);
//       } catch (error) {
//         console.error('Error fetching sektor data:', error);
//       }
//     };

//     fetchSektors();
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewTask((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     handleAddTask(newTask);
//   };

//   return (
//     isOpen && (
//       <div className="modal-overlay">
//         <div className="modal-container">
//           <div className="modal-header">
//             <h2>Add New Task</h2>
//             <button className="close-btn" onClick={onClose} aria-label="Close modal">
//               X
//             </button>
//           </div>
//           <form className="modal-form" onSubmit={handleSubmit}>
//             <label>
//               Nama:
//               <input
//                 type="text"
//                 name="nama"
//                 value={newTask.nama}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Perusahaan:
//               <input
//                 type="text"
//                 name="perusahaan"
//                 value={newTask.perusahaan}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 name="email"
//                 value={newTask.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               No Telp:
//               <input
//                 type="text"
//                 name="no_telp"
//                 value={newTask.no_telp}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Alamat:
//               <input
//                 type="text"
//                 name="alamat"
//                 value={newTask.alamat}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Produk:
//               <input
//                 type="text"
//                 name="produk"
//                 value={newTask.produk}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Jumlah:
//               <input
//                 type="number"
//                 name="jumlah"
//                 value={newTask.jumlah}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Harga:
//               <input
//                 type="number"
//                 name="harga"
//                 value={newTask.harga}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Catatan:
//               <input
//                 type="text"
//                 name="catatan"
//                 value={newTask.catatan}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Sektor:
//               <select
//                 name="sektor"
//                 value={newTask.sektor}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select a sector</option>
//                 {sektors.map((sektor) => (
//                   <option key={sektor.id_sektor} value={sektor.id_sektor}>
//                     {sektor.nama_sektor}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <div className="modal-footer">
//               <button type="submit">Add Task</button>
//               <button type="button" className="cancel-btn" onClick={onClose}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   );
// };

// export default AddModal;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Sektor {
//   id_sektor: number;
//   nama_sektor: string;
// }

// interface AddModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   handleAddTask: (newTask: Task) => void;
// }

// interface Task {
//   nama: string;
//   perusahaan: string;
//   email: string;
//   no_telp: string;
//   alamat: string;
//   produk: string;
//   jumlah: number;
//   harga: number;
//   catatan: string;
//   sektor: {
//     id_sektor: number;
//     title: string;
//     bg: string;
//     text: string;
//   };
// }

// const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, handleAddTask }) => {
//   const [newTask, setNewTask] = useState<Task>({
//     nama: '',
//     perusahaan: '',
//     email: '',
//     no_telp: '',
//     alamat: '',
//     produk: '',
//     jumlah: 0,
//     harga: 0,
//     catatan: '',
//     sektor: { id_sektor: 1, title: '', bg: '', text: '' }
//   });

//   const [sektors, setSektors] = useState<Sektor[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false); // For submit button state

//   useEffect(() => {
//     const fetchSektors = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/user/sektor');
//         setSektors(response.data.sektor);
//       } catch (error) {
//         console.error('Error fetching sektor data:', error);
//       }
//     };

//     fetchSektors();
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewTask((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true); // Start submitting
//     try {
//       await handleAddTask(newTask); // Call the parent function to add the task
//       onClose(); // Close modal after submission
//     } catch (error) {
//       console.error('Error adding task:', error);
//     } finally {
//       setIsSubmitting(false); // End submitting
//     }
//   };

//   return (
//     <div
//       className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? 'grid' : 'hidden'}`}
//     >
//       <div
//         className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
//         onClick={onClose}
//       ></div>
//       <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
//         <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
//           <input
//             type="text"
//             name="nama"
//             value={newTask.nama}
//             onChange={handleInputChange}
//             placeholder="Nama Pelanggan"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//           />
//           <input
//             type="text"
//             name="perusahaan"
//             value={newTask.perusahaan}
//             onChange={handleInputChange}
//             placeholder="Nama Perusahaan"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//           />
//           <input
//             type="email"
//             name="email"
//             value={newTask.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//           />
//           <input
//             type="text"
//             name="no_telp"
//             value={newTask.no_telp}
//             onChange={handleInputChange}
//             placeholder="Nomor Telepon"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="text"
//             name="alamat"
//             value={newTask.alamat}
//             onChange={handleInputChange}
//             placeholder="Alamat"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="text"
//             name="produk"
//             value={newTask.produk}
//             onChange={handleInputChange}
//             placeholder="Produk"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="number"
//             name="jumlah"
//             value={newTask.jumlah}
//             onChange={handleInputChange}
//             placeholder="Jumlah"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="number"
//             name="harga"
//             value={newTask.harga}
//             onChange={handleInputChange}
//             placeholder="Harga"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="text"
//             name="catatan"
//             value={newTask.catatan}
//             onChange={handleInputChange}
//             placeholder="Catatan"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <select
//             name="sektor"
//             value={newTask.sektor}
//             onChange={handleInputChange}
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           >
//             <option value="">Pilih Sektor</option>
//             {sektors.map((sektor) => (
//               <option key={sektor.id_sektor} value={sektor.id_sektor}>
//                 {sektor.nama_sektor}
//               </option>
//             ))}
//           </select>
//           <div className="flex w-full justify-between mt-3">
//             <button
//               type="button"
//               className="w-[48%] rounded-md h-9 bg-red-500 text-white font-medium"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="w-[48%] rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddModal;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface AddModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   handleAddTask: (task: Task) => Promise<void>;
// }

// interface Task {
//   nama: string;
//   perusahaan: string;
//   email: string;
//   no_telp: string;
//   alamat: string;
//   produk: string;
//   jumlah: number;
//   harga: number;
//   catatan: string;
//   sektor: Sektor;
// }

// interface Sektor {
//   id_sektor: number;
//   nama_sektor: string;
//   bg_color: string;
//   text_color: string;
// }

// const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, handleAddTask }) => {
//   const [newTask, setNewTask] = useState<Task>({
//     nama: '',
//     perusahaan: '',
//     email: '',
//     no_telp: '',
//     alamat: '',
//     produk: '-',
//     jumlah: 0,
//     harga: 0,
//     catatan: '',
//     sektor: { id_sektor: 1, nama_sektor: '', bg_color: '', text_color: '' },
//   });

//   const [sektors, setSektors] = useState<Sektor[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchSektors = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/user/sektor');
//         setSektors(response.data.sektor);
//       } catch (error) {
//         console.error('Error fetching sektor data:', error);
//       }
//     };

//     fetchSektors();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setNewTask((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedSectorId = e.target.value;
//     const selectedSector = sektors.find(sektor => sektor.id_sektor.toString() === selectedSectorId);
//     setNewTask((prevState) => ({
//       ...prevState,
//       sektor: selectedSector || { id_sektor: 1, nama_sektor: '', bg_color: '', text_color: '' },
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       // Ensure the new task includes the correct `id_sektor`
//       await handleAddTask({
//         ...newTask,
//       });
//       onClose(); // Close modal after submission
//     } catch (error) {
//       console.error('Error adding task:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? 'grid' : 'hidden'}`}>
//       <div className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20" onClick={onClose}></div>
//       <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
//         <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
//           {/* Input fields for Task */}
//           <input
//             type="text"
//             name="nama"
//             value={newTask.nama}
//             onChange={handleInputChange}
//             placeholder="Nama"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="text"
//             name="perusahaan"
//             value={newTask.perusahaan}
//             onChange={handleInputChange}
//             placeholder="Perusahaan"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="email"
//             name="email"
//             value={newTask.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="text"
//             name="no_telp"
//             value={newTask.no_telp}
//             onChange={handleInputChange}
//             placeholder="No Telp"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="text"
//             name="alamat"
//             value={newTask.alamat}
//             onChange={handleInputChange}
//             placeholder="Alamat"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="text"
//             name="produk"
//             value={newTask.produk}
//             onChange={handleInputChange}
//             placeholder="Produk"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="number"
//             name="jumlah"
//             value={newTask.jumlah}
//             onChange={handleInputChange}
//             placeholder="Jumlah"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />
//           <input
//             type="number"
//             name="harga"
//             value={newTask.harga}
//             onChange={handleInputChange}
//             placeholder="Harga"
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           />

//           {/* Sectors Dropdown */}
//           <select
//             name="sektor"
//             value={newTask.sektor.id_sektor}
//             onChange={handleSectorChange}
//             className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//           >
//             <option value="">Pilih Sektor</option>
//             {sektors.map((sektor) => (
//               <option key={sektor.id_sektor} value={sektor.id_sektor}>
//                 {sektor.nama_sektor}
//               </option>
//             ))}
//           </select>

//           {/* Submit buttons */}
//           <div className="flex w-full justify-between mt-3">
//             <button
//               type="button"
//               className="w-[48%] rounded-md h-9 bg-red-500 text-white font-medium"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="w-[48%] rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddModal;


// import React, { useState } from "react";

// const AddModal = ({ isOpen, onClose, handleAddTask, sektorOptions }: any) => {
//   const [taskData, setTaskData] = useState({
//     nama: "",
//     perusahaan: "",
//     email: "",
//     no_telp: "",
//     alamat: "",
//     produk: '-',
//     jumlah: 0,
//     harga: 0,
//     catatan: '-',
//     columnId: "", // ID kolom tujuan
//     sektorId: "", // ID sektor
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setTaskData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (taskData.nama && taskData.sektorId) {
//       handleAddTask(taskData);
//     } else {
//       alert("Nama, Kolom, dan Sektor wajib diisi!");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
//         <h2 className="text-lg font-bold mb-4">Tambah Lead baru</h2>

//         <div className="flex flex-col gap-3">
//           <input
//             type="text"
//             name="nama"
//             value={taskData.nama}
//             onChange={handleChange}
//             placeholder="Nama Kontak"
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="perusahaan"
//             value={taskData.perusahaan}
//             onChange={handleChange}
//             placeholder="Perusahaan"
//             className="p-2 border rounded"
//           />
//           <input
//             type="email"
//             name="email"
//             value={taskData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="no_telp"
//             value={taskData.no_telp}
//             onChange={handleChange}
//             placeholder="No Telepon"
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="alamat"
//             value={taskData.alamat}
//             onChange={handleChange}
//             placeholder="Alamat"
//             className="p-2 border rounded"
//           />
//           {/* <input
//             type="text"
//             name="produk"
//             value={taskData.produk}
//             onChange={handleChange}
//             placeholder="Produk"
//             className="p-2 border rounded"
//           /> */}
//           {/* <input
//             type="number"
//             name="jumlah"
//             value={taskData.jumlah}
//             onChange={handleChange}
//             placeholder="Jumlah"
//             className="p-2 border rounded"
//           /> */}
//           {/* <input
//             type="number"
//             name="harga"
//             value={taskData.harga}
//             onChange={handleChange}
//             placeholder="Harga"
//             className="p-2 border rounded"
//           /> */}
//           {/* <textarea
//             name="catatan"
//             value={taskData.catatan}
//             onChange={handleChange}
//             placeholder="Catatan"
//             className="p-2 border rounded"
//           ></textarea> */}

//           {/* Dropdown untuk Kolom */}
//           {/* <select
//             name="columnId"
//             value={taskData.columnId}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           >
//             <option value="">Pilih Kolom</option>
//             {Object.entries(sektorOptions).map(([id, column]: [string, any]) => (
//               <option key={id} value={id}>
//                 {column.nama}
//               </option>
//             ))}
//           </select> */}

//           {/* Dropdown untuk Sektor */}
//           <select
//             name="sektorId"
//             value={taskData.sektorId}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           >
//             <option value="">Pilih Sektor</option>
//             {sektorOptions.map((sektor) => (
//               <option key={sektor.id_sektor} value={sektor.id_sektor}>
//                 {sektor.nama_sektor}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex justify-end gap-2 mt-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Batal
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Tambah
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddModal;


// import React, { useState } from "react";

// const AddModal = ({ isOpen, onClose, handleAddTask, sektorOptions }: any) => {
//   const [taskData, setTaskData] = useState({
//     nama: "",
//     perusahaan: "",
//     email: "",
//     no_telp: "",
//     alamat: "",
//     produk: '-',
//     jumlah: 0,
//     harga: 0,
//     catatan: '-',
//     columnId: "", // ID kolom tujuan
//     sektorId: "", // ID sektor
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setTaskData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (taskData.nama && taskData.sektorId) {
//       handleAddTask(taskData);
//     } else {
//       alert("Nama, Kolom, dan Sektor wajib diisi!");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? "grid" : "hidden"}`}>
//       <div className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20" onClick={onClose}></div>
//       <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
//         <input
//           type="text"
//           name="nama"
//           value={taskData.nama}
//           onChange={handleChange}
//           placeholder="Nama Kontak"
//           className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//         />
//         <input
//           type="text"
//           name="perusahaan"
//           value={taskData.perusahaan}
//           onChange={handleChange}
//           placeholder="Perusahaan"
//           className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//         />
//         <input
//           type="email"
//           name="email"
//           value={taskData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//         />
//         <input
//           type="text"
//           name="no_telp"
//           value={taskData.no_telp}
//           onChange={handleChange}
//           placeholder="No Telepon"
//           className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//         />
//         <input
//           type="text"
//           name="alamat"
//           value={taskData.alamat}
//           onChange={handleChange}
//           placeholder="Alamat"
//           className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//         />

//         {/* Dropdown for Sektor */}
//         <select
//           name="sektorId"
//           value={taskData.sektorId}
//           onChange={handleChange}
//           className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//         >
//           <option value="">Pilih Sektor</option>
//           {sektorOptions.map((sektor: any) => (
//             <option key={sektor.id_sektor} value={sektor.id_sektor}>
//               {sektor.nama_sektor}
//             </option>
//           ))}
//         </select>

//         {/* Action Buttons */}
//         <div className="flex w-full justify-between mt-3">
//           <button
//             onClick={onClose}
//             className="w-[48%] rounded-md h-9 bg-red-500 text-white font-medium"
//           >
//             Batal
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="w-[48%] rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
//           >
//             Tambah
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddModal;

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
