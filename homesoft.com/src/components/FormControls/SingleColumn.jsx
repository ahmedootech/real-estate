const SingleColumn = ({ title, children, className = '' }) => {
  return (
    <div className="w-100 position-relative">
      <div
        className="py-2 px-3 border-0 text-dark shadow-none h-100 w-100 text-start"
        // type="div"
        title={title}
      >
        <div>
          <h6 className="m-0 p-0">{title}</h6>
          <div className={className || ''}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleColumn;
