"use client";

import { useContext } from "react";
import { authContext } from "../auth-context";

import CodeBlock from "./components/codeblock";

const Page = () => {
  const { user, loading, logout } = useContext(authContext);

  const { googleLogInHandler } = useContext(authContext);

  return (
    <div className="mt-[10vh] font-extrabold min-h-screen w-full flex py-12 sm:px-6 lg:px-8 justify-center">
      <div className="max-w-4xl">
        <h2 className="text-6xl">Never write another form backend</h2>
        <p className="text-3xl mt-4">
          Collect, manage, forward submissions. All automated and powered by AI.
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
      {/* <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to FormHub
          {user && (
            <>
              ,<br></br> {user.displayName}
            </>
          )}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="">
            {!user ? (
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
            ) : (
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
      </div> */}
    </div>
  );
};

export default Page;
