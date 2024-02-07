import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiV1 } from '../../utils/axios-instance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiV1.get('/properties');
        setProperties(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
        setProperties([]);
      }
    };
    getData();
  }, []);
  return (
    <>
      {properties.length ? (
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Bedrooms</th>
                <th>Toilets</th>
                <th>Sitting rooms</th>
                <th>Address</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={index} className="align-middle">
                  <td className="text-nowrap">{property.title}</td>
                  <td>{property.price}</td>
                  <td>{property.bedrooms}</td>
                  <td>{property.toilets}</td>
                  <td>{property.sittingRooms}</td>
                  <td
                    className="text-nowrap"
                    title={`${property.address.houseNoStreet}, ${property.address.area.name}, ${property.address.ward.name}, ${property.address.lga.name}, ${property.address.state.name}`}
                  >{`${property.address.area.name}, ${property.address.ward.name}, ${property.address.lga.name}, ${property.address.state.name} `}</td>
                  <td>{property.status}</td>
                  <td className="text-nowrap">
                    <Link
                      href={`/properties/${property.id}`}
                      className="btn bg-success py-0 px-1  bg-opacity-75 text-white"
                      title="Provide Service"
                    >
                      <VisibilityIcon />
                    </Link>
                    <Link
                      href="/"
                      className="btn btn-warning text-white py-0 px-1 mx-1"
                      title="Make appointment"
                    >
                      <EditIcon />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Record Found</p>
      )}
    </>
  );
};
export default PropertyList;
