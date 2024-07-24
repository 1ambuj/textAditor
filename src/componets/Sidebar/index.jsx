
import MenuList from "./treeList";

// export default function TreeView({sidebarData = []}){
//     return (
//         <div className="tree-view-container">
//             <MenuList list={sidebarData} />
//         </div>
//     )
// }
// import { useState } from "react";


// export default function TreeView() {
//   const [data, setData] = useState([]);

//   function addFolder(parentLabel) {
//     const updateData = (list) => {
//       return list.map((item) => {
//         if (item.label === parentLabel) {
//           return {
//             ...item,
//             children: [
//               ...(item.children || []),
//               { label: `collection${item.children?.length + 1 || 1}`, to: "location" }
//             ]
//           };
//         } else if (item.children) {
//           return { ...item, children: updateData(item.children) };
//         }
//         return item;
//       });
//     };

//     setData((prevData) => updateData(prevData));
//   }

//   function addFile(parentLabel) {
//     const updateData = (list) => {
//       return list.map((item) => {
//         if (item.label === parentLabel) {
//           return {
//             ...item,
//             children: [
//               ...(item.children || []),
//               { label: `file`, to: "file-location" }
//             ]
//           };
//         } else if (item.children) {
//           return { ...item, children: updateData(item.children) };
//         }
//         return item;
//       });
//     };

//     setData((prevData) => updateData(prevData));
//   }

//   return (
//     <div className="tree-view-container">
//       <MenuList list={data} addFolder={addFolder} addFile={addFile} />
//       <button onClick={() => setData([...data, { label: `Add Folder`, to: "location", children: [] }])}>
//         Add Root
//       </button>
//     </div>
//   );
// }

import { useState } from "react";


export default function TreeView({ currentNote, setCurrentNoteId, newNote ,notes}) {
  const [data, setData] = useState([]);
 
  function addFolder(parentLabel) {
    const updateData = (list, parentLabel, parentPath = '') => {
      return list.map((item, index) => {
        const currentPath = parentPath ? `${parentPath}.${index + 1}` : `${index + 1}`;
  
        if (item.label === parentLabel) {
          const newLabel = `collection.${currentPath}.${(item.children?.length || 0) + 1}`;
          return {
            ...item,
            children: [
              ...(item.children || []),
              { label: newLabel, to: "location", children: [], notes: [] }
            ]
          };
        } else if (item.children) {
          return { ...item, children: updateData(item.children, parentLabel, currentPath) };
        }
        return item;
      });
    };
  
    setData((prevData) => updateData(prevData, parentLabel));
  }
  
  function addNoteToFolder(parentLabel, newNoteId) {
    const updateData = (list) => {
      return list.map((item) => {
        if (item.label === parentLabel) {
          return {
            ...item,
            notes: [...(item.notes || []), newNoteId]
          };
        } else if (item.children) {
          return { ...item, children: updateData(item.children) };
        }
        return item;
      });
    };
  
    setData((prevData) => updateData(prevData));
  }
  
// console.log(notes)
  return (
    <div className="tree-view-container">
      <MenuList 
        list={data} 
        addFolder={addFolder} 
        addNoteToFolder={addNoteToFolder} 
        setCurrentNoteId={setCurrentNoteId} 
        newNote={newNote} 
        currentNote={currentNote}
        notes={notes} 
      />
      <button onClick={() => setData([...data, { label: `collection${data.length + 1}`, to: "location", children: [], notes: [] }])}>
        Add Root Folder
      </button>
    </div>
  );
}