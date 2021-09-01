// import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "./App.css";
// import {
//   ApolloProvider,
//   ApolloClient,
//   InMemoryCache,
//   createHttpLink,
// } from "@apollo/client";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";

// const httpLink = createHttpLink({
//   uri: "/graphql",
//   cache: new InMemoryCache()
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

// function App() {
//   return (
//     <ApolloProvider
//     client={client}
//     >
//       <Router>
//         <>
//           <p>app js</p>
//           <Navbar />
//           <Switch>
//             <Route exact path="/" component={Home} />
//             <Route exact path="/profile" component={Profile} />
//             <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
//           </Switch>
//         </>
//       </Router>
//     </ApolloProvider>
//   );
// }

// export default App;
