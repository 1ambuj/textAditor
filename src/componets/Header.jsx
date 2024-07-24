import React, { useRef, useState } from 'react';
import Profile from "../assets/avatar-icon.png";
import "../App.css";


function useOnClickOutside(ref, handler) {
  React.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

  const Header  = ({items}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  function toggle() {
    setIsOpen(!isOpen);
  }

  useOnClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  const itemRender = items.map((data) => (
    <li className='list-none' key={data}>{data}</li>
  ));

  return ( 
    <div className='header'>
      <nav className='flex  '>
        <div className="flex2">
          
        </div>
        <div className="profile relative">
          <img src={Profile} alt="" onClick={toggle} className='img' />
          {isOpen && (
            <div className='dropdown' ref={dropdownRef}>
              <ul>{itemRender}</ul>
            </div>
          )}
        </div>
      </nav>
      <div className='flex2'>
      <li className='list-none red-all'><a href="">All</a></li>
          <li className=''><a href="">Board</a></li>
          <li className=''><a href="">Graph</a></li>
          <li className='l'><a href="">Recent</a></li>
      </div>
    </div>
  );
};
export default Header;