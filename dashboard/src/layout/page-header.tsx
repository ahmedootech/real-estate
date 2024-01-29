import Head from 'next/head';
import React, { ReactNode } from 'react';
import { useCompany } from '../hooks/useCompany';
const PageHeader: React.FC<{
  title: string;
  description?: string;
  children?: ReactNode;
}> = (props) => {
  const company = useCompany();
  return (
    <>
      <Head>
        <title>{`${company.companyName} - ${props.title}`}</title>
      </Head>
      <section
        className={`d-flex justify-content-between align-items-center my-4`}
      >
        <div>
          <h4 className="py-0 my-0">{props.title}</h4>
          <p className="py-0 my-0 form-text text-opacity-25">
            {props.description}
          </p>
        </div>
        <div>{props.children}</div>
      </section>
    </>
  );
};
export default PageHeader;
