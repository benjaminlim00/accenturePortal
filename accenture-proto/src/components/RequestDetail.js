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
import { getRequestsQuery } from "../queries/queries";

class RequestDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

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
            <div className="add-col">
              <div className="text-boxes">
                <div className="enquiry-head">
                  <h4 className="small-heading enquiry-title">
                    Enquiry about API
                  </h4>
                  <p className="timing">About an hour ago</p>
                  <p className="author">Created by: Jane Lim</p>
                </div>
                <div className="enquiry-body">
                  <p>
                    Hi,
                    <br />
                    <br /> I would like to enquire about the XXX API.
                    <br />
                    <br /> Thanks, <br />
                    James
                  </p>
                </div>
              </div>
              <div className="reply-thread">
                <div className="enquiry-head-reply">
                  <div className="reply-attach">
                    <img src={replyArrow} className="reply-arrow-new-2" />
                  </div>
                  <div className="from-to">
                    <div className="border-from-to">
                      <p className="recipient">From: John Tan</p>
                      <p>To: Jane Lim</p>
                    </div>
                  </div>
                </div>
                <p className="enquiry-body"> hi</p>
                <div className="enquiry-head">
                  <img src={fileLogo} className="file-logo-reqdetail" />
                  <p className="attach-file-words">Attach</p>
                  <div className="cancel-button">
                    <p className="cancel">Cancel</p>
                  </div>
                  <div className="send-button-detailspage">
                    <p className="send-req-details">Send</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="quarter-col text-boxes">
              <div className="combined-contact-past-ticket-details">
                <div className="contact-details">
                  <h2 className="small-heading contact-property">
                    Contact Details
                  </h2>
                  <img src={arrow} className="arrow-up-new" />

                  <h5 className="type-of-details">Requester</h5>
                  <p className="detail-req">Jane Lim</p>

                  <h5 className="type-of-details">Email</h5>
                  <p className="detail-req">test@accenture.com</p>

                  <h5 className="type-of-details">Mobile Number</h5>
                  <p className="detail-req">+65 91235678</p>

                  <h5 className="type-of-details">Company</h5>
                  <p className="detail-req">Accenture</p>
                </div>
              </div>
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
