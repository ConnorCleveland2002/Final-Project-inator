import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import {
  ApolloProvider,
  // ApolloClient,
  // InMemoryCache,
  // createHttpLink,
} from "@apollo/client";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Account from "./pages/Account";

// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

// const client = new ApolloClient({
//   request: (operation) => {
//     const token = localStorage.getItem("id_token");

//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : "",
//       },
//     });
//   },
//   uri: "/graphql",
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

function App() {
  console.log("App.js rendered");
  return (
    <ApolloProvider
    // client={client}
    >
      <Router>
        <>
          <p>app js</p>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/account" component={Account} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
