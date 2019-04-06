import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";
import { getRequestQuery, getUserQuery } from "../queries/queries";
import { graphql } from "react-apollo";

import { Link } from "react-router-dom";

class ContactDetails extends React.Component {
  displayContactDetails() {
    //const {book} = this.props.data;
    console.log("CONTACT DETAILS");
    console.log(this.props);

    return (
      <div className="combined-contact-past-ticket-details">
        <div className="contact-details">
          <h5 className="small-heading">Contact Details</h5>

          <h5 className="type-of-details">Requester</h5>
          <p className="detail">
            {this.props.firstName} {this.props.lastName}
          </p>

          <h5 className="type-of-details">Email</h5>
          <p className="detail">{this.props.email}</p>

          <h5 className="type-of-details">Mobile Number</h5>
          <p className="detail">{this.props.contactNumber}</p>

          <h5 className="type-of-details">Company</h5>
          <p className="detail">EDIT THIS!</p>
        </div>
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
    let linkStr = "requestDetail/" + this.props.id;

    return (
      <div className="col span-1-of-4 text-boxes">
        {this.displayContactDetails()}
      </div>
    );
  }
}

export default ContactDetails;
