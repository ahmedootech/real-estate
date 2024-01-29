import Search from './search';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Search />
      <div className="flex-grow-1">{children}</div>
      <Footer />
    </div>
  );
}
