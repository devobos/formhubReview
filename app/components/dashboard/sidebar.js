"use client";

import { useContext, useState, useEffect } from "react";
import { authContext } from "../../../auth-context";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

import {
  UserIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { db } from "@/firebase";

const Sidebar = () => {
  // Get the user and methods
  const { user, loading, logout } = useContext(authContext);
  const [formName, setFormName] = useState("");
  const [formTargetUrl, setformTargetUrl] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState("");

  const handleFormSelect = async (form) => {
    setForm(form);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setDoc(doc(db, "forms", formName), {
      formName: formName,
      formTargetUrl: formTargetUrl,
      uid: user.uid,
    });

    setCreateModalOpen(false);
  };

  useEffect(() => {
    const fetchForms = async () => {
      if (user && !loading) {
        const q = query(collection(db, "forms"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedForms = [];
        querySnapshot.forEach((doc) => {
          fetchedForms.push(doc.data());
        });
        setForms(fetchedForms);
      }
    };
    fetchForms();
  }, [user]);

  // Sidebar function
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      {user && !loading && (
        <>
          {createModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-gray-100 bg-opacity-70">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="formname"
                  >
                    Formname
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="formname"
                    name="formname"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="formtargeturl"
                  >
                    Url of the website the form is for
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="formtargeturl"
                    name="formtargeturl"
                    value={formTargetUrl}
                    onChange={(e) => setformTargetUrl(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                  <div
                    onClick={() => {
                      setCreateModalOpen(false);
                    }}
                    className="bg-red-500 select-none cursor-pointer hover:bg-blue-700 text-white ml-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </div>
                </div>
              </form>
            </div>
          )}

          <nav
            className={
              sidebarOpen
                ? "flex flex-col lg:w-64 w-[50%] bg-gray-100 border-r border-gray-200 transition-all shadow-lg shadow-slate-400"
                : "w-0 transition-all "
            }
          >
            {/* Create section */}
            <div className={sidebarOpen ? "" : "hidden"}>
              <div className="h-[80px] text-left font-bold text-white bg-white focus:outline-none "></div>
              <button
                onClick={() => {
                  setCreateModalOpen(true);
                }}
                className="w-full p-4 text-left font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none "
              >
                + Create
              </button>

              {/* Form section */}
              <div className="p-4 text-left font-bold text-white bg-gray-900 focus:outline-none ">
                Forms
              </div>
              <div className="grow">
                {forms?.map((form) => (
                  <div key={form.uid} className="border-b border-gray-200 ">
                    <button
                      onClick={() => handleFormSelect(form)}
                      className={` p-4 w-full text-black text-left  hover:bg-neutral-200 focus:outline-none `}
                    >
                      {form.formName}
                    </button>
                  </div>
                ))}
              </div>
              <hr></hr>

              {/* User section */}
              <button className="min-w-full justify-start flex p-4 font-medium hover:bg-gray-200">
                <UserIcon
                  className="h-6 w-6 mr-2"
                  aria-hidden="true"
                ></UserIcon>
                {user.displayName}
              </button>
              <button className="min-w-full justify-start flex p-4 font-medium hover:bg-gray-200">
                <DocumentMagnifyingGlassIcon
                  className="h-6 w-6 mr-2"
                  aria-hidden="true"
                ></DocumentMagnifyingGlassIcon>
                Help/Docs
              </button>
              <button
                className="min-w-full justify-start flex p-4 font-medium hover:bg-gray-200"
                onClick={logout}
              >
                <svg
                  className="h-6 w-6 mr-2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </button>
            </div>
          </nav>

          {/* Sidebar Toggle */}
          <div className="min-h-full items-center justify-center ">
            <div className="h-full font-bold  w-4 items-center justify-center p-0 m-0 flex">
              <span
                onClick={() => setSidebarOpen(sidebarOpen ? false : true)}
                className="shadow-lg shadow-slate-400 bg-gray-100  text-sm text-gray-600 w-6 h-12 flex justify-center items-center rounded-r-md cursor-pointer select-none"
              >
                {sidebarOpen == true ? <>{"<"}</> : <>{">"}</>}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
