import { useEffect, useState} from "react";
import Editor from "./componets/Editor";
import Header from "./componets/Header";
// import Sidebar from "./componets/Sidebar";
import { nanoid } from "nanoid";
import TreeView  from "./componets/Sidebar/index";
import sidebarData from "./componets/Sidebar/SidebarData";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: ["# Type your markdown note's title here"] // Initialize with default content
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id); // Set the current note to the newly created one
    return newNote;
  }

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function updateNote(updatedNoteId, updatedContentBlocks) {
    setNotes(oldNotes => oldNotes.map(oldNote => {
      return oldNote.id === updatedNoteId
        ? { ...oldNote, body: updatedContentBlocks }
        : oldNote;
    }));
  }

  function findCurrentNote() {
    return notes.find(note => note.id === currentNoteId) || notes[0];
  }

  const items = ["Profile", "What's new", "Help", "Send feedback", "Hints and shortcuts"];

  return (
    <div className="body-container">
      <Header items={items} />
      <main>
        <div className="main-flex">
          <TreeView 
            sidebarData={sidebarData} 
            currentNote={findCurrentNote()} 
            setCurrentNoteId={setCurrentNoteId} 
            newNote={createNewNote} 
            notes={notes} 
            className="tree-view-c"
          />
          {currentNoteId && notes.length > 0 && (
            <Editor 
              currentNote={findCurrentNote()} 
              updateNote={updateNote} 
            />  
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

// function App() {
//   const [notes, setNotes] = useState([]);
//   const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || "");

//   function createNewNote() {
//     const newNote = {
//       id: nanoid(),
//       body: "# Type your markdown note's title here"
//     };
//     setNotes(prevNotes => [newNote, ...prevNotes]);
//     setCurrentNoteId(newNote.id);
//     return newNote;
//   }

//   useEffect(() => {
//     const savedNotes = JSON.parse(localStorage.getItem("notes"));
//     if (savedNotes) {
//       setNotes(savedNotes);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("notes", JSON.stringify(notes));
//   }, [notes]);

//   // Changed: UpdateNote function to accept the entire note object and update the corresponding note in the state
//   function updateNote(updatedNote) {
//     setNotes(oldNotes => oldNotes.map(oldNote => {
//       return oldNote.id === updatedNote.id
//         ? updatedNote
//         : oldNote;
//     }));
//   }

//   function findCurrentNote() {
//     return notes.find(note => note.id === currentNoteId) || notes[0];
//   }

//   const items = ["Profile", "What's new", "Help", "Send feedback", "Hints and shortcuts"];

//   return (
//     <>
//       <Header items={items} />
//       <main>
//         <div className="main-flex">
//           <TreeView 
//             sidebarData={sidebarData} 
//             currentNote={findCurrentNote()} 
//             setCurrentNoteId={setCurrentNoteId} 
//             newNote={createNewNote} 
//             notes={notes}
//           />
//           {currentNoteId && notes.length > 0 && (
//             // Updated: Pass the entire currentNote and updateNote function to the Editor component
//             <Editor 
//               currentNote={findCurrentNote()} 
//               updateNote={updateNote} 
//             />  
//           )}
//         </div>
//       </main>
//     </>
//   );
// }

// export default App;