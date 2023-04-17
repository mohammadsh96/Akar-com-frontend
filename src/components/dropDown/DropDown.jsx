import React, { useState, useContext } from "react";
import { setting } from "../data/Data";
import { Link } from "react-router-dom";
import "./dropDown.css";
import { LoginContext } from "../context/context";
export default function DropDown() {
  const [dropdown, setDropdown] = useState(false);
  const auth = useContext(LoginContext);
  const handleLogOut = () => {
    auth.logoutFunction();
  };
  return (
    <>
      <ul
        className={dropdown ? "services-submenu clicked" : "services-submenu"}
        onClick={() => setDropdown(!dropdown)}
      >
        {setting.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={item.cName}
                onClick={() => setDropdown(false)}
              >
               {item.text==="Profile" ? <>{item.text} { <i class="fa-regular fa-user"></i>} </>   :  item.text } 
               {item.text==="Contact" ? <> { <i class="fa-light fa-envelope-open"></i>} </>   :  "" } 

                
              </Link>
            </li>
          );
        })}
          <Link to={'/signup'}>
            <button onClick={handleLogOut} className='btn1'>
              <i className='fa fa-sign-out'></i> logOut
            </button>
            </Link>
       
      </ul>
      <div className="space"></div>
    </>
  );
}
