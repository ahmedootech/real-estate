import Image from 'next/image';
const Testimony = (props) => {
  return (
    <div className="d-flex flex-column bg-white px-5 py-4">
      <div className="row align-items-center">
        <div className="col-md-2">
          <Image
            src={props.src}
            layout="responsive"
            alt="passport"
            width="0"
            height="0"
            className="rounded-circle"
          />
        </div>
        <div className="col">
          <h6 className="my-0">{props.name}</h6>
          <span className="form-text fw-bold">{props.position}</span>
        </div>
        <p className="form-text">{props.testimony}</p>
        <div className="rating-starts">
          <i className="mdi mdi-star text-warning"></i>
          <i className="mdi mdi-star text-warning"></i>
          <i className="mdi mdi-star text-warning"></i>
          <i className="mdi mdi-star text-warning"></i>
          <i className="mdi mdi-star text-warning"></i>
        </div>
      </div>
    </div>
  );
};

export default Testimony;
