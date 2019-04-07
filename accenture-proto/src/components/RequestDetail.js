import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";
import "../styles/RequestDetail.css";
import TicketProperties from "./TicketProperties";
import TrashModal from "./TrashModal";
import NavBar from "./NavBar";

import profileIcon from "../Resources/Icons/iconfinder_00-ELASTOFONT-STORE-READY_user-circle_2703062.svg";
import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";
import trash from "../Resources/Icons/iconfinder_25_2135797.svg";
import replyArrow from "../Resources/Icons/iconfinder_reply_226602.svg";
import fileLogo from "../Resources/Icons/iconfinder_ic_attach_file_48px_352032.svg";

import { Link } from "react-router-dom";

import { graphql, compose } from "react-apollo";
import { getThreadsQuery, getRequestsQuery } from "../queries/queries";
import ThreadBlock from "./RequestDetailComponents/ThreadBlock";
import MainThread from "./RequestDetailComponents/MainThread";
import ContactDetails from "./RequestDetailComponents/ContactDetails";
import CreateThread from "./RequestDetailComponents/CreateThread";

class RequestDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  displayCreateThread() {
    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      let pageId = window.location.pathname.substring(15);
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });

      dataArr = dataArr[0];
      return <CreateThread requestId={dataArr.id} />;
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  displayContactDetails() {
    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      let pageId = window.location.pathname.substring(15);
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });

      dataArr = dataArr[0];
      console.log(dataArr); // here is data of the request.

      return (
        <ContactDetails
          firstName={dataArr.user.firstName}
          lastName={dataArr.user.lastName}
          email={dataArr.user.email}
          contactNumber={dataArr.user.contactNumber}
          accountType={dataArr.user.accountType}
        />
      );
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  displayMainThread() {
    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      let pageId = window.location.pathname.substring(15);
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });
      dataArr = dataArr[0];
      // console.log(dataArr);

      return (
        <MainThread
          mainThread={dataArr.mainThread}
          subject={dataArr.subject}
          dateRequested={dataArr.dateRequested}
          creatorFirstName={dataArr.user.firstName}
          creatorLastName={dataArr.user.lastName}
        />
      );
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  //function to display list of threads
  displayThreads() {
    var data = this.props.getRequestsQuery;
    //console.log('threads check');
    //console.log(data.threads);

    var dataArr;
    if (!data.loading) {
      let pageId = window.location.pathname.substring(15);
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });
      dataArr = dataArr[0];

      console.log(data.threads);
      return (
        <ThreadBlock
          id={dataArr.id}
          key={dataArr.id}
          threads={dataArr.threads}
        />
      );
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  //function to display ticket properties
  displayData() {
    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      let pageId = window.location.pathname.substring(15);
      // console.log(data.requests);  all the different data with diff ids
      // console.log(this.state.id); the current id

      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });

      dataArr = dataArr[0];
      console.log(dataArr); // here is data of the request.

      return (
        <TicketProperties
          id={dataArr.id}
          asset={dataArr.asset}
          type={dataArr.type}
          priority={dataArr.priority}
          assigned={dataArr.assigned}
          status={dataArr.status}
          dateRequested={dataArr.dateRequested}
          dateResolved={dataArr.dateResolved}
          dateClosed={dataArr.dateClosed}
        />
      );
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const modalTextMargin = {
      marginTop: "10px",
      marginLeft: "20px"
    };

    return (
      <div>
        <NavBar />

        <section className="ticket-enquiry-section">
          <div className="back-to-tickets-section">
            <button type="button" id="transparentButton">
              <Link to="/requests">
                <img src={arrow} className="arrow-left-new" />
              </Link>
            </button>

            <h3 className="back-to-tickets-text">Back to Tickets</h3>

            <img src="" className="settings" />

            <TrashModal show={this.state.show} handleBack={this.hideModal}>
              <h3 style={modalTextMargin}>
                Are you sure you would like to delete this request?
              </h3>
              <br />
              <br />
              <p className="error-textVerModal">
                This action cannot be reversed
              </p>
            </TrashModal>

            <button
              type="button"
              id="transparentButton"
              onClick={this.showModal}
              className="trash"
            >
              <img src={trash} className="trash" />
            </button>
            <img src={arrow} className="arrow-right-new" />
            <img src={arrow} className="arrow-left-new-2" />
            <p className="page-no">1 out of 100</p>
          </div>

          <div className="enquiry-section">
            <div className="add-col internal-scrolling">
              {this.displayMainThread()}

              {this.displayThreads()}

              {this.displayCreateThread()}
            </div>
            <div className="quarter-col text-boxes internal-scrolling">
              {this.displayContactDetails()}

              {this.displayData()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default compose(graphql(getRequestsQuery, { name: "getRequestsQuery" }))(
  RequestDetail
);
