import React from "react";
import UserSection from "../components/usersection";
import Link from "next/link";
const Sidebar = ({
  sidebarOpen,
  setCreateModalOpen,
  setForm,
  forms,
  user,
  handleFormSelect,
  logout,
}) => {
  return (
    <nav
      className={
        sidebarOpen
          ? "flex flex-col lg:w-64 w-[50%] bg-gray-100 border-r border-gray-200 transition-all shadow-lg shadow-slate-400 min-h-screen"
          : "w-0 transition-all "
      }
    >
      <div className="flex flex-col h-screen overflow-scroll">
        {/* Create section */}
        <div className={sidebarOpen ? "" : "hidden"}>
          <Link
            href="/"
            className=" text-2xl z-1 p-4 items-center flex text-left font-bold  bg-white focus:outline-none cursor-pointer"
          >
            FormHub
          </Link>

          <button
            onClick={() => {
              setCreateModalOpen(true);
            }}
            className="w-full p-4 text-left font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none "
          >
            + Create
          </button>

          {/* Form section */}
          <div
            className="p-4 text-left font-bold text-white bg-gray-900 focus:outline-none cursor-pointer"
            onClick={() => {
              setForm("");
            }}
          >
            Forms
          </div>

          <div className="flex-grow overflow-y-scroll">
            {forms?.map((form) => (
              <div key={form.id} className="border-b border-gray-200 ">
                <button
                  onClick={() => handleFormSelect(form)}
                  className={` p-4 w-full text-black text-left  hover:bg-neutral-200 focus:outline-none `}
                >
                  {form.data.formName}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* User section */}
        <div className="mt-auto">
          <UserSection user={user} logout={logout}></UserSection>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
