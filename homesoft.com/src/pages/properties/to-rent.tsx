import { useEffect, useState } from 'react';
import PageHeader from '../../components/layouts/page-header';
import { getApiV1Instance } from '../../utils/axios-instance';
import PropertyCard from '../../components/property/property-card';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { isEmpty } from '../../utils';

const ToRentProperties = () => {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getProperties = async () => {
    try {
      setLoading(true);
      let propertiesRes = [];

      const res = await getApiV1Instance().get(
        `/properties/public/types/to-rent`
      );
      propertiesRes = res.data;

      setProperties(propertiesRes);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, [selectedCategory, router.query]);

  useEffect(() => {
    const getCategories = async () => {
      const categoryRes = await getApiV1Instance().get(
        '/properties/categories'
      );
      setCategories(categoryRes.data);
    };
    getCategories();
  }, [router.query]);
  return (
    <>
      <PageHeader title="Properties to rent" />
      <div className="container-fluid px-5">
        {!loading ? (
          <div className="row g-3">
            {properties.length > 0 ? (
              properties.map((property, index) => (
                <div className="col-lg-4" key={index}>
                  <PropertyCard property={property} type />
                </div>
              ))
            ) : (
              <p>No record found</p>
            )}
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};
export default ToRentProperties;
