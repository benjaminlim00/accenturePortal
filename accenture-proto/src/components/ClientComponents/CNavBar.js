import React from "react";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";

import accentureIcon from "../../Resources/Images/Acc_GT_Dimensional_Purple_RGB_REV.svg";
import profileIcon from "../../Resources/Icons/iconfinder_00-ELASTOFONT-STORE-READY_user-circle_2703062.svg";

class CNavBar extends React.Component {
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
            <img
              src={profileIcon}
              className="user-user-icon"
              alt="profile-icon"
            />
            <ul className="main-nav">
              <li className="home-page">
                <a href="/crequests">All Tickets</a>
              </li>
              <li className="create-ticket-page">
                <a href="/ccreateTicket">Create Ticket</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default CNavBar;
