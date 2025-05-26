// Home.tsx
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FormLeads from "./form-leads";
import Task from "../../components/Task";
import { onDragEnd } from "../../helpers/onDragEnd";
import { FiPlus } from "react-icons/fi";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import api from "../../lib";
import ModalDynamic from "../../components/Modals/modal-component";
import { ColumnType } from "../../types";

const Home = () => {
  document.title = "Manage Leads";
  const [columns, setColumns] = useState<{ [key: string]: ColumnType }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defList, setDefList] = useState<string>('');

  // Fetch Columns
  const fetchColumns = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/list", {
        headers: {
          "authorization": token
        }
      });
      console.log(response);
      if (response.status === 200) {
        const formattedColumns = response.data.reduce(
          (acc: { [key: string]: ColumnType }, column: any) => {
            acc[column.id] = {
              name: column.name,
              items: column.tasks,
            };
            return acc;
          },
          {}
        );
        // console.log(formattedColumns);
        setColumns(formattedColumns);
      }
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  };

  // Fetch Sektor
  useEffect(() => {
    fetchColumns();
  }, []);

  const setOpen = (params: boolean) => setIsModalOpen(params);
  const openModal = () => setIsModalOpen(true);
  return (
    <>
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
        <div className="w-full flex items-start justify-between gap-1 pr-0">
          {/* {Object.entries(columns).map(([columnId, column]: [string, ColumnType]) => (
            <div className="w-full flex flex-col gap-1 pr-0" key={columnId}>
              <Droppable droppableId={columnId}>
                {(provided: any) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col md:w-[250px] w-[200px] gap-2 items-center py-3">
                    <div className="flex items-center justify-center py-2 w-full bg-white rounded-lg shadow-sm text-slate-700 font-bold text-nd">
                      {column.name}
                    </div>
                    {column.items.map((task: any, index: number) => (
                      <Draggable key={task.id_transaksi.toString()} draggableId={task.id_contact.toString()} index={index}>
                        {(provided: any) => (
                          <Task provided={provided} task={task} hotreload={fetchColumns} onDeleteTask={fetchColumns} onUpdateTask={fetchColumns} promises={fetchColumns} />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {+columnId <= 4 &&
                    <button onClick={() => Promise.all([
                      setDefList(`${columnId}`),
                      openModal()
                    ])} className="flex items-center w-full bg-blue-400 hover:bg-blue-500 rounded-lg shadow-sm justify-center py-2 text-white" role="button">
                        ADD {column.name}
                    </button>
                    }
                  </div>
                )}
              </Droppable>
            </div>
          ))} */}
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
                          <Task provided={provided} task={task} hotreload={fetchColumns} onDeleteTask={fetchColumns} onUpdateTask={fetchColumns} promises={fetchColumns} />
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
      <ModalDynamic open={isModalOpen} forms={<FormLeads defaultList={defList} promises={fetchColumns} setOpen={setOpen}/>} promises={fetchColumns} setOpen={setOpen} />
    </>
  );
};
export default Home;

