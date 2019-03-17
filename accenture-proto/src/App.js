import React, { Component } from "react";
import TicketList from "./components/TicketList";
import LoginPage from "./components/LoginPage";
import AddRequest from "./components/AddRequest";
import RequestDetail from "./components/RequestDetail";
import NavBar from "./components/NavBar";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuth: false
    };
    this.handleAuth = this.handleAuth.bind(this);
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

  render() {
    let navHeader = this.state.isAuth ? <NavBar /> : "";
    return (
      <ApolloProvider client={client}>
        {navHeader}
        <Router>
          <Switch>
            <PrivateRoute
              authed={this.state.isAuth}
              path="/requests"
              component={TicketList}
            />

            <Route
              exact
              path="/"
              render={props => (
                <LoginPage {...props} handleAuth={this.handleAuth} />
              )}
            />
            <Route exact path="/add" component={AddRequest} />
            <Route path="/requestDetail/:id" exact component={RequestDetail} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
