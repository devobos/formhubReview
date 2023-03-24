const Submissions = ({ submissions, handleDeleteSubmission }) => {
  return (
    <>
      {submissions.length > 0 ? (
        submissions.map((submission) => (
          <div key={submission.id} className="">
            <div className="p-4 bg-gray-100 rounded-lg overflow-scroll">
              <span className="font-medium">Submission</span>
              <pre className="mt-2">
                {Object.keys(submission.data).map((key) => (
                  <div key={key}>
                    {key}: {submission.data[key]}
                  </div>
                ))}
              </pre>
              <button
                onClick={() => {
                  handleDeleteSubmission(submission.id);
                }}
                className="mt-2  bg-red-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-red-700"
              >
                Delete Submission
              </button>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="p-4 bg-gray-100 rounded-lg overflow-scroll">
            <span className="font-medium"> No submissions yet.</span>
          </div>
        </>
      )}
    </>
  );
};

export default Submissions;
