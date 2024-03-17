import PropertyForm from '../../../components/property/property-form';
import Link from 'next/link';
import PageHeader from '../../../layout/page-header';
import { useEffect, useState } from 'react';
import { apiV1 } from '../../../utils/axios-instance';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const UpdateProperty = () => {
  const router = useRouter();
  const { propertyId } = router.query;
  console.log(propertyId);

  const [property, setProperty] = useState(null);
  const getProperty = async () => {
    try {
      const res = await apiV1.get(`/properties/${propertyId}`);
      setProperty(res.data);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };
  useEffect(() => {
    if (propertyId) getProperty();
  }, [propertyId]);
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
              {property ? (
                <PropertyForm propertyInfo={property} update />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateProperty;
