import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Dapp from "./contracts/Dapp.json";
import getWeb3 from "./getWeb3";

import { useMoralis } from "react-moralis";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sections from "./pages/Sections";
import Write from "./pages/Write";
import Profile from "./pages/Profile";
import Rightbar from "./components/Rightbar";
import ParBlog from "./pages/ParBlog";



function App() {
  const { authenticate, isAuthenticated, user, account } = useMoralis();
  const [contract, setContract] = useState(null);
  const [accountNow, setAccount] = useState("");
  const [avatar, setAvatar] = useState(false);
  const [users, setusers] = useState([]);


  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log(user.get("ethAddress"));
          setusers(user.get("ethAddress"));
          
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const loadUsers = async (contract) => {
    let totalSupply = await contract.methods.getAllLogin().call();
    totalSupply = totalSupply.map((element) => {
      return element.toLowerCase();
    });
    console.log(totalSupply);
    setusers(totalSupply);
  };

  const loadweb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      setAccount(accounts[0]);
    }
  };

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = Dapp.networks[networkId];
    if (networkData) {
      const abi = Dapp.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    }
  };

  useEffect(() => {
    async function fetchMyAPI() {
      const web3 = await getWeb3();
      await loadweb3Account(web3);
      const contract = await loadWeb3Contract(web3);
      await loadUsers(contract);
    }
    fetchMyAPI();
  } );

  return (
    <div>
      {isAuthenticated ? (
        
        <div className="App">
          <div className="sideBar">
            <Navbar />
          </div>
          <div className="flexMain">
            <div className="left">
              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route
                  path="/Sections"
                  element={<Sections />}
                >
                  
                </Route>
                <Route path="/Write" element={<Write />}></Route>
                <Route path="/Profile" element={<Profile />}></Route>
                <Route path="/Sections/:sec" element={<ParBlog />}></Route>
              </Routes>
            </div>
            <div className="right">
              <Rightbar />
            </div>
          </div>
        </div>
        
      ) : (
        <div className="unAuth">
          <img src="boredApp.jpg" alt="logo" height="200px" />
          <button className=" btn btn-dark loginButton " onClick={login}>
            🦊Metamask Login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
