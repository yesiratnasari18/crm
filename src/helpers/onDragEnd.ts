// export const onDragEnd = (result, columns, setColumns) => {
// 	const { destination, source, draggableId } = result;
  
// 	// If the task is dropped outside a column
// 	if (!destination) return;
  
// 	// If the task is dropped into the same position
// 	if (
// 	  destination.droppableId === source.droppableId &&
// 	  destination.index === source.index
// 	)
// 	  return;
  
// 	// Clone columns to avoid mutation
// 	const updatedColumns = { ...columns };
// 	const sourceColumn = updatedColumns[source.droppableId];
// 	const destinationColumn = updatedColumns[destination.droppableId];
  
// 	// Remove task from source column
// 	const task = sourceColumn.items.find((item) => item.id.toString() === draggableId);
// 	sourceColumn.items.splice(source.index, 1);
  
// 	// Insert task into destination column at the correct position
// 	destinationColumn.items.splice(destination.index, 0, task);
  
// 	setColumns(updatedColumns);
//   };
  
// 2

// export const onDragEnd = (result, columns, setColumns) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     if (source.droppableId !== destination.droppableId) {
//         const sourceColumn = columns[source.droppableId];
//         const destColumn = columns[destination.droppableId];
//         const sourceItems = [...sourceColumn.items];
//         const destItems = [...destColumn.items];
//         const [removed] = sourceItems.splice(source.index, 1);
//         destItems.splice(destination.index, 0, removed);
//         setColumns({
//             ...columns,
//             [source.droppableId]: { ...sourceColumn, items: sourceItems },
//             [destination.droppableId]: { ...destColumn, items: destItems },
//         });
//     } else {
//         const column = columns[source.droppableId];
//         const copiedItems = [...column.items];
//         const [removed] = copiedItems.splice(source.index, 1);
//         copiedItems.splice(destination.index, 0, removed);
//         setColumns({
//             ...columns,
//             [source.droppableId]: { ...column, items: copiedItems },
//         });
//     }
// };


// PATCH /user/task/move
// If you're using a named export:


// 3
// export const onDragEnd = async (event: any) => {
//     const { taskId, fromColumnId, toColumnId } = event; // Assuming these values come from your event
//     const newIndex = 2; // Set the new index (this could be dynamically determined)

//     try {
//         // Move task (move between columns)
//         const moveResponse = await axios.patch('/user/task/move', {
//             taskId,
//             fromColumnId,
//             toColumnId,
//         });

//         if (moveResponse.data.status === 'ok') {
//             console.log('Task moved successfully');
//         } else {
//             console.error('Failed to move task:', moveResponse.data.message);
//         }

//         // Reorder task (within the same column)
//         const reorderResponse = await axios.patch('/user/task/reorder', {
//             taskId,
//             columnId: toColumnId, // Target column ID for reordering
//             newIndex,
//         });

//         if (reorderResponse.data.status === 'ok') {
//             console.log('Task reordered successfully');
//         } else {
//             console.error('Failed to reorder task:', reorderResponse.data.message);
//         }
//     } catch (error) {
//         console.error('Error moving/reordering task:', error);
//     }
// };


// 4
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const onDragEnd = (result: any, columns: any, setColumns: any) => {
// 	if (!result.destination) return;

// 	const { source, destination } = result;

// 	if (source.droppableId !== destination.droppableId) {
// 		const sourceColumn = columns[source.droppableId];
// 		const destColumn = columns[destination.droppableId];
// 		const sourceItems = [...sourceColumn.items];
// 		const destItems = [...destColumn.items];
// 		const [removed] = sourceItems.splice(source.index, 1);
// 		destItems.splice(destination.index, 0, removed);
// 		setColumns({
// 			...columns,
// 			[source.droppableId]: {
// 				...sourceColumn,
// 				items: sourceItems,
// 			},
// 			[destination.droppableId]: {
// 				...destColumn,
// 				items: destItems,
// 			},
// 		});
// 	} else {
// 		const column = columns[source.droppableId];
// 		const copiedItems = [...column.items];
// 		const [removed] = copiedItems.splice(source.index, 1);
// 		copiedItems.splice(destination.index, 0, removed);
// 		setColumns({
// 			...columns,
// 			[source.droppableId]: {
// 				...column,
// 				items: copiedItems,
// 			},
// 		});
// 	}
// };

import axios from 'axios';
export const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
  
      // Update database with new list ID
      try {
        await axios.post('http://localhost:3000/user/update-task-list', {
          taskId: removed.id_contact,
          newListId: destination.droppableId,
        });
      } catch (error) {
        console.error('Error updating task list:', error);
        return; // Exit to avoid updating state if DB fails
      }
  
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  