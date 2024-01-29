import { useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import MultiColumnDropdown from '../FormControls/MultiColumnDropdown';
import SingleColumn from '../FormControls/SingleColumn';

const Search = () => {
  const searchArea = useRef('');
  return (
    <div className="container-fluid bg-white pt-2 pb-5 px-5">
      <form method="post">
        <div className="row align-items-stretch border rounded">
          <div className="col-md-4 border-end border-bottom">
            <SingleColumn title="Search area">
              <input
                type="search"
                name="searchArea"
                className="form-control border-0 shadow-none bg-transparent px-0"
                placeholder="eg. Zoo road or Tudun fulani"
                ref={searchArea}
              />
            </SingleColumn>
          </div>
          <div className="col-md-2 px-0 border-end">
            <SingleColumn title="Bedroom">
              <select
                name="propertyType"
                className="form-select shadow-none bg-transparent border-light fw-bold"
                id=""
              >
                <option value="Show all">1 - 3 </option>
                <option value="Houses">4 - 10</option>
                <option value="Flats">10 - 15</option>
                <option value="Farms/land">15 - 20</option>
              </select>
            </SingleColumn>
            {/* <MultiColumnDropdown title="Bedroom" label="Any">
                <div className="row">
                  <div className="col">
                    <SingleColumn title="Minimum beds">
                      <select
                        name="minBed"
                        className="form-select bg-transparent shadow-none"
                        id=""
                      >
                        <option value>No min</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </SingleColumn>
                  </div>
                  <div className="col">
                    <SingleColumn title="Maximum beds">
                      <select
                        name="minBed"
                        className="form-select bg-transparent shadow-none"
                        id=""
                      >
                        <option value>No max</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </SingleColumn>
                  </div>
                </div>
              </MultiColumnDropdown> */}
          </div>
          <div className="col-md-2 px-0 border-end ">
            <SingleColumn title="Price Range">
              <select
                name="propertyType"
                className="form-select shadow-none bg-transparent border-light fw-bold"
                id=""
              >
                <option value="Show all">1M - 3M </option>
                <option value="Houses">3M - 6M</option>
                <option value="Flats">6M - 10M</option>
                <option value="Farms/land">10M - 20M</option>
              </select>
            </SingleColumn>
          </div>
          <div className="col-md-2 px-0">
            <SingleColumn title="Property type">
              <select
                name="propertyType"
                className="form-select shadow-none bg-transparent border-light fw-bold"
                id=""
              >
                <option value="Show all">Show all </option>
                <option value="Houses">Houses</option>
                <option value="Flats">Flats</option>
                <option value="Farms/land">Farms/land</option>
              </select>
            </SingleColumn>
          </div>
          <div className="col-md-2 d-flex align-items-bottom py-2">
            <input
              type="submit"
              className="btn btn-primary form-submit btn-block  w-100 py-0"
              value="Search"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default Search;
