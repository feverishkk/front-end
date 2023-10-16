import { AppBarComponent } from "@syncfusion/ej2-react-navigations";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { isUserLoggedIn, logout } from "../../Services/AccountServices";
import { Link, NavLink, Navigate, Route } from "react-router-dom";

const HeaderComponent = () => {

  const isAuth = isUserLoggedIn();

  function handleLogout() {
    logout();
    Navigate('/');
  }

  return (
    <div className='control-container'>
      <AppBarComponent colorMode="Dark">
        <div>
          <span> <a to="http://localhost:3000/"> KIEHYOON'S STOCK PROJECT! </a> </span>
          <div className="e-appbar-spacer"></div>
        </div>
        <ul className='navbar-nav'>
          {
            !isAuth &&
            <li className='nav-item'>
              <NavLink to='/register' className='nav-link'> Register </NavLink>
            </li>
          }
          {
            !isAuth &&
            <li className='nav-item'>
              <NavLink to='/login' className='nav-link'> Login </NavLink>
            </li>
          }
          {
            isAuth &&
            <li className='nav-item'>
              <NavLink to='/login' className='nav-link' onClick={handleLogout}> Logout </NavLink>
            </li>
          }
        </ul>
      </AppBarComponent>
    </div>
  )
}

export default HeaderComponent