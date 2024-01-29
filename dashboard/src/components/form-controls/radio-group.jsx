const RadioGroup = ({ label, children, name, errors }) => {
  return (
    <div className="d-flex flex-column">
      <label htmlFor="" className="form-label fw-bold">
        {label}:
      </label>
      <div>{children}</div>
      {errors[name] && (
        <p className="form-text text-danger p-0 m-0">{errors[name].message}</p>
      )}
    </div>
  );
};

export default RadioGroup;
