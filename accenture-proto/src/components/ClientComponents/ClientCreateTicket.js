import React from "react";
import "../../styles/createTicket.css";
import "../../styles/ClientCreateTicket.css";
import { graphql, compose } from "react-apollo";
import { Redirect } from "react-router-dom";
import {
  addRequestMutation,
  getUsersQuery,
  addThreadMutation
} from "../../queries/queries";
import CNavBar from "./CNavBar";

import profileIcon from "../../Resources/Icons/iconfinder_00-ELASTOFONT-STORE-READY_user-circle_2703062.svg";
import arrow from "../../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";
import attachment from "../../Resources/Icons/iconfinder_ic_attach_file_48px_352032.svg";

class ClientCreateTicket extends React.Component {
  constructor() {
    super();
    this.state = {
      asset: "",
      type: "",
      subject: "",
      priority: "Medium",
      assigned: "Ben",
      requesterId: "5ca6d2311c9d4400004044b2", //this is the id of joseph
      mainThread: "",
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

  submitForm(e) {
    e.preventDefault();

    let today = new Date();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      time;

    this.props.addRequestMutation({
      variables: {
        asset: this.state.asset,
        type: this.state.type,
        subject: this.state.subject,
        dateRequested: date,
        priority: this.state.priority,
        status: "Open",
        assigned: this.state.assigned,
        dateResolved: "",
        dateClosed: "",
        mainThread: this.state.mainThread,
        requesterId: this.state.requesterId //added
      }
    });
    // console.log("Data sent! Redirecting page");
    this.handleRedirect();
  }

  isFormValid = () => {
    const { asset, type, subject, mainThread } = this.state;

    return asset && type && subject && mainThread;
  };

  render() {
    if (this.state.redirect) {
      // return <Redirect to="/requests" />;
      setTimeout(function() {
        window.location.reload();
      }, 500);
      return (
        <Redirect
          to={{
            pathname: "/crequests",
            state: { createdTicket: true }
          }}
        />
      );
    }

    return (
      <div>
        <CNavBar />

        <div className="create-new-tix-main-body">
          <div className="col span-1-of-7 heading-box">
            <p className="create-new-tix-heading top-heading">Requester</p>
            <p className="create-new-tix-heading">Assets*</p>
            <p className="create-new-tix-heading">Type*</p>
            {/*arrow here*/}
            <p className="create-new-tix-heading">Subject*</p>
            {/* <p className="create-new-tix-heading">Priority</p>
            <p className="create-new-tix-heading">Assigned</p> */}
            {/*arrow here*/}
            <p className="create-new-tix-heading ">Your Message*</p>
          </div>

          <div className="col span-1-of-2 input-fields">
            <form onSubmit={this.submitForm.bind(this)}>
              <p className="top-field client-requester-name">Joseph</p>

              <br />

              <label>
                <input
                  type="text"
                  onChange={e => this.setState({ asset: e.target.value })}
                  className="client-small-input-field"
                />
              </label>

              <br />

              <label>
                <select
                  onChange={e => this.setState({ type: e.target.value })}
                  className="client-small-input-field"
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
                  className="client-small-input-field"
                />
              </label>

              <br />

              <label>
                <textarea
                  placeholder="Enter text here..."
                  onChange={e => this.setState({ mainThread: e.target.value })}
                  rows="4"
                  cols="10"
                  className="client-small-input-field last-field"
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
  graphql(addRequestMutation, { name: "addRequestMutation" }),
  graphql(getUsersQuery, { name: "getUsersQuery" }),
  graphql(addThreadMutation, { name: "addThreadMutation" })
)(ClientCreateTicket);
