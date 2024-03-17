import { useEffect, useState } from 'react';
import PageHeader from '../../components/layouts/page-header';
import { getApiV1Instance } from '../../utils/axios-instance';
import PropertyCard from '../../components/property/property-card';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { isEmpty } from '../../utils';

const AllProperties = () => {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getProperties = async () => {
    try {
      setLoading(true);
      let propertiesRes = [];
      if (!isEmpty(router.query)) {
        const { searchArea, category, bedrooms, minPrice, maxPrice } =
          router.query;
        const res = await getApiV1Instance().get('/properties/search', {
          params: { searchArea, category, bedrooms, minPrice, maxPrice },
        });
        propertiesRes = res.data;
      } else {
        const res = await getApiV1Instance().get(
          `/properties/public/${selectedCategory}`
        );
        propertiesRes = res.data;
      }
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
    console.log('query', router.query);

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
      <PageHeader title="All Properties">
        <div className="d-flex align-items-center">
          <p className="my-0 me-2">Filter: </p>
          <select
            className="form-select px-5"
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="all">All</option>
            {categories.map((category, index) => (
              <option value={category.id} key={index}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </PageHeader>
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
export default AllProperties;
