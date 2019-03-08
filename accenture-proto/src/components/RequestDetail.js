import React from "react";
import "../styles/App.css";
import "../styles/grid.css";
import "../styles/normalize.css";
import "../styles/RequestDetail.css";

import profileIcon from "../Resources/Icons/iconfinder_00-ELASTOFONT-STORE-READY_user-circle_2703062.svg";
import arrow from "../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";
import trash from "../Resources/Icons/iconfinder_25_2135797.svg";
import replyArrow from "../Resources/Icons/iconfinder_reply_226602.svg";
import fileLogo from "../Resources/Icons/iconfinder_ic_attach_file_48px_352032.svg";

import { graphql, compose } from "react-apollo";
import { getRequestsQuery } from "../queries/queries";

class RequestDetail extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <h2 className="all-tickets">All Tickets</h2>
          <img src={profileIcon} className="user-icon" />
        </div>

        <section className="ticket-enquiry-section">
          <div className="back-to-tickets-section">
            <img src={arrow} className="arrow-left-new" />
            <h3 className="back-to-tickets-text">Back to Tickets</h3>
            <img src="" className="settings" />
            <img src={trash} className="trash" />
            <img src={arrow} className="arrow-right-new" />
            <img src={arrow} className="arrow-left-new-2" />
            <p className="page-no">1 out of 100</p>
          </div>

          <div className="enquiry-section">
            <div className="col span-1-of-2 text-boxes">
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
                <div className="reply-button">
                  <img src={replyArrow} className="reply-arrow" />
                  Reply
                </div>
              </div>
            </div>

            <div className="col span-1-of-4 text-boxes">
              <div className="properties">
                <h2 className="small-heading">Ticket Properties</h2>
                <div className="grid-row">
                  <p className="property">Ticket ID</p>
                  <p className="property">Asset(s)</p>
                  <p className="property">Type</p>
                  <p className="property">Priority</p>

                  <div className="special-property">
                    <p>Assigned</p>
                    <img src={arrow} className="arrow-down" />
                  </div>
                  <div className="special-property">
                    <p>Status</p>
                    <img src={arrow} className="arrow-down" />
                  </div>
                  <p className="property">Date/Time Requested</p>
                  <p className="property">Date/Time Resolved</p>
                  <p className="property">Date/Time Closed</p>
                </div>
              </div>
            </div>

            <div className="col span-1-of-4 text-boxes">
              <div className="combined-contact-past-ticket-details">
                <div className="contact-details">
                  <h5 className="small-heading">Contact Details</h5>

                  <h5 className="type-of-details">Requester</h5>
                  <p className="detail">Jane Lim</p>

                  <h5 className="type-of-details">Email</h5>
                  <p className="detail">test@accenture.com</p>

                  <h5 className="type-of-details">Mobile Number</h5>
                  <p className="detail">+65 91235678</p>

                  <h5 className="type-of-details">Company</h5>
                  <p className="detail">Accenture</p>
                </div>
              </div>
              <div className="past-ticket-head">
                <h2 className="small-heading">Past Ticket / Conversations</h2>
              </div>
              <div className="first-past-enquiry">
                <p className="ticket-id">#ticket-id</p>
                <h5 className="type-of-details">API Service Enquiry</h5>
                <h2 className="smaller-head">Login API</h2>
                <p className="past-ticket-body">xxxxxxxxx</p>
                <br />
                <p className="date">Created 2 days ago</p>
                <p className="status">Resolved</p>
              </div>
              <div className="first-past-enquiry">
                <p className="ticket-id">#ticket-id</p>
                <h5 className="type-of-details">subject</h5>
                <h2 className="smaller-head">Asset</h2>
                <p className="past-ticket-body">xxxxxxxxx</p>
                <br />
                <p className="date">Date requested</p>
                <p className="status">Status</p>
              </div>
              <div className="first-past-enquiry">
                <p className="ticket-id">#1925</p>
                <h5 className="type-of-details">Not Working</h5>
                <h2 className="smaller-head">Login API</h2>
                <p className="past-ticket-body">xxxxxxxxx</p>
                <br />
                <p className="date">Created 5 days ago</p>
                <p className="status">Open</p>
              </div>
            </div>
          </div>
          <div className="enquiry-section">
            <div className="col span-1-of-2 text-boxes">
              <div className="enquiry-head-reply">
                <div className="reply-attach">
                  <img src={arrow} className="reply-arrow-2" />
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
                <img src={fileLogo} className="file-logo" />
                <p className="attach-file">Attach</p>
                <div className="cancel-button">
                  <p className="cancel">Cancel</p>
                </div>
                <div className="send-button">
                  <p className="send">Send</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default RequestDetail;
