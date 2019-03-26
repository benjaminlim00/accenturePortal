import React from "react";
import "../styles/createTicket.css";
import { graphql, compose } from "react-apollo";
import { Redirect } from "react-router-dom";
import { addRequestMutation } from "../queries/queries";
import NavBar from "./NavBar";
import AssignedOptions from "../Resources/Data/AssignedOptions";

import profileIcon from "../Resources/Icons/iconfinder_00-ELASTOFONT-STORE-READY_user-circle_2703062.svg";
import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";
import attachment from "../Resources/Icons/iconfinder_ic_attach_file_48px_352032.svg";

class CreateTicket extends React.Component {
  constructor() {
    super();
    this.state = {
      requester: "",
      asset: "",
      type: "",
      subject: "",
      priority: "",
      assigned: "",
      redirect: false
    };

    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect() {
    this.setState({
      redirect: true
    });
  }

  displayType() {
    let datals = [
      { name: "Request", id: 0 },
      { name: "Consult", id: 1 },
      { name: "Enquiry", id: 2 }
    ];

    return datals.map(data => {
      return (
        <option key={data.id} value={data.name}>
          {data.name}
        </option>
      );
    });
  }

  displayAssigned() {
    let datals = { AssignedOptions };
    datals = datals.AssignedOptions;
    console.log(datals);

    return datals.map(data => {
      return (
        <option key={data.id} value={data.name}>
          {data.name}
        </option>
      );
    });
  }

  displayPriority() {
    let datals = [
      { name: "Low", id: 0 },
      { name: "Medium", id: 1 },
      { name: "High", id: 2 }
    ];

    return datals.map(data => {
      return (
        <option key={data.id} value={data.name}>
          {data.name}
        </option>
      );
    });
  }

  submitForm(e) {
    e.preventDefault();

    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    this.props.addRequestMutation({
      variables: {
        requester: this.state.requester,
        asset: this.state.asset,
        type: this.state.type,
        subject: this.state.subject,
        dateRequested: date,
        priority: this.state.priority,
        status: "Open",
        assigned: this.state.assigned,
        dateResolved: "",
        dateClosed: ""
      }
    });
    console.log("Data sent! Redirecting page");
    this.handleRedirect();
  }

  isFormValid = () => {
    const { requester, asset, type, subject, priority, assigned } = this.state;

    return requester && asset && type && subject && priority && assigned;
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/requests" />;
    }

    return (
      <div>
        <NavBar />
        <div className="row ticket-page-header">
          <h2 className="small-heading">Create A New Ticket</h2>
          <img src={profileIcon} className="user-icon" />
        </div>

        <div className="create-new-tix-main-body">
          <div className="col span-1-of-7 heading-box">
            <p className="create-new-tix-heading top-heading">Requester</p>
            <p className="create-new-tix-heading">Assets*</p>
            <p className="create-new-tix-heading">Type*</p>
            {/*arrow here*/}
            <p className="create-new-tix-heading">Subject*</p>
            <p className="create-new-tix-heading">Priority</p>
            <p className="create-new-tix-heading">Assigned</p>
            {/*arrow here*/}
            <p className="create-new-tix-heading ">Your Message*</p>
          </div>

          <div className="col span-1-of-2 input-fields">
            <form onSubmit={this.submitForm.bind(this)}>
              <label>
                <input
                  type="text"
                  onChange={e => this.setState({ requester: e.target.value })}
                  className="top-field small-input-field"
                />
              </label>

              <br />

              <label>
                <input
                  type="text"
                  onChange={e => this.setState({ asset: e.target.value })}
                  className="small-input-field"
                />
              </label>

              <br />

              <label>
                <select
                  onChange={e => this.setState({ type: e.target.value })}
                  className="small-input-field"
                >
                  <option>Select type</option>
                  {this.displayType()}
                </select>
              </label>

              <br />

              <label>
                <input
                  type="text"
                  onChange={e => this.setState({ subject: e.target.value })}
                  className="small-input-field"
                />
              </label>

              <br />

              <select
                onChange={e => this.setState({ priority: e.target.value })}
                className="small-input-field"
              >
                <option>Select priority</option>
                {this.displayPriority()}
              </select>

              <br />

              <select
                onChange={e => this.setState({ assigned: e.target.value })}
                className="small-input-field"
              >
                <option>Select admin</option>
                {this.displayAssigned()}
              </select>

              <br />

              <label>
                <textarea
                  placeholder="Enter text here..."
                  rows="4"
                  cols="100"
                  className="small-input-field last-field"
                />
              </label>

              <br />

              <div className="attach-send-bar">
                <img src={attachment} className="file-logo" />

                <p className="attach-file">Attach</p>

                <button
                  className="send-button"
                  disabled={!this.isFormValid()}
                  onClick={this.buttonPress}
                >
                  <p className="send">Send</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(addRequestMutation, { name: "addRequestMutation" })
)(CreateTicket);