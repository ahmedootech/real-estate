import { PropsWithChildren } from 'react';
import Footer from './footer';
import Header from './header';

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-grow-1">
        <div className="container-fluid px-3 px-lg-5">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
