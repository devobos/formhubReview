import React from "react";
import { useState } from "react";
import UserSection from "./usersection";
import Link from "next/link";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
const Sidebar = ({
  sidebarOpen,
  setCreateModalOpen,
  setForm,
  forms,
  setForms,
  user,
  handleFormSelect,
  logout,
}) => {
  const [folders, setFolders] = useState(["Folder 1", "Folder 2"]);
  const handleFormDrop = (e, folder) => {
    e.preventDefault();
    const formId = e.dataTransfer.getData("text/plain");
    const updatedForms = forms.map((form) =>
      form.id === parseInt(formId) ? { ...form, folder: folder } : form
    );
    setForms(updatedForms);
  };
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
          <div className="sidebar">
            {folders.map((folder) => (
              <div
                key={folder}
                className="p-4 border-b border-gray-200 text-left font-bold  text-white bg-gray-400 hover:bg-gray-500  focus:outline-none cursor-pointer flex flex-row"
                onDrop={(e) => handleFormDrop(e, folder)}
                onDragOver={(e) => e.preventDefault()}
              >
                <FolderOpenIcon
                  className="h-6 w-6 mr-2"
                  aria-hidden="true"
                ></FolderOpenIcon>
                {folder}
              </div>
            ))}
          </div>
          <div className="flex-grow overflow-y-scroll">
            {forms?.map((form) => (
              <div
                draggable
                onClick={() => handleFormSelect(form)}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", form.id);
                }}
                className="cursor-pointer border-b border-gray-400 p-4 w-full text-black text-left  hover:bg-neutral-200 focus:outline-none "
              >
                {form.data.formName}
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
