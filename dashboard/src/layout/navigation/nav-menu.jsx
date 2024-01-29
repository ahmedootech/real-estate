import Link from 'next/link';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import navigation from './navigation';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useCompany } from '../../hooks/useCompany';
import Logo from '../logo';

const NavMenu = () => {
  const router = useRouter();
  const navItems = navigation();
  const company = useCompany();

  const handleLogOut = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    router.push('/authentication/login');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className="px-3 px-lg-5">
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link as="a" className="fw-bold">
                DASHBOARD
              </Nav.Link>
            </Link>
            {navItems.map((item, index) => {
              if (item.children) {
                return (
                  <NavDropdown title={item.label} key={index}>
                    {item.children.map((child, index) => (
                      <Link
                        href={child.path}
                        passHref
                        key={index}
                        legacyBehavior
                      >
                        <NavDropdown.Item as="a">
                          {child.label}
                        </NavDropdown.Item>
                      </Link>
                    ))}
                  </NavDropdown>
                );
              } else {
                return (
                  <Link href={item.path} passHref key={index} legacyBehavior>
                    <Nav.Link as="a">{item.label}</Nav.Link>
                  </Link>
                );
              }
            })}

            <Nav.Link
              as="button"
              className="btn py-0 d-flex align-items-center"
              onClick={handleLogOut}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
