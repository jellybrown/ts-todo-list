import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";

const GlobalStyle = createGlobalStyle`
  body {
    background: #eeeeee;
  }
  .ant-btn-primary {
    background: #119955 !important;
    border-color: #119955 !important;
    opacity: 0.8;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
