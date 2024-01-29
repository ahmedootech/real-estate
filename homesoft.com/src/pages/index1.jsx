import PropertyCard from '../property/components/property-card';
import CurrentPage from '../shared/components/layouts/current-page';

export default function Home() {
  return (
    <>
      <CurrentPage pageTitle={'Home'} />
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <PropertyCard />
            <PropertyCard />
          </div>
          <div className="col-md-3">
            <div className="d-flex shadow ps-2 py-3">
              <h6>Quick links</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
