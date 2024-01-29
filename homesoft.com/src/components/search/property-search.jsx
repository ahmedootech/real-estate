const PropertySearch = (props) => {
  let propertyType = props.slug;
  let pageName = propertyType.split('-').join(' ');
  let searchTitle = `Search houses and flats ${pageName}`;
  if (pageName === 'new homes') {
    searchTitle = `Search for new build houses`;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 bg-light px-lg-5 py-lg-3">
          <div className="row">
            <div className="col-1 d-flex align-items-start justify-content-start">
              <i className="mdi mdi-home fs-1 text-warning"></i>
            </div>
            <div className="col">
              <h3>Properties {pageName} </h3>

              <h5 className="">{searchTitle}</h5>
            </div>
          </div>

          <form action="" className="">
            <fieldset className="bg-white p-5 rounded-3">
              <legend className="fw-bold fs-2 text-secondary">Location</legend>
              <div className="form-group">
                <label htmlFor="" className="form-label fw-bold">
                  State
                </label>
                <select className="form-select p-2">
                  <option value="Kano">Kano</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="" className="form-label fw-bold">
                    Local government
                  </label>
                  <select className="form-select p-2">
                    <option value="Kano">Tarauni</option>
                    <option value="Kano">Kano Munincipal</option>
                    <option value="Kano">Kumbotso</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="form-label fw-bold">
                    Ward
                  </label>
                  <select className="form-select p-2">
                    <option value="Kano">Karkasara</option>
                    <option value="Kano">Kano Munincipal</option>
                    <option value="Kano">Kumbotso</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label fw-bold">
                  Area
                </label>
                <select className="form-select p-2">
                  <option value="Kano">Darmanawa primary</option>
                </select>
              </div>
            </fieldset>
            <fieldset className="bg-white p-5 mt-3 rounded-3">
              <legend className="fw-bold fs-2 text-secondary">
                Property attribute
              </legend>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="" className="form-label fw-bold">
                      Min price
                    </label>
                    <select className="form-select p-2">
                      <option value="">All</option>
                      <option value="">&#8358; 100,000+</option>
                      <option value="">&#8358; 200,000+</option>
                      <option value="">&#8358; 300,000+</option>
                      <option value="">&#8358; 500,000+</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="" className="form-label fw-bold">
                      Max price
                    </label>
                    <select className="form-select p-2">
                      <option value="">All</option>
                      <option value="">&#8358; 100,000+</option>
                      <option value="">&#8358; 200,000+</option>
                      <option value="">&#8358; 300,000+</option>
                      <option value="">&#8358; 500,000+</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="" className="form-label fw-bold">
                      Property type
                    </label>
                    <select className="form-select p-2">
                      <option value="Show all">Show all </option>
                      <option value="Houses">Houses</option>
                      <option value="Flats">Flats</option>
                      <option value="Farms/land">Farms/land</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="" className="form-label fw-bold">
                      Bedrooms
                    </label>
                    <select className="form-select p-2">
                      <option value="1">1 bedroom+</option>
                      <option value="2">2 bedrooms+</option>
                      <option value="3">3 bedrooms+</option>
                      <option value="4">4 bedrooms+</option>
                      <option value="5">5 bedrooms+</option>
                    </select>
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary px-5 py-2">Search</button>
            </div>
          </form>
          {/* <form action="">
            <div className="form-group">
              <label htmlFor="" className="form-label">Search area</label>
              
              <input
                type="text"
                className="form-control "
                placeholder="Karasara ward, tudun fulani"
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Min price</label>
                  <select className="form-select"></select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Max price</label>
                  <select className="form-select"></select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Property type</label>
                  <select className="form-select"></select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Bedrooms</label>
                  <select className="form-select"></select>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary px-5 py-2">Search</button>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
