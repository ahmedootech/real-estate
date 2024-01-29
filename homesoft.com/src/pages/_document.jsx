import Document, { Html, Head, Main, NextScript } from 'next/document';
import { render } from 'react-dom';
const MyDocument = () => {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400;700&display=swap"
          rel="stylesheet"
        /> */}

        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default MyDocument;
