import React from "react";
import LeftSidebar from "./LeftSidebar";
import Navbar from "./navbar";
const Home = (props:any) => {
  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-7">
          <div className="col-start-1 col-span-7">
            <Navbar />
          </div>
          <div className=" col-span-1">
            <LeftSidebar />
          </div>
          <div className=" col-span-6">
          {props.content && props.content}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
