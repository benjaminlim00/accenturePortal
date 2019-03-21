import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";

import accentureIcon from "../Resources/Images/Acc_GT_Dimensional_Purple_RGB_REV.svg";

class NavBar extends React.Component {
  render() {
    return (
      <header className="header">
        <nav>
          <div className="row nav-bar">
            <div className="accenture-head">
              <img
                src={accentureIcon}
                className="accenture-logo"
                alt="Accenture"
              />
            </div>
            <p className="accenture-text">Accenture</p>
            <ul className="main-nav">
              <li className="home-page">
                <a href="/requests">Home</a>
              </li>
              <li className="create-ticket-page">
                <a href="/createTicket">Create Ticket</a>
              </li>
              <li className="settings-page">
                <a href="#">Settings</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default NavBar;
