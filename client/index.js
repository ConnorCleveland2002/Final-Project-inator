import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from './App';
import reportWebVitals from "./src/reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  console.log("client index rendered")
);

reportWebVitals();
