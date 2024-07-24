import React from "react"


const PopupMenu = ({ popupPosition, toggleFormat}) => {
    return (
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
  };
 

export default PopupMenu