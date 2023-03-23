"use client";

import { useContext } from "react";
import { authContext } from "../../auth-context";

const SignIn = () => {
  const { googleLogInHandler } = useContext(authContext);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to FormHub
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="">
            <button
              onClick={googleLogInHandler}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-500 hover:bg-red-700"
            >
              <span className="sr-only">Sign in with Google</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.182 12.292c0-.981-.088-1.706-.252-2.351H12v4.23h4.909c-.174 1.088-.652 2.167-1.435 2.964v2.437h2.32c1.354-1.246 2.134-3.077 2.134-5.28z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 21.5C8.5 21.5 5.753 19.688 4 17.062V13.73H1.818a10.526 10.526 0 007.364 7.354c1.957.441 4.26.441 6.217 0 3.54-.797 6.136-3.496 6.136-6.662 0-.404-.04-.797-.117-1.183H12V6.5h9.164a11.78 11.78 0 01-2.043 6.75 11.254 11.254 0 01-7.96 4.25z"
                />
              </svg>
              <span className="ml-2">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
