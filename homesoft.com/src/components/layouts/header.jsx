import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import RoofingIcon from '@mui/icons-material/Roofing';
export default function Header() {
  return (
    <>
      {/* <Container fluid className="">
        <Navbar className="d-flex justify-content-between">
          <Link href="/" passHref>
            <Navbar.Brand className="ps-1 text-secondary fs-4">
              homesoft.ng
            </Navbar.Brand>
          </Link>
          <Nav>
            <Nav.Link as='a'>Signin</Nav.Link>
          </Nav>
        </Navbar>
      </Container> */}

      <Navbar bg="white" expand="lg">
        <Container fluid className="py-3 px-5">
          <Link href="/" passHref legacyBehavior>
            <Navbar.Brand className="text-secondary fw-bold">
              <RoofingIcon fontSize="50" className="fs-2" />
              HOMESOFT
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className=" d-lg-flex justify-content-end"
          >
            <Nav className="d-flex align-items-center">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link as="a">Home</Nav.Link>
              </Link>
              <Link href="/for-sale/" passHref legacyBehavior>
                <Nav.Link as="a">For sale</Nav.Link>
              </Link>
              <Link href="/to-rent/" passHref legacyBehavior>
                <Nav.Link as="a">To rent</Nav.Link>
              </Link>
              <Link href="/new-homes/" passHref legacyBehavior>
                <Nav.Link as="a">New Homes</Nav.Link>
              </Link>
              <Link href="#home" passHref legacyBehavior>
                <Nav.Link as="a">Find agents</Nav.Link>
              </Link>
              <Link href="tel:+234-802-225-9122" passHref legacyBehavior>
                <Nav.Link as="a" className="fw-bold px-3">
                  <i className="mdi mdi-phone text-primary pe-2"></i>
                  08030002000 <br />
                  <i className="mdi mdi-email text-primary pe-2"></i>
                  contact@homesoft.com
                </Nav.Link>
              </Link>

              <Nav.Item>
                <button className="btn btn-primary px-4 py-2">Sign in</button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
