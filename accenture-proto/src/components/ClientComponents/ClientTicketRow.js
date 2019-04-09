import React from "react";

import { graphql, compose } from "react-apollo";
import { Redirect } from "react-router-dom";
import { addRequestMutation, getRequestsQuery } from "../../queries/queries";

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
    this.yesPress = this.yesPress.bind(this);
    this.noPress = this.noPress.bind(this);
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

  noPress() {
    console.log("no button pressed");
  }

  yesPress() {
    console.log("yes button pressed");
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      let pageId = this.props.id;
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });

      dataArr = dataArr[0];
      // console.log(dataArr);
    } else {
      console.log("still retreiving data from mongoDB");
    }

    // this.props.addRequestMutation({
    //   variables: {
    //     asset: dataArr.asset,
    //     type: dataArr.type,
    //     subject: dataArr.subject,
    //     dateRequested: dataArr.dateRequested,
    //     priority: dataArr.priority,
    //     status: "Open",
    //     assigned: dataArr.assigned,
    //     dateResolved: date,
    //     dateClosed: date,
    //     mainThread: dataArr.mainThread,
    //     requesterId: dataArr.requesterId
    //   }
    // });
    console.log("Data sent! Redirecting page");
    // this.handleRedirect();
  }

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
        <div className="col span-1-of-10" id="client-status">
          <h4 className="detail">{this.props.status}</h4>
        </div>
        <div className="statusArrow">
          <DropdownCardStatus idd={this.props.id} isClient="true" />
        </div>
        <div className="col span-1-of-8">
          <button
            className="user-ticket-list-yes-button"
            // disabled={!this.isYesValid()}
            onClick={this.yesPress}
          >
            <p className="yes-button-text">Yes</p>
          </button>
          <button
            className="user-ticket-list-no-button"
            // disabled={!this.isYesValid()}
            onClick={this.noPress}
          >
            <p className="no-button-text">No</p>
          </button>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(addRequestMutation, { name: "addRequestMutation" }),
  graphql(getRequestsQuery, { name: "getRequestsQuery" })
)(TicketRow);
