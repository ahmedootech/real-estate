import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiV1 } from '../../utils/axios-instance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Modal } from 'react-bootstrap';
import StaffForm from './staff-form';

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getData = async () => {
    try {
      const res = await apiV1.get('/staffs');
      setStaffs(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
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
                    <button
                      className="btn btn-warning text-white py-0 px-1 mx-1"
                      title="Edit Staff"
                      onClick={() => {
                        setSelectedStaff(staff);
                        handleShow();
                      }}
                    >
                      <EditIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Record Found</p>
      )}

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4 pb-5">
          <StaffForm staff={selectedStaff} updateList={getData} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default StaffList;
