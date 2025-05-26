import api from '../lib';
export const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    console.log(source);

    // if (source.droppableId !== destination.droppableId) {
    //   const sourceColumn = columns[source.droppableId];
    //   const destColumn = columns[destination.droppableId];
    //   const sourceItems = [...sourceColumn.items];
    //   const destItems = [...destColumn.items];
    //   const [removed] = sourceItems.splice(source.index, 1);
    //   destItems.splice(destination.index, 0, removed);
  
    //   // Update database with new list ID
    //   try {
    //     await api.post('http://localhost:3000/user/update-task-list', {
    //       taskId: removed.id_contact,
    //       newListId: destination.droppableId,
    //     });
    //   } catch (error) {
    //     console.error('Error updating task list:', error);
    //     return; // Exit to avoid updating state if DB fails
    //   }
  
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...sourceColumn,
    //       items: sourceItems,
    //     },
    //     [destination.droppableId]: {
    //       ...destColumn,
    //       items: destItems,
    //     },
    //   });
    // } else {
    //   const column = columns[source.droppableId];
    //   const copiedItems = [...column.items];
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...column,
    //       items: copiedItems,
    //     },
    //   });
    // }
  };
  