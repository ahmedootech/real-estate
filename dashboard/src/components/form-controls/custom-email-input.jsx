const CustomEmailInput = ({ children, initials }) => {
  return (
    <div className="row g-0 px-2">
      <div className="col-8" style={{ position: 'relative' }}>
        {children}
      </div>
      <div className="col-4">
        <div className="py-1">
          <label htmlFor="" className="form-label fw-bold"></label>
          <input
            type="text"
            className="form-control py-3 px-2 rounded-0 border-start-0 shadow-none mt-2"
            value={`@${initials}.com`}
            disabled
          />
        </div>
      </div>
    </div>
  );
};
export default CustomEmailInput;
