import React, { useLayoutEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
//import Content from "../Content/Content";
import TopNav from "../../components/TopNav/TopNav";
import "./DefaultLayout.scss";


function DefaultLayout({ children }) {
  return (
    <div className="default-layout">
    
      {/* Same as */}
      <div className="side-bar">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="nav-bar">
          <TopNav />
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
