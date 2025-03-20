// import React, { useState } from "react";
// import { TaskT } from "../../types";

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   task: TaskT;
//   onSave: (updatedTask: TaskT) => void; // New prop for saving the updated task
// }

// const EditModal = ({ isOpen, onClose, task, onSave }: EditModalProps) => {
//   const [taskData, setTaskData] = useState(task);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setTaskData({ ...taskData, [name]: value });
//   };

//   const handleSubmit = () => {
//     // Validation logic remains unchanged
//     if (!taskData?.nama) {
//       alert("Nama Harus Diisi");
//       return;
//     }
//     if (!taskData?.perusahaan) {
//       alert("Perusahaan Harus Diisi");
//       return;
//     }
//     if (!taskData?.email) {
//       alert("Email Harus Diisi");
//       return;
//     }
//     if (!taskData?.no_telp) {
//       alert("Nomor Telepon Harus Diisi");
//       return;
//     }
//     if (!taskData?.alamat) {
//       alert("Alamat Harus Diisi");
//       return;
//     }

//     // Call the onSave callback with the updated task data
//     onSave(taskData);
//     onClose();
//   };

//   const handleCancel = () => {
//     setTaskData(task); // Reset to initial task values
//     onClose(); // Close the modal
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50 ${
//         isOpen ? "block" : "hidden"
//       }`}
//     >
//       <div className="bg-white w-[90%] md:w-[30vw] rounded-lg shadow-lg p-5">
//         <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
//         <div className="flex flex-col gap-3">
//           {/* Input fields */}
//           <input
//             type="text"
//             name="nama"
//             value={taskData.nama}
//             onChange={handleChange}
//             placeholder="Nama Pelanggan"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="perusahaan"
//             value={taskData.perusahaan}
//             onChange={handleChange}
//             placeholder="Nama Perusahaan"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="email"
//             name="email"
//             value={taskData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="no_telp"
//             value={taskData.no_telp}
//             onChange={handleChange}
//             placeholder="Nomor Telepon"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="alamat"
//             value={taskData.alamat}
//             onChange={handleChange}
//             placeholder="Alamat"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               className="px-4 py-2 rounded-md bg-gray-400 text-white font-medium"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-4 py-2 rounded-md bg-orange-400 text-white font-medium"
//               onClick={handleSubmit}
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   task: TaskT;
//   onSave: (updatedTask: TaskT) => void;
// }

// const EditModal = ({ isOpen, onClose, task, onSave }: EditModalProps) => {
//   const [taskData, setTaskData] = useState<TaskT>(task);

//   useEffect(() => {
//     // Reset the form data if the task prop changes (e.g., for a different task edit)
//     setTaskData(task);
//   }, [task]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setTaskData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     // Validate the fields
//     if (!taskData?.nama || !taskData?.perusahaan || !taskData?.email || !taskData?.no_telp || !taskData?.alamat) {
//       alert("All fields must be filled!");
//       return;
//     }

//     try {
//       const response = await axios.put("http://localhost:3000/user/update/contact", taskData);

//       if (response.data.status === "ok") {
//         onSave(taskData);  // Update the parent with the new task data
//         onClose(); // Close the modal
//       } else {
//         alert("Failed to update task");
//       }
//     } catch (error) {
//       console.error("Error updating task:", error);
//       alert("Error updating task");
//     }
//   };

//   const handleCancel = () => {
//     setTaskData(task); // Reset to initial task values
//     onClose(); // Close the modal
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"}`}
//     >
//       <div className="bg-white w-[90%] md:w-[30vw] rounded-lg shadow-lg p-5">
//         <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
//         <div className="flex flex-col gap-3">
//           {/* Input fields */}
//           <input
//             type="text"
//             name="nama"
//             value={taskData.nama}
//             onChange={handleChange}
//             placeholder="Nama Pelanggan"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="perusahaan"
//             value={taskData.perusahaan}
//             onChange={handleChange}
//             placeholder="Nama Perusahaan"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="email"
//             name="email"
//             value={taskData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="no_telp"
//             value={taskData.no_telp}
//             onChange={handleChange}
//             placeholder="Nomor Telepon"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="alamat"
//             value={taskData.alamat}
//             onChange={handleChange}
//             placeholder="Alamat"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               className="px-4 py-2 rounded-md bg-gray-400 text-white font-medium"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-4 py-2 rounded-md bg-orange-400 text-white font-medium"
//               onClick={handleSubmit}
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   task: TaskT;
//   onSave: (updatedTask: TaskT) => void;
// }

// const EditModal = ({ isOpen, onClose, task, onSave }: EditModalProps) => {
//   const [taskData, setTaskData] = useState<TaskT>(task);

//   useEffect(() => {
//     setTaskData(task); // Reset the form data if the task prop changes
//   }, [task]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLElement & HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;
//     setTaskData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     // Validate fields
//     if (!taskData?.nama || !taskData?.perusahaan || !taskData?.email || !taskData?.no_telp || !taskData?.alamat) {
//       alert("All fields must be filled!");
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:3000/user/update/contact/${taskData.id}`, taskData);

//       if (response.data.status === "ok") {
//         onSave(taskData);  // Update parent with new task data
//         onClose(); // Close the modal
//       } else {
//         alert("Failed to update task");
//       }
//     } catch (error) {
//       console.error("Error updating task:", error);
//       alert("Error updating task");
//     }
//   };

//   const handleCancel = () => {
//     setTaskData(task); // Reset to initial task values
//     onClose(); // Close the modal
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"}`}
//     >
//       <div className="bg-white w-[90%] md:w-[30vw] rounded-lg shadow-lg p-5">
//         <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
//         <div className="flex flex-col gap-3">
//           {/* Input fields */}
//           <input
//             type="text"
//             name="nama"
//             value={taskData.nama}
//             onChange={handleChange}
//             placeholder="Nama Pelanggan"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="perusahaan"
//             value={taskData.perusahaan}
//             onChange={handleChange}
//             placeholder="Nama Perusahaan"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="email"
//             name="email"
//             value={taskData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="no_telp"
//             value={taskData.no_telp}
//             onChange={handleChange}
//             placeholder="Nomor Telepon"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="alamat"
//             value={taskData.alamat}
//             onChange={handleChange}
//             placeholder="Alamat"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               className="px-4 py-2 rounded-md bg-gray-400 text-white font-medium"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-4 py-2 rounded-md bg-orange-400 text-white font-medium"
//               onClick={handleSubmit}
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;

// import React, { useState, useEffect } from "react";

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   task: TaskT;
//   onSave: (updatedTask: TaskT) => void;
// }

// const EditModal = ({ isOpen, onClose, task, onSave }: EditModalProps) => {
//   const [taskData, setTaskData] = useState(task);

//   useEffect(() => {
//     setTaskData(task);
//   }, [task]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setTaskData({ ...taskData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     const { nama, perusahaan, email, no_telp, alamat } = taskData;
//     if (!nama) {
//       alert("Nama Pelanggan is required.");
//       return;
//     }
//     if (!perusahaan) {
//       alert("Nama Perusahaan is required.");
//       return;
//     }
//     if (!email) {
//       alert("Email is required.");
//       return;
//     }
//     if (!no_telp) {
//       alert("Nomor Telepon is required.");
//       return;
//     }
//     if (!alamat) {
//       alert("Alamat is required.");
//       return;
//     }

//     try {
//       await onSave(taskData); // Save the updated task
//       onClose(); // Close the modal
//     } catch (error) {
//       alert("Error saving task. Please try again later.");
//       console.error(error); // Log the error for debugging
//     }
//   };

//   const handleCancel = () => {
//     setTaskData(task); // Reset to initial task values
//     onClose(); // Close the modal
//   };

//   return (
//     <div
//       className={`fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"}`}
//     >
//       <div className="bg-white w-[90%] md:w-[30vw] rounded-lg shadow-lg p-5">
//         <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
//         <div className="flex flex-col gap-3">
//           <input
//             type="text"
//             name="nama"
//             value={taskData.nama}
//             onChange={handleChange}
//             placeholder="Nama Pelanggan"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="perusahaan"
//             value={taskData.perusahaan}
//             onChange={handleChange}
//             placeholder="Nama Perusahaan"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="email"
//             name="email"
//             value={taskData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="no_telp"
//             value={taskData.no_telp}
//             onChange={handleChange}
//             placeholder="Nomor Telepon"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="alamat"
//             value={taskData.alamat}
//             onChange={handleChange}
//             placeholder="Alamat"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="produk"
//             value={taskData.produk}
//             onChange={handleChange}
//             placeholder="produk"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />

//           <input
//             type="text"
//             name="jumlah"
//             value={taskData.jumlah}
//             onChange={handleChange}
//             placeholder="jumlah"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <input
//             type="text"
//             name="harga"
//             value={taskData.harga}
//             onChange={handleChange}
//             placeholder="harga"
//             className="w-full px-3 py-2 rounded-md border border-gray-300"
//           />
//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               className="px-4 py-2 rounded-md bg-gray-400 text-white font-medium"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-4 py-2 rounded-md bg-orange-400 text-white font-medium"
//               onClick={handleSubmit}
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;

// end

// import React, { useState } from "react";

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   task: {
//     id_contact: string;
//     nama: string;
//     perusahaan: string;
//     email: string;
//     no_telp: string;
//     alamat: string;
//     produk: string | null;
//     jumlah: number | null;
//     harga: string | null;
//     catatan: string | null;
//     sektor: {
//       title: string;
//       bg: string;
//       text: string;
//     };
//   };
//   onSave: (updatedTask: any) => void;
// }

// const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, task, onSave }) => {
//   const [formData, setFormData] = useState({ ...task });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSave = () => {
//     onSave(formData);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
//         <div className="flex flex-col gap-4">
//           <input
//             type="text"
//             name="nama"
//             value={formData.nama}
//             onChange={handleChange}
//             placeholder="Name"
//             className="border border-gray-300 rounded-lg px-3 py-2"
//           />
//           <input
//             type="text"
//             name="perusahaan"
//             value={formData.perusahaan}
//             onChange={handleChange}
//             placeholder="Company"
//             className="border border-gray-300 rounded-lg px-3 py-2"
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border border-gray-300 rounded-lg px-3 py-2"
//           />
//           <input
//             type="text"
//             name="no_telp"
//             value={formData.no_telp}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             className="border border-gray-300 rounded-lg px-3 py-2"
//           />
//           <textarea
//             name="alamat"
//             value={formData.alamat}
//             onChange={handleChange}
//             placeholder="Address"
//             className="border border-gray-300 rounded-lg px-3 py-2"
//           />
//           <input
//             type="text"
//             name="produk"
//             value={formData.produk || ""}
//             onChange={handleChange}
//             placeholder="Product"
//             className="border border-gray-300 rounded-lg px-3 py-2"
//           />
//           <input
//             type="number"
//             name="jumlah"
//             value={formData.jumlah || ""}
//             onChange={handleChange}
//             placeholder="Quantity"
//             className="border border-gray-300 rounded-lg px-3 py-2"
//           />
//           <input
//             type="text"
//             name="harga"
//             value={formData.harga || ""}
//             onChange={handleChange}
//             placeholder="Price"
//             className="border border-gray-300 rounded-lg px-3 py-2"
//           />
//           <input
//             type="text"
//             name="catatan"
//             value={formData.catatan || ""}
//             onChange={handleChange}
//             placeholder="Catatan"
//             className="border border-gray-300 rounded-lg px-3 py-2"
//           />
//         </div>
//         <div className="flex justify-end gap-2 mt-4">
//           <button
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;


// import React, { useState } from "react";

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   task: {
//     id_contact: string;
//     nama: string;
//     perusahaan: string;
//     email: string;
//     no_telp: string;
//     alamat: string;
//     produk: string | null;
//     jumlah: number | null;
//     harga: string | null;
//     catatan: string | null;
//     sektor: {
//       title: string;
//       bg: string;
//       text: string;
//     };
//   };
//   onSave: (updatedTask: any) => void;
// }

// const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, task, onSave }) => {
//   const [formData, setFormData] = useState({ ...task });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSave = () => {
//     onSave(formData);
//   };

//   return (
//     <div
//       className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end transition-opacity duration-[2000ms] ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//       onClick={onClose}
//     >
//       <div
//         className={`bg-white rounded-l-lg p-6 w-[600px] max-w-[90%] h-full transform transition-all duration-[2000ms] ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2 className="text-lg font-semibold mb-4">Edit Lead</h2>
//         <div className="flex flex-col gap-4">
//           <input
//             type="text"
//             name="nama"
//             value={formData.nama}
//             onChange={handleChange}
//             placeholder="Name"
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//           />
//           <input
//             type="text"
//             name="perusahaan"
//             value={formData.perusahaan}
//             onChange={handleChange}
//             placeholder="Company"
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//           />
//           <input
//             type="text"
//             name="no_telp"
//             value={formData.no_telp}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//           />
//           <textarea
//             name="alamat"
//             value={formData.alamat}
//             onChange={handleChange}
//             placeholder="Address"
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//           />
//           <input
//             type="text"
//             name="produk"
//             value={formData.produk || ""}
//             onChange={handleChange}
//             placeholder="Product"
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//           />
//           <input
//             type="number"
//             name="jumlah"
//             value={formData.jumlah || ""}
//             onChange={handleChange}
//             placeholder="Quantity"
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//           />
//           <input
//             type="text"
//             name="harga"
//             value={formData.harga || ""}
//             onChange={handleChange}
//             placeholder="Price"
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//           />
//           <input
//             type="text"
//             name="catatan"
//             value={formData.catatan || ""}
//             onChange={handleChange}
//             placeholder="Notes"
//             className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//           />
//         </div>
//         <div className="flex justify-start gap-2 mt-6">
//           <button
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;


// import React, { useState } from "react";

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   task: {
//     id_contact: string;
//     nama: string;
//     perusahaan: string;
//     email: string;
//     no_telp: string;
//     alamat: string;
//     produk: string | null;
//     jumlah: number | null;
//     harga: string | null;
//     catatan: string | null;
//     sektor: {
//       title: string;
//       bg: string;
//       text: string;
//     };
//   };
//   onSave: (updatedTask: any) => void;
// }

// const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, task, onSave }) => {
//   const [formData, setFormData] = useState({ ...task });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSave = () => {
//     onSave(formData);
//   };

//   return (
//     <div className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? "grid" : "hidden"}`}>
//       <div className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20" onClick={onClose}></div>
//       <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center px-5 py-4">
//         <div className="w-full h-[70vh] overflow-auto flex flex-col gap-3">
//           <div className="w-full flex items-center gap-2">
//             <label htmlFor="nama" className="w-[30%] text-sm font-medium">Nama Kontak</label>
//             <input
//               type="text"
//               id="nama"
//               name="nama"
//               value={formData.nama}
//               onChange={handleChange}
//               placeholder="Nama Kontak"
//               className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//             />
//           </div>

//           <div className="w-full flex items-center gap-2">
//             <label htmlFor="perusahaan" className="w-[30%] text-sm font-medium">Perusahaan</label>
//             <input
//               type="text"
//               id="perusahaan"
//               name="perusahaan"
//               value={formData.perusahaan}
//               onChange={handleChange}
//               placeholder="Perusahaan"
//               className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//             />
//           </div>

//           <div className="w-full flex items-center gap-2">
//             <label htmlFor="email" className="w-[30%] text-sm font-medium">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
//             />
//           </div>

//           <div className="w-full flex items-center gap-2">
//             <label htmlFor="no_telp" className="w-[30%] text-sm font-medium">No Telepon</label>
//             <input
//               type="text"
//               id="no_telp"
//               name="no_telp"
//               value={formData.no_telp}
//               onChange={handleChange}
//               placeholder="No Telepon"
//               className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//             />
//           </div>

//           <div className="w-full flex items-center gap-2">
//             <label htmlFor="alamat" className="w-[30%] text-sm font-medium">Alamat</label>
//             <input
//               type="text"
//               id="alamat"
//               name="alamat"
//               value={formData.alamat}
//               onChange={handleChange}
//               placeholder="Alamat"
//               className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//             />
//           </div>

//           <div className="w-full flex items-center gap-2">
//             <label htmlFor="produk" className="w-[30%] text-sm font-medium">Produk</label>
//             <input
//               type="text"
//               id="produk"
//               name="produk"
//               value={formData.produk || ""}
//               onChange={handleChange}
//               placeholder="Produk"
//               className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//             />
//           </div>

//           <div className="w-full flex items-center gap-2">
//             <label htmlFor="jumlah" className="w-[30%] text-sm font-medium">Jumlah</label>
//             <input
//               type="number"
//               id="jumlah"
//               name="jumlah"
//               value={formData.jumlah || ""}
//               onChange={handleChange}
//               placeholder="Jumlah"
//               className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//             />
//           </div>

//           <div className="w-full flex items-center gap-2">
//             <label htmlFor="harga" className="w-[30%] text-sm font-medium">Harga</label>
//             <input
//               type="text"
//               id="harga"
//               name="harga"
//               value={formData.harga || ""}
//               onChange={handleChange}
//               placeholder="Harga"
//               className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//             />
//           </div>

//           <div className="w-full flex items-center gap-2">
//             <label htmlFor="catatan" className="w-[30%] text-sm font-medium">Catatan</label>
//             <textarea
//               id="catatan"
//               name="catatan"
//               value={formData.catatan || ""}
//               onChange={handleChange}
//               placeholder="Catatan"
//               className="w-[70%] h-16 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//             />
//           </div>

//           {/* Dropdown for Sektor */}
//           <div className="w-full flex items-center gap-2">
//             <label htmlFor="sektor" className="w-[30%] text-sm font-medium">Pilih Sektor</label>
//             <select
//               id="sektor"
//               name="sektor"
//               value={formData.sektor.title}
//               onChange={handleChange}
//               className="w-[70%] h-10 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
//             >
//               <option value="">Pilih Sektor</option>
//               <option value="sektor1">Sektor 1</option>
//               <option value="sektor2">Sektor 2</option>
//               <option value="sektor3">Sektor 3</option>
//             </select>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex w-full justify-between mt-3">
//           <button
//             onClick={onClose}
//             className="w-[48%] rounded-md h-9 bg-red-500 text-white font-medium"
//           >
//             Batal
//           </button>
//           <button
//             onClick={handleSave}
//             className="w-[48%] rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
//           >
//             Simpan
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;

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

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({ ...task });
  const [sektorOptions, setSektorOptions] = useState<{ id_sektor: string; nama_sektor: string }[]>([]);

  // Fetch sektor options from the API
  useEffect(() => {
    const fetchSektor = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/sektor");
        setSektorOptions(response.data.sektor || []);
      } catch (error) {
        console.error("Error fetching sektor:", error);
      }
    };
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
              value={formData.sektorId || ""}  // Ensure using id_sektor, not the sector title
              onChange={handleChange}
              className="w-[70%] h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
            >
              <option value="">Pilih Sektor</option>
              {sektorOptions.map((sektor) => (
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
