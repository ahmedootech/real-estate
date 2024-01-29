const SingleColumn = ({ title, children }) => {
  return (
    <div className="w-100 position-relative">
      <button
        className="btn btn-outline-light border-0 text-dark shadow-none h-100 w-100 text-start"
        type="button"
        title={title}
      >
        <div className="">
          <h6 className="m-0 p-0">{title}</h6>
          {children}
        </div>
      </button>
    </div>
  );
};

export default SingleColumn;
