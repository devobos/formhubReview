import React from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Submissions from "../components/submissions";
import Implement from "../components/implement";
const FormContent = ({
  form,
  setFormEditView,
  submissions,
  forms,
  handleDeleteSubmission,
  setForm,
  removeForm,
}) => {
  return (
    <>
      {form && (
        <>
          <div className=" grow">
            <div className="flex flex-col px-6  mt-[80px]">
              <div className="flex flex-row justify-between items-center ">
                <h2 className="text-3xl font-bold">{form?.data?.formName}</h2>
                <Cog6ToothIcon
                  className="h-8 w-8"
                  onClick={() => setFormEditView}
                ></Cog6ToothIcon>
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
                    Use the following code to create a form that sends a POST
                    request to the API endpoint.
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
          <div className=" grow">
            <div className="flex flex-col px-6  mt-[80px]">
              <h2 className="text-3xl font-bold">Your Forms:</h2>
              {forms.map((f) => (
                <div className="p-4 bg-gray-100 rounded-lg mt-4">
                  <div className="flex flex-row justify-between">
                    <div
                      className="flex-col  cursor-pointer grow"
                      onClick={() => setForm(f)}
                    >
                      <span className="font-medium ">{f.data.formName}</span>
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
  );
};

export default FormContent;
