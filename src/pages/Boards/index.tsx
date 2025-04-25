// Home.tsx
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import { onDragEnd } from "../../helpers/onDragEnd";
import { FiPlus } from "react-icons/fi";
import { format } from 'date-fns'; // Import date-fns for formatting

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

interface TaskType {
  id_contact: string;
  nama: string;
  perusahaan: string;
  email: string;
  no_telp: string;
  alamat: string;
  sektor: {
    title: string;
    bg: string;
    text: string;
  };
  produk: string;
  jumlah: number;
  harga: number;
  catatan: string;
  add_date: string;
}

interface ColumnType {
  name: string;
  items: TaskType[];
}

const Home: React.FC = () => {
  const [columns, setColumns] = useState<{ [key: string]: ColumnType }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sektorOptions, setSektorOptions] = useState<any[]>([]);

  // Fetch Columns
  const fetchColumns = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/columns");
      if (response.status == 200) {
        const formattedColumns = response.data.columns.reduce(
          (acc: { [key: string]: ColumnType }, column: any) => {
            acc[column.id] = {
              name: column.name,
              items: column.tasks,
            };
            return acc;
          },
          {}
        );
        setColumns(formattedColumns);
      }
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  };

  const fetchSektor = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/sektor");
      setSektorOptions(response.data.sektor || []);
    } catch (error) {
      console.error("Error fetching sektor:", error);
    }
  };
  // Fetch Sektor
  useEffect(() => {
    fetchSektor();
    fetchColumns();
  }, []);

  // Handle add task
  const handleAddTask = async (newTask: any) => {
    try {
      const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss'); // Format the date as 'YYYY-MM-DD HH:mm:ss'
      const taskWithFormattedDate = { ...newTask, add_date: formattedDate };
      const response = await axios.post("http://localhost:3000/user/task", taskWithFormattedDate);
      if (response.status == 200) {
        toast.success(`Successfully to insert data`, {
          style: {
            backgroundColor: '#32a852',
            color: '#fff',
          }
        })
        fetchColumns();
        // setIsModalOpen(false);
      }
      if (response.status != 200) throw "Failed to insert data into database!";
    } catch (error) {
      toast.error(error as string, {
        style: {
          backgroundColor: '#f44336',  // Red background for error
          color: '#fff',  // White text color
        },
      })
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
        <div className="w-full flex items-start justify-between gap-6 pr-10">
          {Object.entries(columns).map(([columnId, column]: [string, ColumnType]) => (
            <div className="w-full flex flex-col gap-4 pr-0" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided: any) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col md:w-[250px] w-[200px] gap-2 items-center py-3">
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    {column.items.map((task: any, index: number) => (
                      <Draggable key={task.id_contact.toString()} draggableId={task.id_contact.toString()} index={index}>
                        {(provided: any) => (
                          <Task provided={provided} task={task} hotreload={fetchColumns} />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <div onClick={openModal} className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer">
        <FiPlus color={"#fff"} /> Add Leads
      </div>

      <AddModal isOpen={isModalOpen} onClose={closeModal} handleAddTask={handleAddTask} sektorOptions={sektorOptions} />
    </>
  );
};

export default Home;

