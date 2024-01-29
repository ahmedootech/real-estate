import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const MultiColumnDropdown = ({ title, children,label }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        variant="outline-light"
        className="text-dark w-100 text-start"
        onClick={handleShow}
        title={title}
      >
        <div className="">
          <h6 className="m-0 p-0">{title}</h6>
          <p className="p-0 m-0 d-flex py rounded justify-content-between align-items-center w-100">
            <span className="d-block fw-bold fs-6">{label}</span>
            <i className="mdi d-block mdi-chevron-down fs-5"></i>
          </p>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MultiColumnDropdown;
