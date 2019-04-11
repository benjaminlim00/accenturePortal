import React from "react";
import { graphql, compose } from "react-apollo";
import { Redirect } from "react-router-dom";

import {
  getRequestsQuery,
  addRequestMutation,
  updateRequestStatusMutation,
  updateRequestAssignedMutation
} from "../queries/queries";

import CustomizedSnackbars from "./CustomizedSnackbars";

class UpdateButton extends React.Component {
  constructor() {
    super();
    this.state = {
      // redirect: false
      showSnackbarUpdate: false
    };
    // this.handleRedirect = this.handleRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSnackbarUpdate = this.toggleSnackbarUpdate.bind(this);
  }

  // handleRedirect() {
  //   this.setState({
  //     redirect: true
  //   });
  // }

  toggleSnackbarUpdate() {
    this.setState({
      showSnackbarUpdate: !this.state.showSnackbarUpdate
    });
  }

  retreiveData() {
    var data = this.props.getRequestsQuery;
    var dataArr;
    if (!data.loading) {
      // let pageId = window.location.pathname.substring(15);
      let pageId = this.props.idd;
      dataArr = data.requests.filter(request => {
        return request.id === pageId;
      });
      dataArr = dataArr[0];
      // console.log(dataArr); // here is data of the request.
      return dataArr;
    } else {
      console.log("still retreiving data from mongoDB");
    }
  }

  handleSubmit(e) {
    let dataArr = this.retreiveData();
    let propsText = this.props.text;
    // console.log(dataArr);
    // console.log(dataArr.user.id);
    if (this.props.logic === "assigned") {
      this.props.updateRequestAssignedMutation({
        variables: {
          id: dataArr.id,
          assigned: propsText
        }
      });
    } else {
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

      // console.log(dataArr);

      if (propsText === "Open") {
        //clear the date resolved field
        this.props.updateRequestStatusMutation({
          variables: {
            id: dataArr.id,
            status: propsText,
            dateResolved: ""
          }
        });
      } else {
        this.props.updateRequestStatusMutation({
          variables: {
            id: dataArr.id,
            status: propsText,
            dateResolved: date
          }
        });
      }
    }
    // console.log("Data sent! Redirecting page");
  }

  render() {
    let showSnackbarUpdate = this.state.showSnackbarUpdate;

    // let id = this.props.idd;
    // if (this.state.redirect) {
    //   // return <Redirect to="/requests" />;
    //   setTimeout(function() {
    //     window.location.reload();
    //   }, 500);
    // }
    // if (this.state.redirect) {
    //   // return <Redirect to="/requests" />;
    //   if (this.props.isClient) {
    //     return (
    //       <Redirect
    //         to={{
    //           pathname: "/crequests",
    //           state: { updatedTicket: true }
    //         }}
    //       />
    //     );
    //   }
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/requests",
    //         state: { updatedTicket: true }
    //       }}
    //     />
    //   );
    // }
    //
    //
    return (
      <div>
        {showSnackbarUpdate ? (
          <CustomizedSnackbars message="Request successfully updated" />
        ) : null}
        <button
          id="transparentButtonVer2"
          style={this.props.style}
          onClick={e => {
            this.handleSubmit();
            this.toggleSnackbarUpdate();
            //this.handleRedirect(); //updates without refreshing, can take away this
          }}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default compose(
  graphql(addRequestMutation, { name: "addRequestMutation" }),
  graphql(getRequestsQuery, { name: "getRequestsQuery" }),
  graphql(updateRequestStatusMutation, { name: "updateRequestStatusMutation" }),
  graphql(updateRequestAssignedMutation, {
    name: "updateRequestAssignedMutation"
  })
)(UpdateButton);
