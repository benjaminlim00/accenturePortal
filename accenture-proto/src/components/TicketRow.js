import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";

import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class TicketRow extends React.Component {
  constructor() {
    super();
    this.state = {
      checkbox: false
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
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
        <div className="col span-1-of-9">
          <h4 className="detail">{this.props.requester}</h4> {/*John Tan*/}
        </div>
        <div className="col span-1-of-9">
          <h4 className="detail">{this.props.asset}</h4> {/*Login API*/}
        </div>
        <div className="col span-1-of-9">
          <h4 className="detail">{this.props.type}</h4> {/*Purchase Enquiry*/}
        </div>
        <div className="col span-1-of-4">
          <h4 className="detail">{this.props.subject}</h4>
          {/*Enquiry about API*/}
        </div>
        <div className="col span-1-of-6">
          <h4 className="detail">{this.props.dateRequested}</h4>
          {/*12 January 2019 12:00:00*/}
        </div>
        <div className="col span-1-of-9">
          <h4 className="detail">{this.props.priority}</h4> {/*High*/}
        </div>
        <div className="col span-1-of-9">
          <h4 className="detail">
            {this.props.status}
            <img src={arrow} className="arrow-down-2" />
          </h4>
        </div>
        <div className="col span-1-of-9">
          <h4 className="detail">
            {this.props.assigned}
            <img src={arrow} className="arrow-down-2" />
          </h4>
        </div>
      </div>
    );
  }
}

export default TicketRow;
