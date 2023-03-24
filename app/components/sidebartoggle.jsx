import React from "react";

const SidebarToggle = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="min-h-full items-center justify-center ">
      <div className="h-full font-bold   items-center justify-center  flex">
        <span
          onClick={() => setSidebarOpen(sidebarOpen ? false : true)}
          className="shadow-lg shadow-slate-400 bg-gray-100  text-sm text-gray-600 w-6 h-12 flex justify-center items-center rounded-r-md cursor-pointer select-none"
        >
          {sidebarOpen == true ? <>{"<"}</> : <>{">"}</>}
        </span>
      </div>
    </div>
  );
};

export default SidebarToggle;
