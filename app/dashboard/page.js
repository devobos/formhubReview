"use client";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../../auth-context";
import Submissions from "../components/submissions";
import Implement from "../components/implement";
import FormContent from "../components/formcontent";
import Createmodal from "../components/createmodal";
import UserSection from "../components/usersection";
import Sidebar from "../components/sidebar";
import SidebarToggle from "../components/sidebartoggle";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
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
  const [formEditView, setFormEditView] = useState(false);

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
          />
          <Sidebar
            sidebarOpen={sidebarOpen}
            setCreateModalOpen={setCreateModalOpen}
            setForm={setForm}
            user={user}
            forms={forms}
            setForms={setForms}
            handleFormSelect={handleFormSelect}
            logout={logout}
          />

          <SidebarToggle
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <FormContent
            form={form}
            setFormEditView={setFormEditView}
            handleFormSelect={handleFormSelect}
            submissions={submissions}
            handleDeleteSubmission={handleDeleteSubmission}
            removeForm={removeForm}
            forms={forms}
            setForm={setForm}
          />
        </>
      )}
    </>
  );
}
