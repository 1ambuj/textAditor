// import { useState } from "react";
// import MenuList from "./treeList";
// import Folder from "../../assets/folder-solid.svg";
// import File from "../../assets/file-solid.svg";


// export default function MenuItem({item}){

//   const [visible , setVisible] = useState({})
//   const [count , setCount] = useState(1)
//   // function handleClick(label){
//   //     setVisible({
//   //       ...visible,
//   //       [label]:!visible[label]
//   //     })
//   // }
//   function handleFolder(){
//     setCount((prevState)=>{
//        return  prevState+1
//     })
//     item.push({
//       label:`collection${count}`,
//       to: "location"
//     })
//   }

//    return (
//     <li>
//        <div className="flex items">
//        <p>{item.label}</p>
      
      
//        {item && item.children && item.children.length>0?
//         ( <div  className="file-folder">
//              <span><img src={Folder} alt="img" onClick={handleFolder} className="red"/></span>
//              <span><img src={File} alt="img" className="file"/></span>
//         </div>
//         ) : null
//        }
//        </div>

//         {
//             item && item.children && item.children.length> 0?
//            (<MenuList list={item.children} />):null
//         }
//     </li>
//    )
// }



import MenuList from "./treeList";
import Folder from "../../assets/folder-solid.svg";
import NoteIcon from "../../assets/file-solid.svg";



export default function MenuItem({
  item,
  addFolder,
  addNoteToFolder,
  newNote,
  currentNote,
  setCurrentNoteId,
  notes
}) {
  function handleFolder() {
    addFolder(item.label);
    console.log(item.label);
  }

  function handleNote() {
    const newNoteObj = newNote();
    if (newNoteObj && newNoteObj.id) {
      addNoteToFolder(item.label, newNoteObj.id);
    }
  }

  const isNote = (noteId) => currentNote && currentNote.id === noteId;

  return (
    <li className="flex-li">
      <div className="flex items">
        <p>{item.label}</p>
        <div className="file-folder">
          <span>
            <img src={Folder} alt="folder" onClick={handleFolder} className="red" />
          </span>
          <div>
            <span>
              <img  src={NoteIcon}  alt="note" onClick={handleNote} className=" new-note" />
            </span>
          </div>
        </div>
      </div>

      {item.notes && item.notes.length > 0 && (
        <div className="notes-list">
          {item.notes.map((noteId, index) => (
            <div 
              key={noteId} 
              className={`note-item ${isNote(noteId) ? "selected-note" : ""}`} 
              onClick={() => setCurrentNoteId(noteId)}
            >
              <h4 className="note">{`Note ${index + 1}`}</h4>
            </div>
          ))}
        </div>
      )}

      {item.children && item.children.length > 0 && (
        <MenuList
          list={item.children}
          addFolder={addFolder}
          addNoteToFolder={addNoteToFolder}
          newNote={newNote}
          currentNote={currentNote}
          setCurrentNoteId={setCurrentNoteId}
          notes={notes}
        />
      )}
    </li>
  );
}