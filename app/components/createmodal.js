const Createmodal = ({
  createModalOpen,
  setCreateModalOpen,
  setformTargetUrl,
  formTargetUrl,
  formName,
  setFormName,
  handleSubmit,
}) => {
  return (
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
                className="bg-red-500 select-none cursor-pointer hover:bg-red-700 text-white ml-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Createmodal;
