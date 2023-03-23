"use client";

import { useContext } from "react";
import { authContext } from "../auth-context";
import Navbar from "./components/navbar";
import CodeBlock from "./components/codeblock";

const Page = () => {
  const { user, loading, logout } = useContext(authContext);

  const { googleLogInHandler } = useContext(authContext);

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex flex-col">
        <div className="max-w-6xl self-center mt-[10vh] font-extrabold flex py-12 px-6 justify-center lg:flex-row flex-col">
          <div className="lg:mr-4">
            <h2 className="text-6xl">Never write another form backend</h2>
            <p className="text-3xl mt-4">
              Collect, manage, forward submissions. All automated and powered by
              AI.
            </p>
            <div className="mt-4">
              <CodeBlock
                code={`<form action="http://localhost:3000/api/form/{yourFormHubKey}"
    <input type="text" name="input1"></input>
    <input type="text" name="input2"></input>
    <button type="submit">Button Text</button>
</form>`}
              />
            </div>
          </div>

          <div className="grow sm:w-full sm:max-w-md lg:ml-6 sm:mt-6">
            <div className="bg-white py-8 px-4 shadow-gray-400 shadow sm:rounded-lg sm:px-10">
              <div className="">
                {!user ? (
                  <>
                    <h2 className="mb-4 text-2xl text-center">
                      Get started now!
                    </h2>
                    <button
                      onClick={googleLogInHandler}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-500 hover:bg-blue-600"
                    >
                      <span className="sr-only">Sign in with Google</span>

                      <span className="ml-2">
                        {" "}
                        {user ? <>Your Dashboard</> : <>Sign in with Google</>}
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="mb-4 text-2xl text-center">
                      Welcome back <br></br>
                      <span className="font-medium">{user.displayName}!</span>
                    </h2>
                    <a
                      href="/dashboard"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-500 hover:bg-blue-600"
                    >
                      <span className="sr-only">Sign in with Google</span>

                      <span className="ml-2">
                        {" "}
                        {user ? <>Your Dashboard</> : <>Sign in with Google</>}
                      </span>
                    </a>
                  </>
                )}
                {user && (
                  <button
                    onClick={logout}
                    className=" mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-500 hover:bg-red-700"
                  >
                    <span className="sr-only">Log Out </span>

                    <span className="ml-2"> Log Out </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl self-center flex py-12 px-6 justify-center lg:flex-row flex-col">
          <h2 className="text-2xl">
            Keep your form connected! <br></br>FormHub enables you to collect
            form submissions, receive email notifications, and connect your form
            with popular applications.
          </h2>
        </div>
      </div>
    </>
  );
};

export default Page;
