import { Navbar, Container, Nav, NavDropdown, Modal } from 'react-bootstrap';
import Link from 'next/link';
import RoofingIcon from '@mui/icons-material/Roofing';
import { useEffect } from 'react';
import LoginForm from '../auth/login';
import Cookies from 'js-cookie';
import RegisterForm from '../auth/register';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  // const token = Cookies.get('token');
  const auth = useAuth();

  const showLoginHandler = () => {
    auth.setShowLogin(true);
  };
  const closeLoginHandler = () => {
    auth.setShowLogin(false);
  };

  const showRegisterHandler = () => {
    auth.setShowRegister(true);
  };
  const closeRegisterHandler = () => {
    auth.setShowRegister(false);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    auth.setIsLoggedIn(!!token); // Update isLoggedIn based on token presence
  }, []);

  const onLoginSuccessHandler = () => {
    closeLoginHandler();
    auth.setIsLoggedIn(true);
  };
  const onRegistrationSuccessHandler = () => {
    closeRegisterHandler();
    showLoginHandler();
  };

  const handleLogOut = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    auth.setIsLoggedIn(false);
  };
  return (
    <>
      <Navbar bg="white" expand="lg">
        <Container fluid className="py-3 px-5">
          <Link href="/" passHref legacyBehavior>
            <Navbar.Brand className="text-secondary fw-bold">
              <RoofingIcon fontSize="large" className="fs-2" />
              HOMESOFT
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className=" d-lg-flex justify-content-lg-end"
          >
            <Nav className="flex-grow-1 justify-content-lg-end d-flex align-items-lg-center">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link as="a">Home</Nav.Link>
              </Link>
              <Link href="/properties/all" passHref legacyBehavior>
                <Nav.Link as="a">All Properties</Nav.Link>
              </Link>
              <Link href="/properties/for-sale" passHref legacyBehavior>
                <Nav.Link as="a">For sale</Nav.Link>
              </Link>
              <Link href="/properties/to-rent" passHref legacyBehavior>
                <Nav.Link as="a">To rent</Nav.Link>
              </Link>
              {/* <Link href="/new-homes/" passHref legacyBehavior>
                <Nav.Link as="a">New Homes</Nav.Link>
              </Link>
              <Link href="#home" passHref legacyBehavior>
                <Nav.Link as="a">Find agents</Nav.Link>
              </Link> */}
              {/* <Link href="tel:+234-802-225-9122" passHref legacyBehavior>
                <Nav.Link as="a" className="fw-bold px-3">
                  <i className="mdi mdi-phone text-primary pe-2"></i>
                  08030002000 <br />
                  <i className="mdi mdi-email text-primary pe-2"></i>
                  contact@homesoft.com
                </Nav.Link>
              </Link> */}
            </Nav>
            <Nav>
              {!auth.isLoggedIn ? (
                <>
                  <Nav.Item className="my-2 my-lg-0">
                    <button
                      className="btn btn-primary px-4 py-2 me-lg-2"
                      onClick={showLoginHandler}
                    >
                      Sign in
                    </button>
                  </Nav.Item>
                  <Nav.Item>
                    <button
                      className="btn btn-secondary px-4 py-2"
                      onClick={showRegisterHandler}
                    >
                      Register
                    </button>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Link href="/dashboard" passHref legacyBehavior>
                    <Nav.Link as="a">Dashboard</Nav.Link>
                  </Link>
                  <Nav.Item className="my-2 my-lg-0">
                    <button
                      className="btn btn-primary px-4 py-2 me-lg-2"
                      onClick={handleLogOut}
                    >
                      Sign out
                    </button>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={auth.showLogin}
        onHide={closeLoginHandler}
        animation={true}
        centered
      >
        <Modal.Header className="border-0" closeButton />
        <Modal.Body className="pb-5 px-5">
          <div className="text-center">
            <h2 className="my-0">Log in</h2>
            <p className="text-dark">Login to your HOMESOFT account</p>
          </div>

          <LoginForm onSuccess={onLoginSuccessHandler} />
        </Modal.Body>
      </Modal>

      <Modal
        show={auth.showRegister}
        onHide={closeRegisterHandler}
        animation={true}
        centered
        size="lg"
      >
        <Modal.Header className="border-0" closeButton />
        <Modal.Body className="pb-5 px-5">
          <div className="text-center">
            <h2 className="my-0">Register</h2>
            <p className="text-dark">Create your HOMESOFT account</p>
          </div>

          <RegisterForm onSuccess={onRegistrationSuccessHandler} />
        </Modal.Body>
      </Modal>
    </>
  );
}
