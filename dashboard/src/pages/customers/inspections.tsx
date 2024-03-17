import { useEffect, useState } from 'react';
import PageHeader from '../../layout/page-header';
import { getApiV1Instance } from '../../utils/axios-instance';
import { toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';

const Inspections = () => {
  const [inspections, setInspections] = useState([]);
  const getInspections = async () => {
    try {
      const res = await getApiV1Instance().get(`/inspections/agent`);
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
  const visitedHandler = async (inspectionId) => {
    try {
      const res = await getApiV1Instance().put(
        `/inspections/${inspectionId}/visited`
      );
      toast.success('Prospect Visited Successfully');
      getInspections();
    } catch (err) {
      toast.error(err.response.data.errors[0].message);
      console.log(err);
    }
  };
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
                <th>Prospect</th>
                <th>Property</th>
                <th>Address</th>
                <th>Status</th>
                <th>Option</th>
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
                  <td>
                    {inspection.prospect.firstName}{' '}
                    {inspection.prospect.lastName}
                  </td>
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
                  <td>
                    <button
                      className="btn btn-success py-0 px-1 text-white"
                      title="Complete Task"
                      disabled={inspection.status === 'Visited'}
                      onClick={() => visitedHandler(inspection.id)}
                    >
                      <CheckIcon />
                    </button>
                  </td>
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

export default Inspections;
