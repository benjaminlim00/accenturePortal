import React from "react";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
import "../../styles/ClientTicketList.css";

import { Link } from "react-router-dom";
import DropdownCardStatus from "../DropdownCardStatus";

import arrow from "../../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class TicketRow extends React.Component {
  constructor() {
    super();
    this.state = {
      checkbox: false,
      id: null
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.id
    });
  }

  handleCheckbox = event => {
    console.log("clicked checkbox");
    if (this.state.checkbox === true) {
      this.setState({ checkbox: false });
    } else {
      this.setState({ checkbox: true });
    }
  };

  render() {
    let linkStr = "requestDetail/" + this.props.id;

    return (
      <div className="filter-box-2">
        <div className="col span-1-of-12">
          <input
            className="indiv-checkbox rows-checkboxNeed"
            type="checkbox"
            name="checkbox"
            checked={this.state.checkbox}
            onChange={this.handleCheckbox}
          />
        </div>
        <div className="col span-1-of-10">
          <h4 className="detail">{this.props.asset}</h4> {/*John Tan*/}
        </div>
        <div className="col span-1-of-8">
          <h4 className="detail">{this.props.type}</h4> {/*Login API*/}
        </div>
        <div className="col span-1-of-3">
          <Link to={linkStr} className="subjectLink">
            <h4 className="detail subjectLinkHover">{this.props.subject}</h4>
          </Link>
        </div>
        <div className="col span-1-of-5">
          <h4 className="detail">{this.props.dateRequested}</h4>
        </div>
        <div className="col span-1-of-5">
          <h4 className="detail">{this.props.dateClosed}</h4>
        </div>
        <div className="col span-1-of-10" id="status">
          <h4 className="detail">{this.props.status}</h4>
        </div>
        <div className="statusArrow">
          <DropdownCardStatus idd={this.props.id} isClient="true" />
        </div>
        <div className="col span-1-of-8">
          <div class="user-ticket-list-yes-button">
            <p class="yes-button-text">Yes</p>
          </div>
          <div class="user-ticket-list-no-button">
            <p class="no-button-text">No</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketRow;
