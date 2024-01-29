import Logo from './logo';
import { useCompany } from '../hooks/useCompany';

const BlankLayout = (props) => {
  const company = useCompany();
  return (
    <>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <div className="container flex-grow-1 d-flex flex-column justify-content-center">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="shadow py-3 py-lg-5 px-3 px-lg-5 bg-white">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <Logo width="85" height="60" />
                </div>
                {props.children}
                <p className="mt-3 form-text text-center">
                  Copyright &copy; {company.companyName} 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlankLayout;
