import Link from 'next/link';

const Wrapper = (props) => {
  return (
    <div className="container">
      <div className="row justify-content-center my-4">
        <div className="col-lg-8 text-center">
          <h2 className="my-2">{props.title}</h2>
          <p className="text-secondary">{props.description}</p>
        </div>
      </div>
      <div className="row g-3">{props.children}</div>
      {props.withLink && (
        <div className="d-flex justify-content-center py-4">
          <Link href={props.linkURL} passHref legacyBehavior>
            <a className="btn btn-primary py-3 px-5">{props.linkLabel}</a>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Wrapper;
