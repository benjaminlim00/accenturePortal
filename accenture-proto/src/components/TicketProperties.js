import React from "react";
import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class TicketProperties extends React.Component {
  render() {
    return (
      <div className="col span-1-of-4 text-boxes internal-scrolling">
        {console.log(this.props)}
        <div className="properties">
          <h2 className="small-heading">Ticket Properties</h2>
          <div className="grid-row">
            <p className="property">Ticket ID</p>
            <p className="propertyNormalWords">{this.props.id}</p>
            <p className="property">Asset(s)</p>
            <p className="propertyNormalWords">{this.props.assets}</p>
            <p className="property">Type</p>
            <p className="propertyNormalWords">{this.props.type}</p>
            <p className="property">Priority</p>
            <p className="propertyNormalWords">{this.props.priorty}</p>
            <div className="special-property">
              <p>Assigned</p>

              <p className="propertyArrowWords">
                <img src={arrow} className="arrow-down" />
                {this.props.assigned}
              </p>
            </div>
            <div className="special-property">
              <p>Status</p>

              <p className="propertyArrowWords">
                <img src={arrow} className="arrow-down" />
                {this.props.status}
              </p>
            </div>
            <p className="property">Date/Time Requested</p>
            <p className="propertyNormalWords">{this.props.dateRequested}</p>
            <p className="property">Date/Time Resolved</p>
            <p className="propertyNormalWords">{this.props.dateResolved}</p>
            <p className="property">Date/Time Closed</p>
            <p className="propertyNormalWords">{this.props.dateClosed}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketProperties;
