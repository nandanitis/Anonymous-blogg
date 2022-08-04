import "./Write.css";
import React, { useEffect, useState } from "react";

import Dapp from "../contracts/Dapp.json";
import getWeb3 from "../getWeb3";

const Write = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [sections, setSections] = useState([]);


 const [title, setTitle] = useState("");
 const [blog, setBlog] = useState("");

  const write = async (event) => {
    event.preventDefault();
    var e = document.getElementById("fileInput");
    var strUser = e.value;

    if(title!=='' && blog!=='' && e.value!=="Choose Your Intrest" ){
      console.log("hi");  
      contract.methods.EnterBlogDetails(title,blog,account,strUser).send({ from: account });
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
    async function fetchMyAPI() {
      const web3 = await getWeb3();
      await loadweb3Account(web3);
      const contract = await loadWeb3Contract(web3);
      await loadUsers(contract);
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm">
        <div className="writeFormGroup">
          <select id="fileInput" className="form-select  ">
            <option selected>Choose Your Intrest</option>
            {sections.map((section, key) => (
              <option key={key} value={section}>{section}</option>
            ))}
          </select>

          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setBlog(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit" onClick={write}>
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
