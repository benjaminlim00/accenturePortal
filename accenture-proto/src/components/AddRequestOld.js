import React from "react";
import { graphql, compose } from "react-apollo";
import "../styles/addRequest.css";

import NavBar from "./NavBar";
import { addRequestMutation } from "../queries/queries";

class AddRequestOld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requester: "",
      asset: "",
      type: "",
      subject: "",
      dateRequested: "",
      priority: "",
      status: "",
      assigned: ""
    };
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
    let datals = [
      { name: "Ben", id: 0 },
      { name: "Bertha", id: 1 },
      { name: "Hangwee", id: 2 }
    ];

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

    this.props.addRequestMutation({
      variables: {
        requester: this.state.requester,
        asset: this.state.asset,
        type: this.state.type,
        subject: this.state.subject,
        dateRequested: this.state.date,
        priority: this.state.priority,
        status: this.state.status,
        assigned: this.state.assigned,
        dateResolved: "",
        dateClosed: ""
      }
    });
    console.log("Data sent!");
  }

  render() {
    return (
      <div>
        <NavBar />
        <form id="form-add" onSubmit={this.submitForm.bind(this)}>
          <div className="field">
            <label>Requester:</label>
            <input
              type="text"
              onChange={e => this.setState({ requester: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Asset:</label>
            <input
              type="text"
              onChange={e => this.setState({ asset: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Type:</label>
            <select onChange={e => this.setState({ type: e.target.value })}>
              <option>Select type</option>
              {this.displayType()}
            </select>
          </div>

          <div className="field">
            <label>Subject:</label>
            <input
              type="text"
              onChange={e => this.setState({ subject: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Date requested:</label>
            <input
              type="text"
              onChange={e => this.setState({ dateRequested: e.target.value })}
            />
          </div>

          {/*

            <div className="field">
            <label>Priority:</label>
            <input
            type="text"
            onChange={e => this.setState({ priority: e.target.value })}
            />
            </div>
          */}

          <div className="field">
            <label>Priority:</label>
            <select onChange={e => this.setState({ priority: e.target.value })}>
              <option>Select priority</option>
              {this.displayPriority()}
            </select>
          </div>

          <div className="field">
            <label>Status:</label>
            <input
              type="text"
              onChange={e => this.setState({ status: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Assigned:</label>
            <select onChange={e => this.setState({ assigned: e.target.value })}>
              <option>Select admin</option>
              {this.displayAssigned()}
            </select>
          </div>

          <button className="add-button">+</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(addRequestMutation, { name: "addRequestMutation" })
)(AddRequestOld);
