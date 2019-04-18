import React from "react";
import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class TicketProperties extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="properties">
        <h2 className="small-heading contact-property">Ticket Properties</h2>
        <img src={arrow} className="arrow-up-new" alt="arrow" />
        <div className="grid-row">
          <p className="property">Ticket ID</p>
          <p className="propertyNormalWords">
            <u>{this.props.id}</u>
          </p>
          <p className="property">Asset(s)</p>
          <p className="propertyNormalWords">
            <u>{this.props.asset}</u>
          </p>
          <p className="property">Type</p>
          <p className="propertyNormalWords">
            <u>{this.props.type}</u>
          </p>
          <p className="property">Priority</p>
          <p className="propertyNormalWords">
            <u>{this.props.priority}</u>
          </p>

          <div className="special-property">
            <p>Assigned</p>
            <p className="propertyArrowWords">
              <img src={arrow} className="arrow-down" alt="arrow" />
              {this.props.assigned}
            </p>
          </div>
          <div className="special-property">
            <p>Status</p>
            <p className="propertyArrowWords">
              <img src={arrow} className="arrow-down" alt="arrow" />
              {this.props.status}
            </p>
          </div>
          <p className="property">Date/Time Requested</p>
          <p className="propertyNormalWords">
            <u>{this.props.dateRequested}</u>
          </p>
          <p className="property">Date/Time Resolved</p>
          <p className="propertyNormalWords">
            <u>{this.props.dateResolved}</u>
          </p>
          <p className="property">Date/Time Closed</p>
          <p className="propertyNormalWords">
            <u>{this.props.dateClosed}</u>
          </p>
        </div>
      </div>
    );
  }
}

export default TicketProperties;
