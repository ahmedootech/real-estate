import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { Dropdown } from 'react-bootstrap';
import MultiColumnDropdown from '../FormControls/MultiColumnDropdown';
import SingleColumn from '../FormControls/SingleColumn';
import { getApiV1Instance } from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from '../form-controls/input';
import Select from '../form-controls/select';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const defaultValues = {
  searchArea: '',
  category: 'any',
  bedrooms: 0,
  minPrice: 0,
  maxPrice: 0,
};

const access_token =
  'pk.eyJ1IjoidmlrdG9oIiwiYSI6ImNrcmpyamM1ZjA1ZG8ydnBjbWRpOWtjN2kifQ.auBvgsbud2l08nrj8lXZfg';

const Search = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const categoryRes = await getApiV1Instance().get(
        '/properties/categories'
      );
      setCategories(categoryRes.data);
    };
    getCategories();
  }, []);

  const debouncedSearch = debounce(async (searchTerm) => {
    setShowResult(true);
    try {
      setLoading(true);
      const res = await getApiV1Instance().get('/properties/search', {
        params: { search: searchTerm },
      });
      console.log('search result', res.data);
      setSearchResult(res.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, 500);

  useEffect(() => {
    const delayedSearch = debounce(async () => {
      if (searchTerm.trim() !== '') {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchTerm
        )}.json?access_token=${access_token}`;

        try {
          const response = await axios.get(url);
          setSearchResult(response.data.features);
        } catch (error) {
          console.error(error);
        }
      } else {
        setSearchResult([]);
      }
    }, 300);

    delayedSearch();

    return () => delayedSearch.cancel();
  }, [searchTerm]);

  const searchSchema = yup.object().shape({
    searchArea: yup.string(),
    category: yup.string(),
    bedrooms: yup.number().typeError('numbers required'),
    minPrice: yup.number().typeError('numbers required'),
    maxPrice: yup.number().typeError('numbers required'),
  });

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(searchSchema),
    mode: 'onSubmit',
  });
  // useEffect(() => {
  //   if (searchTerm) debouncedSearch(searchTerm);
  //   else setSearchResult([]);

  //   if (searchTerm.length <= 0) setShowResult(false);
  //   return () => debouncedSearch.cancel();
  // }, [searchTerm]);

  const submitSearchHandler = (data) => {
    if (!data.searchArea) {
      toast.error('No area to search for');
      return;
    }
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join('&');
    router.push(`/properties/all?${queryString}`);
  };
  return (
    <div className="bg-white py-1 pb-3 px-5">
      <div className="position-relative">
        <form
          method="post"
          onSubmit={methods.handleSubmit(submitSearchHandler)}
        >
          <div className="border rounded">
            <SingleColumn title="Search properties" className="">
              <div className="row align-items-start gx-1 gy-2">
                <div className="col-lg flex-grow-1 d-flex align-items-center">
                  <div className="row flex-grow-1 gx-1 gy-2 align-items-start">
                    <div className="col-lg-5 position-relative d-flex flex-column justify-content-start">
                      <Input
                        control={methods.control}
                        type="search"
                        name="searchArea"
                        placeholder="eg. Zoo road or Tudun fulani"
                        // value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        list="search-results"
                      />
                      <datalist id="search-results" className="w-100">
                        {searchResult.map((result) => (
                          <option key={result.id} value={result.place_name} />
                        ))}
                      </datalist>
                    </div>

                    <div className="col-lg">
                      <Select
                        control={methods.control}
                        name="category"
                        onChange={(event) =>
                          setSelectedCategory(event.target.value)
                        }
                      >
                        <option value="any">Category (Any)</option>
                        {categories.map((category, index) => (
                          <option value={category.id} key={index}>
                            {category.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="col-lg">
                      <Select name="bedrooms" control={methods.control}>
                        <option value="0">Bedroom (Any)</option>
                        <option value="1">1 bedroom</option>
                        <option value="2">2 bedroom</option>
                        <option value="3">3 bedroom</option>
                        <option value="4">4 bedroom</option>
                        <option value="5">5 bedroom</option>
                        <option value="6">6 bedroom</option>
                        <option value="7">7 bedroom</option>
                        <option value="8">8 bedroom</option>
                        <option value="9">9 bedroom</option>
                        <option value="10">10 bedroom</option>
                      </Select>
                    </div>
                    <div className="col-lg">
                      <Select name="minPrice" control={methods.control}>
                        <option value="0">Min price (Any)</option>
                        <option value="50000">50,000</option>
                        <option value="100000">100,000</option>
                        <option value="200000">200,000</option>
                        <option value="300000">300,000</option>
                        <option value="400000">400,000</option>
                        <option value="500000">500,000</option>
                        <option value="600000">600,000</option>
                        <option value="700000">700,000</option>
                        <option value="800000">800,000</option>
                        <option value="900000">900,000</option>
                        <option value="1000000">1million</option>
                        <option value="2000000">2million</option>
                        <option value="3000000">3million</option>
                        <option value="5000000">5million</option>
                        <option value="10000000">10million</option>
                        <option value="20000000">20million</option>
                        <option value="30000000">30million</option>
                        <option value="40000000">40million</option>
                        <option value="50000000">50million</option>
                        <option value="100000000">100million</option>
                      </Select>
                    </div>
                    <div className="col-lg">
                      <Select name="maxPrice" control={methods.control}>
                        <option value="0">Max price (Any)</option>
                        <option value="500000">500,000</option>
                        <option value="600000">600,000</option>
                        <option value="700000">700,000</option>
                        <option value="800000">800,000</option>
                        <option value="900000">900,000</option>
                        <option value="1000000">1million</option>
                        <option value="2000000">2million</option>
                        <option value="3000000">3million</option>
                        <option value="5000000">5million</option>
                        <option value="10000000">10million</option>
                        <option value="20000000">20million</option>
                        <option value="30000000">30million</option>
                        <option value="40000000">40million</option>
                        <option value="50000000">50million</option>
                        <option value="100000000">100million</option>
                        <option value="200000000">200million</option>
                        <option value="300000000">300million</option>
                        <option value="500000000">500million</option>
                        <option value="1000000000">1billion</option>
                        <option value="2000000000">2billion</option>
                        <option value="5000000000">5billion</option>
                        <option value="10000000000">10billion</option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 text-end text-lg-center d-flex align-items-start h-100 py-1">
                  <button className="btn btn-primary w-100">
                    <SearchIcon />
                    {/* Search */}
                  </button>
                </div>
              </div>
            </SingleColumn>
          </div>
        </form>
        {showResult && (
          <div
            className="position-absolute top-100 start-0 p-3 mt-1 border w-100 bg-white shadow"
            style={{ zIndex: '999' }}
          >
            {!loading ? (
              <>
                {searchResult.length > 0 ? (
                  <>
                    <h5>Search result</h5>
                    <div className="table-responsive">
                      <table className={`table`}>
                        <tbody>
                          {searchResult.map((searchItem, index) => {
                            return (
                              <tr
                                key={index}
                                className=""
                                onClick={() => {
                                  setShowResult(false);
                                }}
                              >
                                <td>
                                  <Link
                                    href={`/properties/${searchItem.id}`}
                                    className="w-100 d-block"
                                  >
                                    {searchItem.address.area.name}
                                  </Link>
                                </td>
                                {/* <td>{searchItem.barcode || 'No barcode'}</td>
                      <td>{searchItem.category.name}</td>
                      <td>{searchItem.reOrderPoint}</td> */}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="text-end">
                      <Link href={`/`}>View Search Result</Link>
                    </div>
                  </>
                ) : (
                  <p>No record found</p>
                )}
              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center py-3">
                <CircularProgress />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
