"use client";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../../auth-context";
import Submissions from "../components/submissions";
import Implement from "../components/implement";
import Createmodal from "../components/createmodal";
import UserSection from "../components/usersection";
import Sidebar from "../components/sidebar";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase";

export default function Dashboard() {
  const { user, loading, logout } = useContext(authContext);
  const [formName, setFormName] = useState("");
  const [formTargetUrl, setformTargetUrl] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState("");
  const [submissions, setSubmissions] = useState([]);

  const handleFormSelect = async (form) => {
    console.log(form.id);
    setForm(form);

    const q = query(
      collection(db, "submissions"),
      where("formId", "==", form.id)
    );
    const querySnapshot = await getDocs(q);
    const fetchedSubmissions = [];
    querySnapshot.forEach((doc) => {
      fetchedSubmissions.push({
        id: doc.id,
        data: doc.data().data,
      });
    });
    // console.log(fetchedSubmissions);
    setSubmissions(fetchedSubmissions);
  };

  const handleDeleteSubmission = async (id) => {
    await deleteDoc(doc(db, "submissions", id));
    setSubmissions(submissions.filter((submission) => submission.id !== id));
  };
  const removeForm = async (id) => {
    await deleteDoc(doc(db, "forms", id));
    setForms(forms.filter((form) => form.id !== id));
    setForm("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "forms"), {
      formName: formName,
      formTargetUrl: formTargetUrl,
      uid: user.uid,
    })
      .then((docRef) => {
        const newForm = {
          id: docRef.id,
          data: {
            formName: formName,
            formTargetUrl: formTargetUrl,
            uid: user.uid,
          },
        };
        setForms([...forms, newForm]);
        setForm(newForm);
        setCreateModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  useEffect(() => {
    const fetchForms = async () => {
      if (user && !loading) {
        const q = query(collection(db, "forms"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedForms = [];
        querySnapshot.forEach((doc) => {
          fetchedForms.push({ id: doc.id, data: doc.data() });
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
          <Createmodal
            createModalOpen={createModalOpen}
            setCreateModalOpen={setCreateModalOpen}
            setformTargetUrl={setformTargetUrl}
            formName={formName}
            formTargetUrl={formTargetUrl}
            setFormName={setFormName}
            handleSubmit={handleSubmit}
          ></Createmodal>
          <Sidebar
            sidebarOpen={sidebarOpen}
            setCreateModalOpen={setCreateModalOpen}
            setForm={setForm}
            user={user}
            forms={forms}
            handleFormSelect={handleFormSelect}
            logout={logout}
          ></Sidebar>

          {/* Sidebar Toggle */}
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
          {/* Form Content Section */}
          {form && (
            <>
              <div className=" mx-auto justify-center overflow-scroll">
                <div className="flex flex-col px-6  mt-[80px]">
                  <div className="flex flex-row justify-between ">
                    <h2 className="text-3xl font-bold">
                      {form?.data?.formName}
                    </h2>
                  </div>
                  <div className="overflow-scroll">
                    <h2 className="text-2xl ">Submissions</h2>
                    <Submissions
                      submissions={submissions}
                      handleDeleteSubmission={handleDeleteSubmission}
                    ></Submissions>
                    {/*  */}
                    <div className="mt-6">
                      <h2 className="text-2xl">How to Implement</h2>
                      <p>
                        Use the following code to create a form that sends a
                        POST request to the API endpoint.
                      </p>
                      <Implement
                        url={"formhub-omega.vercel.app/api/form/"}
                        formid={form.id}
                      ></Implement>
                    </div>
                    <button
                      onClick={() => {
                        removeForm(form.id);
                      }}
                      className="bg-red-500 mt-4 text-white py-2 px-4 rounded focus:outline-none hover:bg-red-700"
                    >
                      Delete Form
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {!form && (
            <>
              <div className="  justify-start w-full">
                <div className="flex flex-col px-6  m-10">
                  <h2 className="text-3xl font-bold">Your Forms:</h2>
                  {forms.map((f) => (
                    <div className="p-4 bg-gray-100 rounded-lg mt-4">
                      <div className="flex flex-row justify-between">
                        <div
                          className="flex-col  cursor-pointer grow"
                          onClick={() => setForm(f)}
                        >
                          <span className="font-medium ">
                            {f.data.formName}
                          </span>
                          <p>{f.data.formTargetUrl}</p>
                        </div>
                        <button onClick={() => removeForm(f.id)}>delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
