import { ToastContainer } from 'react-toastify';
import CompanyProvider from '../providers/company-provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '../layout';
import '../../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page: any) => <Layout>{page}</Layout>);
  return (
    <>
      <CompanyProvider>
        {getLayout(<Component {...pageProps} />)}
      </CompanyProvider>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default MyApp;
