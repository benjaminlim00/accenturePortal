import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";

import editIcon from "../Resources/Icons/iconfinder_compose_3671747.svg";
import profileIcon from "../Resources/Icons/iconfinder_00-ELASTOFONT-STORE-READY_user-circle_2703062.svg";
import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

import TicketRow from "./TicketRow";
import NavBar from "./NavBar";
import CustomizedSnackbars from "./CustomizedSnackbars";
import CircularIndeterminate from "./CircularIndeterminate";

import { graphql, compose } from "react-apollo";
import { getRequestsQuery } from "../queries/queries";

class TicketList extends React.Component {
  constructor() {
    super();
    this.state = {
      checkbox: {
        checkboxAll: false,
        checkboxIcon1: false,
        checkboxIcon2: false,
        checkboxIcon3: false,
        checkboxIcon4: false,
        checkboxIcon5: false,
        checkboxIcon6: false,
        checkboxIcon7: false
      },
      data: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  displayRequests() {
    var data = this.props.getRequestsQuery;
    if (!data.loading) {
      // console.log(data.requests);

      let dataArr = Object.values(data.requests);
      dataArr.sort((a, b) =>
        a.user.firstName > b.user.firstName
          ? 1
          : b.user.firstName > a.user.firstName
          ? -1
          : 0
      );
      // console.log(arr);

      return dataArr.map(request => {
        return (
          <TicketRow
            id={request.id}
            userFirstName={request.user.firstName}
            asset={request.asset}
            type={request.type}
            subject={request.subject}
            dateRequested={request.dateRequested}
            dateResolved={request.dateResolved}
            priority={request.priority}
            status={request.status}
            assigned={request.assigned}
            //mainThread={request.mainThread} //dont need this on ticketList page
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
      if (checked === true) {
        this.setState({
          checkbox: {
            checkboxAll: true,
            checkboxIcon1: true,
            checkboxIcon2: true,
            checkboxIcon3: true,
            checkboxIcon4: true,
            checkboxIcon5: true,
            checkboxIcon6: true,
            checkboxIcon7: true
          }
        });
      } else {
        this.setState({
          checkbox: {
            checkboxAll: false,
            checkboxIcon1: false,
            checkboxIcon2: false,
            checkboxIcon3: false,
            checkboxIcon4: false,
            checkboxIcon5: false,
            checkboxIcon6: false,
            checkboxIcon7: false
          }
        });
      }
    } else {
      type === "checkbox"
        ? this.setState(prevState => {
            return {
              checkbox: {
                ...prevState.checkbox,
                [name]: checked
              }
            };
          })
        : this.setState({ [name]: value });
    }
  };

  render() {
    /*
    if (performance.navigation.type == 1) {
      console.info("This page is reloaded, lets pop a snackbar");
      var showSnackbar = true;
    } else {
      console.info("This page is not reloaded");
      var showSnackbar = false;
    }
    */
    // console.log(this.props.location.state);

    var showSnackbarCreate = false;
    if (typeof this.props.location.state !== "undefined") {
      if (this.props.location.state.createdTicket) {
        var showSnackbarCreate = true;
      }
    }

    var showSnackbarDelete = false;
    if (typeof this.props.location.state !== "undefined") {
      if (this.props.location.state.deletedTicket) {
        var showSnackbarDelete = true;
      }
    }

    let loading = true;
    if (!this.props.getRequestsQuery.loading) {
      loading = false;
    }
    // console.log(loading);

    return (
      <div>
        <NavBar />

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
              <img src={arrow} className="arrow-right" />
            </span>
          </div>
          <div className="sort-by-text">
            <span>
              Sort by: Date Requested
              <img src={arrow} className="arrow-down-datereq" />
            </span>
          </div>
          <div className="filter-box request-list-header">
            <div className="col span-1-of-12">
              <input
                className="checkboxAll"
                type="checkbox"
                name="checkboxAll"
                checked={this.state.checkbox.checkboxAll}
                onChange={this.handleCheckbox}
              />
            </div>
            <div className="col span-1-of-10">
              <h4 className="detail" id="detailHeading">
                <b>Requester</b>
              </h4>
            </div>
            <div className="col span-1-of-9">
              <h4 className="detail" id="detailHeading">
                <b>Asset(s)</b>
              </h4>
            </div>
            <div className="col span-1-of-5" id="subject">
              <h4 className="detail" id="detailHeading">
                <b>Subject</b>
              </h4>
            </div>
            <div className="col span-1-of-6">
              <h4 className="detail" id="detailHeading">
                <b>Date/Time Requested</b>
              </h4>
            </div>
            <div className="col span-1-of-6">
              <h4 className="detail" id="detailHeading">
                <b>Date/Time Resolved</b>
              </h4>
            </div>
            <div className="col span-1-of-10">
              <h4 className="detail" id="detailHeading">
                <b>Priority</b>
              </h4>
            </div>
            <div className="col span-1-of-9">
              <h4 className="detail" id="detailHeading">
                <b>Status</b>
              </h4>
            </div>
            <div className="col span-1-of-8">
              <h4 className="detail" id="detailHeading">
                <b>Assigned To</b>
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
export default compose(graphql(getRequestsQuery, { name: "getRequestsQuery" }))(
  TicketList
);
