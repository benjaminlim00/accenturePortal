import React, { Component } from "react";
import TicketList from "./components/TicketList";
import LoginPage from "./components/LoginPage";
import RequestDetail from "./components/RequestDetail";
import NavBar from "./components/NavBar";
import CreateTicket from "./components/CreateTicket";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuth: false,
      updatedTicket: false,
      createdTicket: false,
      deletedTicket: false
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.toggleUpdatedTicket = this.toggleUpdatedTicket.bind(this);
    this.toggleCreatedTicket = this.toggleCreatedTicket.bind(this);
    this.toggleDeletedTicket = this.toggleDeletedTicket.bind(this);
  }

  handleAuth() {
    if (this.state.isAuth) {
      this.setState({
        isAuth: false
      });
    } else {
      this.setState({
        isAuth: true
      });
    }
  }

  toggleUpdatedTicket() {
    let bool = this.state.updatedTicket;
    this.setState({
      updatedTicket: !bool
    });
  }

  toggleCreatedTicket() {
    let bool = this.state.updatedTicket;
    this.setState({
      createdTicket: !bool
    });
  }
  toggleDeletedTicket() {
    let bool = this.state.updatedTicket;
    this.setState({
      deletedTicket: !bool
    });
  }

  render() {
    // let navHeader = this.state.isAuth ? <NavBar /> : "";
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route
              exact
              path="/requests"
              render={props => (
                <TicketList
                  {...props}
                  toggleUpdatedTicket={this.toggleUpdatedTicket}
                  state={this.state}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={props => (
                <LoginPage {...props} handleAuth={this.handleAuth} />
              )}
            />
            <Route
              exact
              path="/createTicket"
              component={CreateTicket}
              toggleCreatedTicket={this.toggleCreatedTicket}
            />
            <Route
              exact
              path="/requestDetail/:id"
              component={RequestDetail}
              toggleDeletedTicket={this.toggleDeletedTicket}
            />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
