import { useEffect, useState} from "react";
import Editor from "./componets/Editor";
import Header from "./componets/Header";
// import Sidebar from "./componets/Sidebar";
import { nanoid } from "nanoid";
import TreeView  from "./componets/Sidebar/index";
import sidebarData from "./componets/Sidebar/SidebarData";
function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || "");

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
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

  function updateNote(text) {
    setNotes(oldNotes => oldNotes.map(oldNote => {
      return oldNote.id === currentNoteId
        ? { ...oldNote, body: text }
        : oldNote;
    }));
  }

  function findCurrentNote() {
    return notes.find(note => note.id === currentNoteId) || notes[0];
  }

  const items = ["Profile", "What's new", "Help", "Send feedback", "Hints and shortcuts"];

  return (
    <>
      <Header items={items} />
      <main className="main-flex">
        <TreeView 
          sidebarData={sidebarData} 
          currentNote={findCurrentNote()} 
          setCurrentNoteId={setCurrentNoteId} 
          newNote={createNewNote} 
          notes={notes}
        />
        {currentNoteId && notes.length > 0 && (
          <Editor 
            currentNote={findCurrentNote()} 
            updateNote={updateNote} 
          />
        )}
      </main>
    </>
  );
}

export default App;