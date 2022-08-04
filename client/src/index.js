import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createRoot } from 'react-dom/client';


import { MoralisProvider } from "react-moralis";
import {BrowserRouter as Router} from 'react-router-dom';
import { HashRouter } from "react-router-dom";

// npm install moralis react-moralis
// npm i react-router-dom
// npm install react-bootstrap bootstrap

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    
      <MoralisProvider
        serverUrl="https://ou3dcaq8q5rg.usemoralis.com:2053/server"
        appId="q0aOwmiibVwcrr7eFnHxADv6CX4cBET4tv0bng3T"
      >
        <Router>
          <App />
        </Router>
      </MoralisProvider>
  </React.StrictMode>
);
