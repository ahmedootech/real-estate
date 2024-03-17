import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiV1 } from '../../utils/axios-instance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Modal } from 'react-bootstrap';
import CategoryForm from './category-form';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getData = async () => {
    try {
      const res = await apiV1.get('/categories');
      setCategories(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
      setCategories([]);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {categories.length ? (
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index} className="align-middle">
                  <td className="text-nowrap">{category.name}</td>
                  <td>{category.description || 'No description'}</td>

                  <td className="text-nowrap">
                    <button
                      className="btn btn-warning text-white py-0 px-1 mx-1"
                      title="Edit Category"
                      onClick={() => {
                        setSelectedCategory(category);
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4 pb-5">
          <CategoryForm category={selectedCategory} updateList={getData} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CategoryList;
