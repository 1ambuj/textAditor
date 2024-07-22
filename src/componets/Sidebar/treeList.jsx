import MenuItem from "./Tree-item"

// export default function MenuList ({list=[]}){
//    return  (
//       <ul className="menu-list-container">
//          {
//             list && list.length?
//             list.map((listItem) => <MenuItem item={listItem}  /> )
//             : null
//          }
//       </ul>
//    ) 
// }

// import MenuItem from "./Tree-item";




export default function MenuList({ list = [], addFolder, addNoteToFolder, setCurrentNoteId, newNote, currentNote,notes }) {
  return (
    <ul className="menu-list-container">
      {list.length > 0 ? (
        list.map((listItem) => (
          <MenuItem
            key={listItem.label}
            item={listItem}
            addFolder={addFolder}
            addNoteToFolder={addNoteToFolder}
            setCurrentNoteId={setCurrentNoteId}
            newNote={newNote}
            currentNote={currentNote}
            notes={notes}
          />
        ))
      ) : null}
    </ul>
  );
}