import React, { Component } from "react";
import TicketList from "./components/TicketList";
import LoginPage from "./components/LoginPage";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/requests/" component={TicketList} />
            <Route exact path="/" component={LoginPage} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
