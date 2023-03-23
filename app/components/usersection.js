import {
  UserIcon,
  DocumentMagnifyingGlassIcon,
  StarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
const UserSection = ({ user, logout }) => {
  return (
    <>
      <button className="w-full justify-start flex  px-2 font-medium">
        <div className="w-full  text-white  p-4 bg-blue-500 rounded-md">
          <div className="flex flex-row items-center h-6 w-full  text-white">
            <div>
              <StarIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            </div>
            <span>Go Pro</span>
          </div>
        </div>
      </button>
      <button className="min-w-full justify-start flex p-4 font-medium hover:bg-gray-200">
        <UserIcon className="h-6 w-6 mr-2" aria-hidden="true"></UserIcon>
        <span className="grow text-left">{user?.displayName}</span>
        <Cog6ToothIcon className="h-6 w-6 " aria-hidden="true"></Cog6ToothIcon>
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
    </>
  );
};

export default UserSection;
