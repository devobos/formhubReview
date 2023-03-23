"use client";

import { useContext } from "react";
import { authContext } from "../auth-context";

const Page = () => {
  const { user, loading, logout } = useContext(authContext);

  const { googleLogInHandler } = useContext(authContext);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
            <button
              onClick={!user ? googleLogInHandler : undefined}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-lime-500 hover:bg-red-700"
            >
              <span className="sr-only">
                {user ? <>Your Dashboard</> : <>Sign in with Google</>}
              </span>

              <span className="ml-2">
                {" "}
                {user ? <>Your Dashboard</> : <>Sign in with Google</>}
              </span>
            </button>
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
  );
};

export default Page;
