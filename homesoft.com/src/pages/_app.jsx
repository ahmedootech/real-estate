import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import Layout from '../components/layouts/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '../providers/auth-provider';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
