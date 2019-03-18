import React, { Component } from "react";
import TicketList from "./components/TicketList";
import LoginPage from "./components/LoginPage";
import AddRequestNew from "./components/AddRequestNew";
import AddRequestOld from "./components/AddRequestOld";
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
    // let navHeader = this.state.isAuth ? <NavBar /> : "";
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/requests" component={TicketList} />
            <Route
              exact
              path="/"
              render={props => (
                <LoginPage {...props} handleAuth={this.handleAuth} />
              )}
            />
            <Route exact path="/addnew" component={AddRequestNew} />
            <Route exact path="/addold" component={AddRequestOld} />
            <Route exact path="/requestDetail/:id" component={RequestDetail} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
