import PropertyForm from '../../components/property/property-form';
import PageHeader from '../../layout/page-header';
import Link from 'next/link';

const AddProperty = () => {
  return (
    <>
      <PageHeader title="Add New Property">
        <Link href="/properties" className="btn btn-dark px-4">
          Property List
        </Link>
      </PageHeader>
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="">
              <PropertyForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddProperty;
