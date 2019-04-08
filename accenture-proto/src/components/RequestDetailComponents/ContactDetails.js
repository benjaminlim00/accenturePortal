import React from "react";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
import { getRequestQuery, getUserQuery } from "../../queries/queries";
import { graphql } from "react-apollo";
import arrow from "../../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

import { Link } from "react-router-dom";

class ContactDetails extends React.Component {
  displayContactDetails() {
    // console.log("CONTACT DETAILS");
    // console.log(this.props);

    return (
      <div className="contact-details">
        <h2 className="small-heading contact-property">Contact Details</h2>
        <img src={arrow} className="arrow-up-new" />

        <h5 className="type-of-details">Requester</h5>
        <p className="detail-req">
          {this.props.firstName} {this.props.lastName}
        </p>

        <h5 className="type-of-details">Email</h5>
        <p className="detail-req">{this.props.email}</p>

        <h5 className="type-of-details">Mobile Number</h5>
        <p className="detail-req">{this.props.contactNumber}</p>

        <h5 className="type-of-details">Company</h5>
        <p className="detail-req">EDIT THIS</p>

        <h5 className="type-of-details">Account Type</h5>
        <p className="detail-req">{this.props.accountType}</p>
      </div>
    );
    /*
      } else {
        return (
          <div>No book selected...</div>
        )
      }*/
  }

  componentDidMount() {
    this.setState({
      id: this.props.id
    });
  }

  render() {
    return (
      <div className="combined-contact-past-ticket-details">
        {this.displayContactDetails()}
      </div>
    );
  }
}

export default ContactDetails;
