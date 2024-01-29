import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiV1 } from '../../utils/axios-instance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiV1.get('/staffs');
        setStaffs(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <>
      {staffs.length ? (
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Username</th>
                <th>Address</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff, index) => (
                <tr key={index} className="align-middle">
                  <td className="text-nowrap">
                    <p className="py-0 my-0">{`${staff.firstName} ${staff.lastName}`}</p>
                  </td>
                  <td>{staff.gender}</td>
                  <td>{staff.phone}</td>
                  <td>{staff.role}</td>
                  <td>{staff.username}</td>
                  <td className="text-nowrap">{staff.address}</td>
                  <td>{staff.status}</td>
                  <td className="text-nowrap">
                    <Link
                      href="/"
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
export default StaffList;
