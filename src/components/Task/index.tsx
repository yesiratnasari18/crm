import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrashOutline } from "react-ionicons";
import EditModal from "../Modals/EditModal";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TaskType, Transaksi } from "../../types";
import ModalDynamic from "../Modals/modal-component";
import FormLeads from "../../pages/boards/form-leads";

interface TaskT {
  id_contact: string;
  id_list: string;
  nama: string;
  perusahaan: string | null;
  email: string | null;
  no_telp: string | null;
  alamat: string | null;
  produk: string | null;
  jumlah: number | null;
  harga: string | null;
  catatan: string | null;
  sektor: {
    title: string;
    bg: string;
    text: string;
  };
}

interface TaskProps {
  task: TaskType;
  provided: any;
  onUpdateTask: (updatedTask: TaskT) => void;
  onDeleteTask: (id: string) => void;
  hotreload: () => void;
  promises: () => void;
}

const Task = ({ task, provided, onUpdateTask, onDeleteTask, hotreload, promises }: TaskProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transaksi, setTransaksi] = useState<Transaksi>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  
  const setOpen = (params: boolean) => setIsModalOpen(params);
  const fetchRowTransaksi = () => {
    setTransaksi({
      id_transaksi: task.id_transaksi,
      id_contact: task.id_contact,
      catatan: task.catatan,
      jumlah: task.jumlah,
      id_produk: task.id_produk,
      total_harga: task.total_harga,
      id_list: 0
    });
  }

  // Function to check if the contact data is complete
  const isDataComplete = () => {
    return (
      task.nama &&
      task.perusahaan &&
      task.email &&
      task.no_telp &&
      task.alamat &&
      task.produk !== null &&
      task.jumlah !== null &&
      task.harga !== null
    );
  };

  // Calculate completeness percentage (out of 7 fields)
  const getCompletenessPercentage = () => {
    let completedFields = 0;
    let incompleteFields = 0;

    if (task.nama) completedFields++;
    else incompleteFields++;
    if (task.perusahaan) completedFields++;
    else incompleteFields++;
    if (task.email) completedFields++;
    else incompleteFields++;
    if (task.no_telp) completedFields++;
    else incompleteFields++;
    if (task.alamat) completedFields++;
    else incompleteFields++;
    if (task.produk !== null) completedFields++;
    else incompleteFields++;
    if (task.jumlah !== null) completedFields++;
    else incompleteFields++;
    if (task.harga !== null) completedFields++;
    else incompleteFields++;

    const completenessPercentage = (completedFields / 7) * 100;

    // If only one field is missing, set it to yellow
    if (incompleteFields === 1) {
      return { percentage: completenessPercentage, color: 'yellow' };
    }

    // If all fields are complete, set to green, else red
    return {
      percentage: completenessPercentage,
      color: incompleteFields === 0 ? 'green' : 'red',
    };
  };

  const handleDeleteTask = async () => {
    try {
      if (window.confirm(`Apakah anda ingin menghapus leads ${task.nama}?`)) {
        const response: any = await axios.delete(`http://localhost:3000/user/delete/contact/${task.id_contact}`);
        if (response.status == 200) {
          toast.success(response.data.message, {
            style: {
              backgroundColor: '#32a852',
              color: '#fff',
            }
          })
          hotreload();
        }
        if (response.status != 200) throw "Error on server";
        console.log(response);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error(error as string, {
        style: {
          backgroundColor: '#f44336',  // Red background for error
          color: '#fff',  // White text color
        },
      });
    }
    // if (window.confirm(`Apakah anda ingin menghapus leads "${task.nama}"?`)) {
    //   try {
    //     console.log(`Deleting contact with ID: ${task.id_contact}`);  // Debugging line
    //     await axios.delete(`http://localhost:3000/user/delete/contact/${task.id_contact}`);
    //     onDeleteTask(task.id_contact);  // Update parent state to remove the contact
    //     toast.success("Contact deleted successfully!", {
    //       style: {
    //         backgroundColor: '#32a852',  // Green background for success
    //         color: '#fff',  // White text color
    //       },
    //     });
    //   } catch (err) {
    //     console.error('Error deleting task:', err);
    //     toast.error('Error deleting contact. Please try again.', {
    //       style: {
    //         backgroundColor: '#f44336',  // Red background for error
    //         color: '#fff',  // White text color
    //       },
    //     });
    //   }
    // }
  };

  const handleUpdateTask = async (updatedTask: TaskT) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/user/update/contact/${task.id_contact}`,
        updatedTask
      );
      if (response.data.status === "ok") {
        onUpdateTask(updatedTask);  // Update the parent state with the new task data
        alert("Task updated successfully!");
      } else {
        alert("Failed to update task");
      }
    } catch (err) {
      console.error('Error updating task:', err);
      alert("Error updating task");
    }
  };

  const { percentage, color } = getCompletenessPercentage();

  useEffect(() => {
    fetchRowTransaksi();
  }, []);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-white flex flex-col justify-between gap-2 items-start shadow-sm rounded-xl px-3 py-4"
    >
      {/* Header with sector */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {task.sektor ? (
            <span
              className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
              style={{ backgroundColor: task.sektor.bg, color: task.sektor.text }}
            >
              {task.sektor.title}
            </span>
          ) : (
            <span className="text-gray-400 text-[13px]">No Sector</span>
          )}
        </div>
        <i
          className="fas fa-edit text-blue-600 cursor-pointer text-[15px]"
          onClick={openEditModal}
        ></i>
      </div>

      {/* Task details */}
      <div className="w-full flex items-start flex-col gap-0">
        <span className="text-[15.5px] font-medium text-gray-700">{task.nama_produk} {task.jumlah}x</span>
        <span className="text-[13.5px] text-gray-500">{task.perusahaan}</span>
      </div>

      {/* Separator */}
      <div className="w-full border border-dashed"></div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between">
        <TrashOutline
          color="#666"
          width="22px"
          height="22px"
          className="cursor-pointer"
          onClick={handleDeleteTask}
        />
        {/* Completeness progress bar */}
        <div
          className="w-[60%] ml-2"
          style={{
            height: '6px',
            borderRadius: '9999px',
            backgroundColor: '#f0f0f0',
            overflow: 'hidden', // Prevent overflow
          }}
        >
          <div
            className="h-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: color, // Dynamically set color
            }}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <ModalDynamic open={isEditModalOpen} forms={<FormLeads defaultList={''} promises={promises} setOpen={setOpen} data={transaksi} editMode={true}/>} promises={promises} setOpen={setOpen} editMode={true} />
        // <EditModal
        //   isOpen={isEditModalOpen}
        //   onClose={closeEditModal}
        //   task={task}
        //   onSave={(updatedTask) => {
        //     handleUpdateTask(updatedTask); // Save and update
        //     closeEditModal(); // Close modal after saving
        //   }}
        // />
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        theme="colored"
      />
    </div>
  );
};

export default Task;

