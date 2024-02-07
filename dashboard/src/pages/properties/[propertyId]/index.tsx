import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiV1 } from '../../../utils/axios-instance';
import { toast } from 'react-toastify';
import { NextPageContext } from 'next';
import PageHeader from '../../../layout/page-header';
import Link from 'next/link';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import BedIcon from '@mui/icons-material/LocalHotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import ChairIcon from '@mui/icons-material/Chair';
import { prepareImageUrl } from '../../../utils/images';

const PropertyDetail = ({ property }) => {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <PageHeader title="Property Details" description={property.title}>
        <Link
          href={`/properties/${property.id}/update`}
          className="btn btn-dark"
        >
          Update Property
        </Link>
      </PageHeader>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {property.imageURLs.map((image: any, index: number) => (
                <Carousel.Item key={index}>
                  <Image
                    src={`${process.env.API_BASE_URL}/${prepareImageUrl(
                      image.path
                    )}`}
                    width={400}
                    height={300}
                    alt="home image"
                    className="d-block w-100"
                    style={{ objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <div className="top">
              <p>{property.title}</p>
              <h5 className="fw-bold text-primary">Price: &#x20A6;250,000</h5>
              <p className="fs-6 text-nowrap">
                <span>
                  <BedIcon /> {property.bedrooms}
                </span>
                <span className="mx-2">
                  <BathtubIcon /> {property.toilets}
                </span>
                <span>
                  <ChairIcon /> {property.sittingRooms}
                </span>
              </p>

              <address>
                <i className="mdi mdi-map-marker"></i>{' '}
                {`${String(
                  property.address.houseNoStreet
                ).toLocaleUpperCase()}, ${property.address.area.name}, ${
                  property.address.ward.name
                }, ${property.address.lga.name}, ${
                  property.address.state.name
                }`}
              </address>
              <p className="form-text">{property.description}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <h5>Neighborhood Information</h5>
            <p>
              Overview: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed vitae finibus justo.
            </p>

            <h6>Amenities</h6>
            <ul>
              <li>Parks: Park A, Park B</li>
              <li>Schools: School X, School Y</li>
              <li>Shopping: Mall A, Grocery Store B</li>
              <li>Restaurants: Restaurant 1, Restaurant 2</li>
              <li>Entertainment: Theater A, Museum B</li>
            </ul>

            <h6>Transportation</h6>
            <p>Public Transit: Bus Lines 1, 2, 3</p>
            <p>Major Highways: Highway A, Highway B</p>

            <h6>Safety</h6>
            <p>Crime Rate: Low</p>
            <p>Police Stations: Station A, Station B</p>
            <p>Fire Stations: Fire Station X, Fire Station Y</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;

export const getServerSideProps = async (context: NextPageContext) => {
  const cookies = context.req?.cookies;
  console.log(cookies);
  const { query } = context;
  const propertyId = query.propertyId;

  if (!propertyId) {
    return {
      redirect: {
        destination: '/properties',
        permanent: false,
      },
    };
  }
  try {
    const propertyRes = await apiV1.get(`/properties/${propertyId}`, {
      headers: { Authorization: cookies.token },
    });
    return {
      props: {
        property: propertyRes.data,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/properties',
        permanent: false,
      },
    };
  }
};
