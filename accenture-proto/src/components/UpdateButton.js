import React from "react";
import { Mutation } from "react-apollo";
import { graphql, compose } from "react-apollo";
import { Redirect } from "react-router-dom";

import {
  getRequestsQuery,
  deleteRequestMutation,
  addRequestMutation
} from "../queries/queries";

class UpdateButton extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRedirect() {
    this.setState({
      redirect: true
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
      this.props.addRequestMutation({
        variables: {
          asset: dataArr.asset,
          type: dataArr.type,
          subject: dataArr.subject,
          dateRequested: dataArr.dateRequested,
          priority: dataArr.priority,
          status: dataArr.status,
          assigned: propsText,
          dateResolved: dataArr.dateResolved,
          dateClosed: dataArr.dateClosed,
          mainThread: dataArr.mainThread,
          requesterId: dataArr.user.id //added
        }
      });
    } else {
      this.props.addRequestMutation({
        variables: {
          asset: dataArr.asset,
          type: dataArr.type,
          subject: dataArr.subject,
          dateRequested: dataArr.dateRequested,
          priority: dataArr.priority,
          status: propsText,
          assigned: dataArr.assigned,
          dateResolved: dataArr.dateResolved,
          dateClosed: dataArr.dateClosed,
          mainThread: dataArr.mainThread,
          requesterId: dataArr.user.id //added
        }
      });
    }
    // console.log("Data sent! Redirecting page");
  }

  render() {
    let id = this.props.idd;
    if (this.state.redirect) {
      // return <Redirect to="/requests" />;
      window.location.reload();
    }
    return (
      <Mutation
        mutation={deleteRequestMutation}
        update={(cache, { data: { deleteRequest } }) => {
          const { requests } = cache.readQuery({ query: getRequestsQuery });
          cache.writeQuery({
            query: getRequestsQuery,
            data: { requests: requests.filter(e => e.id !== id) }
          });
        }}
      >
        {(deleteRequest, { data }) => (
          <button
            id="transparentButtonVer2"
            style={this.props.style}
            onClick={e => {
              this.handleSubmit();
              deleteRequest({
                variables: {
                  id
                }
              });
              this.handleRedirect();
            }}
          >
            {this.props.text}
          </button>
        )}
      </Mutation>
    );
  }
}

export default compose(
  graphql(addRequestMutation, { name: "addRequestMutation" }),
  graphql(getRequestsQuery, { name: "getRequestsQuery" })
)(UpdateButton);
