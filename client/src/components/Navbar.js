import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router,  Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

  const { logout } = useMoralis();

  const logOut = async () => {
    await logout();
    //window.location.reload(false);
        console.log("logged out");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarCollapse">

            <div className="navbar-nav  mx-auto">
                  <a className="nav-item nav-link">Logo</a>
            </div>
          
          
            <div className="navbar-nav mx-auto middleNav px-5">
            
              
               <Link className="nav-item nav-link active hoverNav " to="/">Home</Link>
               <a className="nav-item nav-link active hoverNav " href="/Sections">Blogs</a>
               <a className="nav-item nav-link active hoverNav" href="/Write">Write</a>
               <Link className="nav-item nav-link active hoverNav" to="/Profile">Profile</Link>
         
            </div>
           
            <div className="navbar-nav ms-auto">
            <Link to="/">
              <button  className="btn btn-primary" onClick={logOut}>Logout</button>
            </Link>
            </div>
          
          </div>
        </div>
      </nav>
      <div>
        <h1></h1>
      </div>
    </div>
  );
};

export default Navbar;
