import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const PageHeader = ({ title, children = null }) => {
  return (
    <div className="container-fluid px-5 py-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="col">
          <h5 className="text-warning">
            homesoft <NavigateNextIcon />
            <span className="border-bottom border-2 fs-5"> {title}</span>
          </h5>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};
export default PageHeader;
