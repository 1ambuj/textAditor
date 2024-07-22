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
import { useState } from "react";


export default function MenuItem({
  item,
  addFolder,
  addNoteToFolder,
  newNote,
  currentNote,
  setCurrentNoteId,
  notes,
  updateNoteTitle
}) {
  const [editableNoteId, setEditableNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  function handleFolder() {
    addFolder(item.label);
  }

  function handleNote() {
    const newNoteObj = newNote();
    if (newNoteObj && newNoteObj.id) {
      addNoteToFolder(item.label, newNoteObj.id);
    }
  }

  const isNote = (noteId) => currentNote && currentNote.id === noteId;

  const handleTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditClick = (noteId, currentTitle) => {
    if (editableNoteId !== null && editableNoteId !== noteId) {
      handleSaveClick(editableNoteId); // Save the current editing note before switching
    }
    setEditableNoteId(noteId);
    setEditTitle(currentTitle);
  };

  const handleSaveClick = (noteId) => {
    if (editTitle.trim() !== '') {
      updateNoteTitle(noteId, editTitle);
    }
    setEditableNoteId(null);
  };

  const handleNoteClick = (noteId) => {
    if (editableNoteId !== null && editableNoteId !== noteId) {
      handleSaveClick(editableNoteId); // Save the current editing note before navigating
    }
    setCurrentNoteId(noteId);
  };

  return (
    <li>
      <div className="flex items">
        <p>{item.label}</p>
        <div className="file-folder">
          <span>
            <img src={Folder} alt="folder" onClick={handleFolder} className="red" />
          </span>
          <div>
            <span>
              <img src={NoteIcon} alt="note" onClick={handleNote} className="note new-note" />
            </span>
          </div>
        </div>
      </div>

      {item.notes && item.notes.length > 0 && (
        <div className="notes-list">
          {item.notes.map((noteId, index) => (
            <div
              key={noteId}
              className={`note-item ${isNote(noteId) ? 'selected-note' : ''}`}
              onClick={() => handleNoteClick(noteId)}
            >
              {editableNoteId === noteId ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={handleTitleChange}
                    onBlur={() => handleSaveClick(noteId)}
                    autoFocus
                  />
                </div>
              ) : (
                <div className="note-display">
                  <h4 className="note">
                    {notes[noteId]?.title || `Note ${index + 1}`}
                  </h4>
                  {isNote(noteId) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering note click
                        handleEditClick(noteId, notes[noteId]?.title || `Note ${index + 1}`);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
              )}
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
          updateNoteTitle={updateNoteTitle}
          notes={notes}
        />
      )}
    </li>
  );
}