import { useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';
import Link from 'next/link';
import BedIcon from '@mui/icons-material/LocalHotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import ChairIcon from '@mui/icons-material/Chair';
import { replaceLongWords, toUpperCaseWords } from '../../utils';
import { prepareImageUrl } from '../../utils/images';

const PropertyCard = ({ property, type = null }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="border mx-0 rounded-3 h-100 d-flex flex-column">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {property?.imageURLs.map((image, index) => (
          <Carousel.Item key={index}>
            <Image
              src={`${process.env.API_BASE_URL}/${prepareImageUrl(image.path)}`}
              // layout="responsive"
              width={400}
              height={300}
              alt="home image"
              style={{ height: 300, objectFit: 'cover' }}
              className="d-block w-100"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="p-3 d-flex flex-column flex-grow-1">
        <h5 className="fw-bold text-primary">
          &#x20A6;{Number(property?.price).toLocaleString()}{' '}
          <span
            className={`fs-6 rounded-pill px-3 text-white ${
              property.type == 'For sale'
                ? 'bg-danger'
                : property.type == 'To rent'
                ? 'bg-warning'
                : 'bg-light'
            }`}
          >
            {property.type}
          </span>
        </h5>
        <p className="fs-6 text-nowrap">
          <span>
            <BedIcon fontSize="small" /> {property?.bedrooms}
          </span>
          <span className="mx-2">
            <BathtubIcon fontSize="small" /> {property?.toilets}
          </span>
          <span>
            <ChairIcon fontSize="small" /> {property?.sittingRooms}
          </span>
        </p>
        <div>
          <p>Category: {property.category?.name || 'Not set'}</p>
        </div>
        <p>{toUpperCaseWords(property?.title)}</p>
        <address>
          <i className="mdi mdi-map-marker"></i>{' '}
          {toUpperCaseWords(
            `${property?.address.houseNoStreet}, ${property?.address.area.name}, ${property?.address.ward.name}, ${property?.address.lga.name}, ${property?.address.state.name}`
          )}
        </address>
        <p className="form-text flex-grow-1">
          {replaceLongWords(property?.description, 200)}
        </p>
        <Link
          href={`/properties/${property?.id}`}
          className="btn btn-secondary align-self-start px-4"
        >
          More Details
        </Link>
        <div className="text-end">
          <div className="form-text fw-bold text-secondary">
            Agent: {`${property?.agent.firstName} ${property?.agent.lastName}`}
          </div>
          <div className="form-text text-secondary">
            Date posted: {new Date(property?.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyCard;
