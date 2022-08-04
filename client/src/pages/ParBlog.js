import React, { useEffect, useState } from "react";

import Dapp from "../contracts/Dapp.json";
import getWeb3 from "../getWeb3";

import "./ParBlog.css"; 

import { useParams } from "react-router-dom";

const ParBlog = () => {
  const { sec } = useParams();
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = async (contract) => {
    let totalSupply = await contract.methods.getAllBlogs().call();
    console.log(totalSupply);
    setBlogs(totalSupply);
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
    const fetchMyAPI = async () => {
      const web3 = await getWeb3();
      await loadweb3Account(web3);
      const contract = await loadWeb3Contract(web3);
      await loadBlogs(contract);
    };

    fetchMyAPI();
  }, []);

  return (
    <div>
      <h2 className="headingBlog">{sec}</h2>
        {blogs.map((blog, key) => {
          if (blog[4] === sec){ 
            return (
            <div className="blog-preview" key={key}>
              <h2>Title : {blog[0]}</h2>
              <p>{blog[1]}</p>
            </div>
          )}
        })}
    </div>
  );
};

export default ParBlog;
