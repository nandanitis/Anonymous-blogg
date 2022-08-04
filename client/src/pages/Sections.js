import React, { useEffect, useState } from "react";
import "./Section.css";
import { Input } from "web3uikit";

import Dapp from "../contracts/Dapp.json";
import getWeb3 from "../getWeb3";

import { BrowserRouter as Router,  Link } from "react-router-dom";

import Jquery from 'jquery';
import { useHistory } from 'react-router'



const Sections = () => {


  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [sections, setSections] = useState([]);
  const [secName, setSecName] = useState("");

  const[refresh,setRefresh] = useState(true);


  const candi = async () => {
    let owner = await contract.methods.owner().call();
    console.log(owner);
    if (owner !== account) {
      document.getElementById("ErrorMessage").innerHTML =
        "Oops! You are not the owner of Smart Contract";
      setTimeout(function () {
        document.getElementById("ErrorMessage").innerHTML = "";
      }, 3000);
    } else {
      contract.methods.addsection(secName).send({ from: account });
    }
  };

  function reverseArr(input) {
    var ret = new Array();
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }

  const loadUsers = async (contract) => {
    
    let totalSupply = await contract.methods.getAllSections().call();
    var b = reverseArr(totalSupply);
    setSections(b);
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
  
  const loadweb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      setAccount(accounts[0]);
    }
  };


  useEffect(() => {
    const  fetchMyAPI = async() => {
      const web3 = await getWeb3();
      await loadweb3Account(web3);
      const contract = await loadWeb3Contract(web3);
      await loadUsers(contract);
  
    }

    fetchMyAPI();
  },[]);
  



  return (
    <div>
      {/* <div className="headingSection">Different Sections :</div> */}

      <div className="sectionFlex">
        <div className="enterSectionName sectionFlexItems">
          Make A New Section :
        </div>
        <div className="inputSection sectionFlexItems">
          <Input
            label="Add"
            name="text"
            onChange={(e) => setSecName(e.target.value)}
          ></Input>
        </div>
        <div className="btn btn-outline-dark" onClick={candi}>
          Make
        </div>
      </div>
      <div id="ErrorMessage"></div>

      <div id="refresh">

      {sections.map((section, key) => (
        <div className="blog-preview" key={key}>
        <Link className="Link" to={`/Sections/${section}`}>
          <h2>{section}</h2>
          <p>Number of Blogs : 0</p>
        </Link>
        </div>
      ))}
      </div>

    </div>
  );
};

export default Sections;
