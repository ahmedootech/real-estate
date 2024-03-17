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
import PlaceIcon from '@mui/icons-material/Place';
import { prepareImageUrl } from '../../../utils/images';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NeighborhoodForm from '../../../components/property/neighborhood-form';
import ARComponent from '../../../components/ar-model/ar-component';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stage } from '@react-three/drei';
import React, { Suspense, useRef } from 'react';
import GLTFModelLoader from '../../../components/ar-model/r3f-gltf-loader';
import Model from '../../../components/ar-model/r3f-gltf-loader';

const PropertyDetail = ({ propertyInfo }) => {
  console.log(propertyInfo);
  const router = useRouter();
  const { propertyId } = router.query;
  const ref = useRef<any>();

  const [property, setProperty] = useState(propertyInfo);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showAR, setShowAR] = useState(false);
  const handleCloseAR = () => setShowAR(false);
  const handleShowAR = () => setShowAR(true);
  const getProperty = async () => {
    try {
      const res = await apiV1.get(`/properties/${propertyId}`);
      setProperty(res.data);
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

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
              <h5 className="fw-bold text-primary">
                Price: &#x20A6;{Number(property.price).toLocaleString()}
              </h5>
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
              <div>
                <p>Category: {property.category.name}</p>
              </div>

              <address className="d-flex align-items-end">
                <PlaceIcon />{' '}
                {`${String(
                  property.address.houseNoStreet
                ).toLocaleUpperCase()}, ${property.address.area.name}, ${
                  property.address.ward.name
                }, ${property.address.lga.name}, ${
                  property.address.state.name
                }`}
              </address>
              <p className="form-text">{property.description}</p>
              {property.arModelUrl && (
                <button className="btn btn-secondary" onClick={handleShowAR}>
                  View AR
                </button>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <h5>Neighborhood Information</h5>
            {property.neighborhood ? (
              <>
                <p>Overview: {property.neighborhood.overview}</p>

                <h6>Amenities</h6>
                <ul>
                  <li>Parks: {property.neighborhood.amenities.parks}</li>
                  <li>Schools: {property.neighborhood.amenities.schools}</li>
                  <li>Shopping:{property.neighborhood.amenities.shopping}</li>
                  <li>
                    Restaurants: {property.neighborhood.amenities.restaurants}
                  </li>
                  <li>
                    Entertainment:{' '}
                    {property.neighborhood.amenities.entertainment}
                  </li>
                </ul>

                <h6>Transportation</h6>
                <p>
                  Public Transit:{' '}
                  {property.neighborhood.transportation.publicTransit}
                </p>
                <p>
                  Major Highways:{' '}
                  {property.neighborhood.transportation.majorHighway}
                </p>

                <h6>Safety</h6>
                <p>Crime Rate: {property.neighborhood.safety.crimeRate}</p>
                <p>
                  Police Stations: {property.neighborhood.safety.policeStations}
                </p>
                <p>
                  Fire Stations: {property.neighborhood.safety.fireStations}
                </p>
              </>
            ) : (
              <p>No Neighborhood Information found</p>
            )}
            <button className="btn btn-dark" onClick={handleShow}>
              {property.neighborhood
                ? 'Update Neighborhood Info'
                : 'Add Neighborhood Info'}
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Neighborhood Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-3 px-2 pb-4">
            <NeighborhoodForm
              propertyId={property.id}
              reloadData={getProperty}
              closeModal={handleClose}
              neighborhoodInfo={property.neighborhood}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showAR} onHide={handleCloseAR} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Property AR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex align-items-center py-3 px-2 pb-4"
            style={{ minHeight: '500px' }}
          >
            <Canvas frameloop="demand" style={{ height: '500px' }}>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls />
              <Model
                url={`${process.env.API_BASE_URL}/${prepareImageUrl(
                  property.arModelUrl.path
                )}`}
              />
            </Canvas>
            {/* <Canvas>
              <Suspense fallback={null}>
                <GLTFModelLoader
                  url={`${process.env.API_BASE_URL}/${prepareImageUrl(
                    property.arModelUrl.path
                  )}`}
                />
                <OrbitControls />
                <Environment preset="sunset" background />
              </Suspense>
            </Canvas> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PropertyDetail;

export const getServerSideProps = async (context: NextPageContext) => {
  const cookies = context.req?.cookies;

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
        propertyInfo: propertyRes.data,
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
