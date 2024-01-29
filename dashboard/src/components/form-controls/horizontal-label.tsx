const HorizontalLabel: React.FC<{ label: string }> = (props) => {
  return (
    <div className="w-100 h-100 d-flex align-items-center">
      <label htmlFor="" className="fw-bold">
        {props.label}
      </label>
    </div>
  );
};
export default HorizontalLabel;
