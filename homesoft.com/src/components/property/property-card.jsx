import { useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';
import Link from 'next/link';
import BedIcon from '@mui/icons-material/LocalHotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import ChairIcon from '@mui/icons-material/Chair';

const PropertyCard = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="container shadow px-0 mb-4" role="button">
      <div className="row border mx-0 rounded-3">
        <div className={`${props.type ? 'col-12' : 'col-md-7'} px-0`}>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <Image
                src="/assets/images/pic1.jpg"
                layout="responsive"
                width={400}
                height={300}
                alt="home image"
                className="d-block w-100"
              />
            </Carousel.Item>

            <Carousel.Item>
              <Image
                src="/assets/images/pic1.jpg"
                layout="responsive"
                width={400}
                height={300}
                alt="home image"
                className="d-block w-100"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className={`${props.type ? 'col-12' : 'col-md-5'} p-3`}>
          <div className="d-flex flex-column justify-content-between align-items-between h-100">
            <div className="top">
              <h5 className="fw-bold text-primary">&#x20A6;250,000</h5>
              <p className="fs-6 text-nowrap">
                <span>
                  <BedIcon fontSize="14" /> 3
                </span>
                <span className="mx-2">
                  <BathtubIcon fontSize="14" /> 2
                </span>
                <span>
                  <ChairIcon fontSize="14" /> 1
                </span>
              </p>
              <p>3 Bedroom flat to rent</p>
              <address>
                <i className="mdi mdi-map-marker"></i> No 342, Zoo road
              </address>
              <p className="form-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquid, esse.
              </p>
              <button className="btn btn-outline-primary fw-bold fs-6 px-2 py-1 border-0">
                <i className="mdi mdi-heart-outline mdi-24px"></i> 10
              </button>
            </div>
            <div className="bottom d-flex justify-content-end">
              <h6 className="fw-bold text-secondary">doo agents</h6>
            </div>
          </div>
        </div>
      </div>
      {!props.type && (
        <div className="row py-3 border border-top-0 mx-0 align-items-center">
          <div className="col-md-7">
            <span>Posted 26-12-2021</span>
          </div>
          <div className="col-md-5">
            <Link href="/property/1" passHref legacyBehavior>
              <a className="">
                <i className="mdi mdi-phone mdi-24px"></i>
                <i className="mdi mdi-email mdi-24px mx-4"></i>
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default PropertyCard;
