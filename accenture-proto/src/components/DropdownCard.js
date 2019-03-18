import React, { Component } from "react";
import "../styles/App.css";

import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class DropdownCard extends Component {
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
    return (
      <div>
        <button onClick={this.showMenu} id="transparentButton">
          <img src={arrow} className="arrow-down-2" />
        </button>

        {this.state.showMenu ? (
          <div
            className="menu"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <button id="transparentButtonVer2"> Open </button>
            <br />
            <button id="transparentButtonVer2"> Resolved </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropdownCard;
