import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const CurrentPage = ({ pageTitle }) => {
  return (
    <div className="container py-3">
      <div className="row">
        <div className="col">
          <h5 className="text-warning">
            homesoft <NavigateNextIcon />
            <span className="border-bottom border-2 fs-5"> {pageTitle}</span>
          </h5>
          {/* <h3 className="my-3 fs-5 fw-bold px-0 mx-0">
                        Flats to rent in Zoo road
                    </h3> */}
        </div>
      </div>
    </div>
  );
};
export default CurrentPage;
