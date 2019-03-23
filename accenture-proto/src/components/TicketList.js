import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";

import editIcon from "../Resources/Icons/iconfinder_compose_3671747.svg";
import profileIcon from "../Resources/Icons/iconfinder_00-ELASTOFONT-STORE-READY_user-circle_2703062.svg";
import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

import TicketRow from "./TicketRow";
import NavBar from "./NavBar";

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
      console.log(data.requests);
      return data.requests.map(request => {
        return (
          <TicketRow
            id={request.id}
            requester={request.requester}
            asset={request.asset}
            type={request.type}
            subject={request.subject}
            dateRequested={request.dateRequested}
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
    return (
      <div>
        <NavBar />
        <div className="row">
          <h2 className="small-heading">All Tickets</h2>
          <img src={profileIcon} className="user-icon" />
        </div>
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
            <div className="col span-1-of-9">
              <h4 className="detail">Requester</h4>
            </div>
            <div className="col span-1-of-9">
              <h4 className="detail">Asset(s)</h4>
            </div>
            <div className="col span-1-of-9">
              <h4 className="detail">Type</h4>
            </div>
            <div className="col span-1-of-4">
              <h4 className="detail">Subject</h4>
            </div>
            <div className="col span-1-of-6">
              <h4 className="detail">Date/Time Requested</h4>
            </div>
            <div className="col span-1-of-9">
              <h4 className="detail">Priority</h4>
            </div>
            <div className="col span-1-of-9">
              <h4 className="detail">Status</h4>
            </div>
            <div className="col span-1-of-9">
              <h4 className="detail">Assigned To</h4>
            </div>
          </div>
          {/*end of bar, here we start displaying the data*/}
          {this.displayRequests()}
        </section>
      </div>
    );
  }
}
export default compose(graphql(getRequestsQuery, { name: "getRequestsQuery" }))(
  TicketList
);
