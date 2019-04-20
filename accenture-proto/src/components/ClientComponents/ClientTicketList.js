import React from "react";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
import "../../styles/ClientTicketList.css";

import arrow from "../../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

import ClientTicketRow from "./ClientTicketRow";
import CNavBar from "./CNavBar";
import CustomizedSnackbars from "../CustomizedSnackbars";
import CircularIndeterminate from "../CircularIndeterminate";
import ChatButton from "../MyChat/ChatButton";

import { graphql, compose } from "react-apollo";
import {
  getRequestsQuery,
  updateRequestStatusMutation
} from "../../queries/queries";

class ClientTicketList extends React.Component {
  constructor() {
    super();
    this.state = {
      checkboxAll: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  checkIfMore7Days = a => {
    let todayDate = new Date();

    let temp = a.split("-"); // 0 returns year, 1 returns month
    let temp2 = temp[2].split(" "); //0 returns date

    // console.log(today.getFullYear() >= temp[0]);
    // console.log(today.getMonth() + 1 >= temp[1]);
    // console.log(today.getDate() - 7 >= temp2[0]);
    let dateStr = (temp[1] + "/" + temp2[0] + "/" + temp[0]).toString();
    let oldDate = new Date(dateStr);
    // console.log(oldDate);

    let timeDiff = todayDate.getTime() - oldDate.getTime();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays >= 7;
  };

  displayRequests() {
    var data = this.props.getRequestsQuery;
    if (!data.loading) {
      let dataArr = Object.values(data.requests);
      dataArr.sort((a, b) =>
        a.subject > b.subject ? 1 : b.subject > a.subject ? -1 : 0
      ); //sort by subject, maybe time will be better

      // console.log(dataArr);
      //only show for joseph, may change this
      dataArr = dataArr.filter(request => {
        return request.user.firstName.toLowerCase() === "joseph";
      });

      //here we check if any requests has been unresolved for a week
      let checkArr = dataArr.filter(a => {
        return this.checkIfMore7Days(a.dateRequested) && a.status === "Open";
      });

      // console.log("old unresolved requests are");
      // console.log(checkArr);
      // console.log(checkArr.length);

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

      if (checkArr.length !== 0) {
        checkArr.map(a => {
          this.props.updateRequestStatusMutation({
            variables: {
              id: a.id,
              status: "Resolved",
              dateResolved: date
            }
          });
        });

        return 0;
      }

      return dataArr.map(request => {
        return (
          <ClientTicketRow
            id={request.id}
            userFirstName={request.user.firstName}
            asset={request.asset}
            type={request.type}
            subject={request.subject}
            dateRequested={request.dateRequested}
            dateResolved={request.dateResolved}
            dateClosed={request.dateClosed}
            priority={request.priority}
            status={request.status}
            assigned={request.assigned}
            key={request.id}
          />
        );
      });
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  handleClick = () => {
    console.log("clicked some button, go to next webpage");
  };

  handleCheckbox = event => {
    console.log("clicked checkbox");
    const { name, value, type, checked } = event.target;

    if (name === "checkboxAll") {
      this.setState({
        [name]: checked
      });
    }
  };

  render() {
    var showSnackbarCreate = false;
    if (typeof this.props.location.state !== "undefined") {
      if (this.props.location.state.createdTicket) {
        showSnackbarCreate = true;
      }
    }

    var showSnackbarDelete = false;
    if (typeof this.props.location.state !== "undefined") {
      if (this.props.location.state.deletedTicket) {
        showSnackbarDelete = true;
      }
    }

    let loading = true;
    if (!this.props.getRequestsQuery.loading) {
      loading = false;
    }

    return (
      <div>
        <CNavBar />
        <ChatButton />

        {showSnackbarDelete ? (
          <CustomizedSnackbars message="Request successfully deleted" />
        ) : null}

        {showSnackbarCreate ? (
          <CustomizedSnackbars message="Request successfully created" />
        ) : null}

        <section className="current-tickets">
          <div className="filter-text">
            <span>
              Filters
              <img src={arrow} className="arrow-right" alt="arrow" />
            </span>
          </div>
          <div className="sort-by-text">
            <span>
              Sort by: Date Requested
              <img src={arrow} className="arrow-down-datereq" alt="arrow" />
            </span>
          </div>
          <div className="filter-box request-list-header">
            <div className="col span-1-of-12">
              <input
                className="checkboxAll"
                type="checkbox"
                name="checkboxAll"
                checked={this.state.checkboxAll}
                onChange={this.handleCheckbox}
              />
            </div>
            <div className="col span-1-of-9">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Asset(s)</b>
              </h4>
            </div>
            <div className="col span-1-of-5">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Subject</b>
              </h4>
            </div>
            <div className="col span-1-of-7">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Date/Time Requested</b>
              </h4>
            </div>
            <div className="col span-1-of-7">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Date/Time Resolved</b>
              </h4>
            </div>
            <div className="col span-1-of-7">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Date/Time Closed</b>
              </h4>
            </div>
            <div className="col span-1-of-8">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Status</b>
              </h4>
            </div>
            <div className="col span-1-of-9">
              <h4 className="clientDetail" id="clientDetailHeading">
                <b>Close Request?</b>
              </h4>
            </div>
          </div>
          {/*end of bar, here we start displaying the data*/}
          {loading ? (
            <div className="CircularIndeterminate">
              <CircularIndeterminate />
            </div>
          ) : null}

          {this.displayRequests()}
        </section>
      </div>
    );
  }
}

export default compose(
  graphql(getRequestsQuery, { name: "getRequestsQuery" }),
  graphql(updateRequestStatusMutation, { name: "updateRequestStatusMutation" })
)(ClientTicketList);
