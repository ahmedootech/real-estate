import { useEffect, useState } from 'react';
import { getApiV1Instance } from '../../utils/axios-instance';
import PageHeader from '../../layout/page-header';

const Dashboard = () => {
  const [dashboards, setDashboards] = useState([]);
  const getDashboards = async () => {
    try {
      const res = await getApiV1Instance().get('/dashboards');
      setDashboards(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDashboards();
  }, []);

  return (
    <>
      <PageHeader title="Dashboard" description="Summaries and overviews" />
      <div className="container-fluid gx-0">
        {dashboards.length > 0 ? (
          <>
            <div className="row g-3">
              {dashboards.map((dashboard, index) => {
                return (
                  <div className="col-lg-3" key={index}>
                    <div className="border border-2 p-3 rounded d-flex flex-column">
                      <h5>{dashboard.label}</h5>
                      <p className="align-self-end mt-2">
                        <span className="bg-secondary text-light px-3 rounded-pill">
                          {dashboard.value}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p>No record found</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
