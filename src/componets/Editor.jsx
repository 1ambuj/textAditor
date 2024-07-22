import { useState, useEffect,  useCallback, createRef } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../App.css';


const BlockEmbed = Quill.import('blots/block/embed');

// Define custom ButtonBlot
class ButtonBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute('contenteditable', false);
    node.className = 'custom-button';
    const button = document.createElement('button');
    button.innerText = value;
    node.appendChild(button);
    return node;
  }

  static value(node) {
    return node.innerText;
  }
}

// Register the ButtonBlot
ButtonBlot.blotName = 'button';
ButtonBlot.tagName = 'div';
ButtonBlot.className = 'custom-button-container';

Quill.register(ButtonBlot);

const Editor = ({ currentNote, updateNote }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });
  const quillRef = createRef();

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'link'],
      ['insertButton'] // Add a custom toolbar button for inserting the button
    ]
  };

  const handleSelectionChange = useCallback(() => {
    const quill = quillRef.current?.editor;
    if (quill) {
      const selection = quill.getSelection();
      if (selection && selection.length > 0) {
        const bounds = quill.getBounds(selection.index, selection.length);
        const editorBounds = quill.container.getBoundingClientRect();
        if (bounds && editorBounds) {
          const popupLeft = bounds.left + window.pageXOffset - editorBounds.left + 300;
          const popupTop = bounds.bottom + window.pageYOffset - editorBounds.top + 240;
          setPopupPosition({ left: popupLeft, top: popupTop });
          setPopupVisible(true);
          return;
        }
      }
    }
    setPopupVisible(false);
  }, [quillRef]);

  useEffect(() => {
    const quill = quillRef.current?.editor;
    if (quill) {
      quill.on('selection-change', handleSelectionChange);
      return () => {
        quill.off('selection-change', handleSelectionChange);
      };
    }
  }, [handleSelectionChange, quillRef]);

  const toggleFormat = (format) => {
    const quill = quillRef.current.editor;
    quill.format(format, !quill.getFormat()[format]);
  };

  const PopupMenu = () => (
    <div
      className="popup"
      style={{ position: 'absolute', left: popupPosition.left, top: popupPosition.top }}
    >
      <button onClick={() => toggleFormat('bold')}>Bold</button>
      <button onClick={() => toggleFormat('italic')}>Italic</button>
      <button onClick={() => toggleFormat('underline')}>Underline</button>
      <button onClick={() => toggleFormat('link')}>Link</button>
    </div>
  );

  const handleChange = (content) => {
    updateNote(content);
  };

  const handleButtonClick = () => {
    const quill = quillRef.current.editor;
    const length = quill.getLength();
  
    // Create a new block to ensure the button is at the end
    quill.insertText(length, '\n'); // Add a new line
    quill.insertEmbed(length + 1, 'button', 'Click Me!'); // Insert the button
    quill.insertText(length + 2, '\n'); // Ensure new line after button for better formatting
    quill.setSelection(length + 3); // Move the cursor after the inserted button
  };
  

  const handleInsertButton = () => {
    handleButtonClick();
  };

  return (
    <div className="editor">
      <ReactQuill 
        ref={quillRef}
        theme="snow" 
        value={currentNote.body} 
        onChange={handleChange} 
        className="editortxt"
        modules={modules}
      />
      {popupVisible && <PopupMenu />}
      <div className="button-container">
        <button onClick={handleInsertButton} className='insert-button'>+</button>
      </div>
    </div>
  );
};

export default Editor;