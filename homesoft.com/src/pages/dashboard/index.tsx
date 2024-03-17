import { useEffect, useState } from 'react';
import PageHeader from '../../components/layouts/page-header';
import { getApiV1Instance } from '../../utils/axios-instance';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [inspections, setInspections] = useState([]);
  const getInspections = async () => {
    try {
      const res = await getApiV1Instance().get(`/inspections/prospect`);
      console.log(res.data);
      setInspections(res.data);
    } catch (err) {
      setInspections([]);
      toast.error(err.response.data.errors[0].message);
    }
  };
  useEffect(() => {
    getInspections();
  }, []);
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="container">
        <h2>Inspections</h2>
        {inspections.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Date & Time</th>
                <th>Agent</th>
                <th>Property</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((inspection, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {new Date(inspection.date).toLocaleDateString()} By:{' '}
                    {inspection.time}
                  </td>
                  <td>{inspection.agent.firstName}</td>
                  <td>{inspection.property.title}</td>
                  <td>
                    {`${String(
                      inspection.property.address.houseNoStreet
                    ).toLocaleUpperCase()}, ${
                      inspection.property.address.area.name
                    }, ${inspection.property.address.ward.name}, ${
                      inspection.property.address.lga.name
                    }, ${inspection.property.address.state.name}`}
                  </td>
                  <td>{inspection.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No record found</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
