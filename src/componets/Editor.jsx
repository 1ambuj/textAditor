import  { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function Editor({ currentNote, updateNote }) {
  const [contentBlocks, setContentBlocks] = useState(currentNote.body);
  const quillRef = useRef(null);

  useEffect(() => {
    setContentBlocks(currentNote.body);
  }, [currentNote]);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'link'],
      ['insertButton']
    ]
  };

  const handleChange = (content, index) => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks[index] = content;
    setContentBlocks(updatedBlocks);
    updateNote(currentNote.id, updatedBlocks); // Propagate changes to App component
  };

  const handleInsertButton = () => {
    setContentBlocks([...contentBlocks, '']); // Add an empty content block
    document.querySelector(".editortxt").style.borderBottom = "1px solid #ccc"
    document.querySelector(".editortxt").style.paddingBottom = "30px"
  };

  //   const PopupMenu = () => {
//     return (
//       <div
//         className="popup"
//         style={{ position: 'absolute', left: popupPosition.left, top: popupPosition.top }}
//       >
//         <button onClick={() => toggleFormat('bold')}>Bold</button>
//         <button onClick={() => toggleFormat('italic')}>Italic</button>
//         <button onClick={() => toggleFormat('underline')}>Underline</button>
//         <button onClick={() => toggleFormat('link')}>Link</button>
//       </div>
//     );
//   };
//   const handleChange = (content) => {
//     updateNote(content);
//   };
 

  return (
    <div className="editor">
      {contentBlocks.map((content, index) => (
        <ReactQuill
          key={index}
          theme="snow"
          value={content}
          onChange={(content) => handleChange(content, index)}
          className="editortxt"
          modules={modules}
          ref={quillRef}
        />
      ))}
      <div className="button-container">
        <button onClick={handleInsertButton} className='insert-button'>+</button>
      </div>
    </div>
  );
}




// import { useState, useEffect,  useCallback, createRef } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import '../App.css';


// const Editor = ({currentNote, updateNote}) => {
 
//   // const [value, setValue] = useState('');
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });
//   const quillRef = createRef();

//   const modules = {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'link']
//     ]
//   };
//   const handleSelectionChange = useCallback(() => {
//     const quill = quillRef.current?.editor;
//     if (quill) {
//       const selection = quill.getSelection();
//       if (selection && selection.length > 0) {
//         const range = quill.getSelection(true);
//         if (range && range.length > 0) {
//           const bounds = quill.getBounds(range.index, range.length); // Use Quill's getBounds method
//           const editorBounds = quill.container.getBoundingClientRect();
//           // console.log("editbonds",editorBounds)
//           if (bounds && editorBounds) {
//             const popupLeft = bounds.left + window.pageXOffset - editorBounds.left+300 ;
//             const popupTop = bounds.bottom + window.pageYOffset - editorBounds.top + 240;
//             // console.log("Popup position:", { left: popupLeft, top: popupTop });
//             setPopupPosition({ left: popupLeft, top: popupTop });
//             setPopupVisible(true);
//             return;
//           }
//         }
//       }
//     }

//     setPopupVisible(false);
//   }, [quillRef]);
  
  
//   useEffect(() => {
//     const quill = quillRef.current?.editor;
//     if (quill) {
//       quill.on('selection-change', handleSelectionChange);
//       return () => {
//         quill.off('selection-change', handleSelectionChange);
//       };
//     }
//   }, [handleSelectionChange, quillRef]);

//   const toggleFormat = (format) => {
//     const quill = quillRef.current.editor;
//     quill.format(format, !quill.getFormat()[format]);
//   };

//   const PopupMenu = () => {
//     return (
//       <div
//         className="popup"
//         style={{ position: 'absolute', left: popupPosition.left, top: popupPosition.top }}
//       >
//         <button onClick={() => toggleFormat('bold')}>Bold</button>
//         <button onClick={() => toggleFormat('italic')}>Italic</button>
//         <button onClick={() => toggleFormat('underline')}>Underline</button>
//         <button onClick={() => toggleFormat('link')}>Link</button>
//       </div>
//     );
//   };
//   const handleChange = (content) => {
//     updateNote(content);
//   };
 

//   return (
//     <div className="editor">
//       <ReactQuill 
//         ref={quillRef}
//         theme="snow" 
//         value={currentNote.body} 
//         onChange={handleChange} 
//         className="editortxt"
//         modules={modules}
//       />
//         {popupVisible && <PopupMenu />}
//     </div>
//   );
// }

// export default Editor
