import React, { Component } from "react";
import "../styles/App.css";
import UpdateButton from "./UpdateButton";

import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class DropdownCardStatus extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  }

  render() {
    let pageId = this.props.idd;
    // console.log("pageID is: " + pageId);

    return (
      <div>
        <button
          onClick={this.showMenu}
          id="transparentButton"
          className="transparentButton-status"
        >
          <img src={arrow} className="arrow-down-2" />
        </button>

        {this.state.showMenu ? (
          <div
            className="menu"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <ul className="dropdownList">
              <li className="buttonList">
                <UpdateButton
                  idd={pageId}
                  text="Open"
                  logic="status"
                  toggleUpdatedTicket={this.props.toggleUpdatedTicket}
                />
              </li>
              <li className="buttonList">
                <UpdateButton
                  idd={pageId}
                  text="Resolved"
                  logic="status"
                  toggleUpdatedTicket={this.props.toggleUpdatedTicket}
                />
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropdownCardStatus;
