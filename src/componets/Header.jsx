import React, { useRef, useState } from 'react';
import bell from "../assets/bell-regular.svg"
import Menu from "../assets/bars-solid.svg"
import Search from "../assets/magnifying-glass-solid.svg"
import team from "../assets/user-plus-solid.svg"

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
             <img src={Menu} alt="" className="menu-bar" width="20px"/>
             <div className='span-div'>
              <img src={Search} alt="" className="search-bar" width="20px"/>
              <span className='search-span'>dfin</span>
             </div>
            
        </div>
       
        <div className='team-flex'>
          <div className='team-member-flex'>
          <span><img src={team} alt="team" width="20px" /></span>
          <h3 >INVITE TEAM MEMBER </h3>
          
          </div>
          <img src={bell} alt="" width="20px"/>
          <div className="profile relative">
            <div onClick={toggle} className='ambuj img'>AM</div>
            {isOpen && (
              <div className='dropdown' ref={dropdownRef}>
                <ul>{itemRender}</ul>
              </div>
            )}
            <div className='new'>new</div>
          
          </div>
        </div>
      </nav>
      <div className='list-item'>
      <li className='list-none red-all'><a href="">All</a></li>
          <li className=''><a href="">Board</a></li>
          <li className=''><a href="">Graph</a></li>
          <li className='l'><a href="">Recent</a></li>
      </div>
    </div>
  );
};
export default Header;