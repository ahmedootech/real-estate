import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getApiV1Instance } from '../../../utils/axios-instance';

import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import BedIcon from '@mui/icons-material/LocalHotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import ChairIcon from '@mui/icons-material/Chair';
import PlaceIcon from '@mui/icons-material/Place';
import { prepareImageUrl } from '../../../utils/images';
import Modal from 'react-bootstrap/Modal';
import PageHeader from '../../../components/layouts/page-header';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../../hooks/useAuth';
import ScheduleInspectionForm from '../../../components/inspection/schedule-inspection-form';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stage } from '@react-three/drei';
import React, { Suspense, useRef } from 'react';
import Model from '../../../components/ar-model/r3f-gltf-loader';
const PropertyDetail = () => {
  const router = useRouter();
  const auth = useAuth();
  const { propertyId } = router.query;

  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState(null);
  const [index, setIndex] = useState(0);

  const [show, setShow] = useState(false);
  const showHandler = () => {
    setShow(true);
  };
  const closeHandler = () => {
    setShow(false);
  };

  const [showAR, setShowAR] = useState(false);
  const handleCloseAR = () => setShowAR(false);
  const handleShowAR = () => setShowAR(true);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const getProperty = async () => {
    try {
      setLoading(true);
      const res = await getApiV1Instance().get(
        `/properties/public/${propertyId}/details`
      );
      console.log(res.data);
      setProperty(res.data);
    } catch (err) {
      console.log(err);
      setProperty(null);
      //   toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperty();
  }, [propertyId]);

  return (
    <>
      <PageHeader title="Property details" />
      <div className="container-fluid px-5">
        {!loading ? (
          <>
            {property ? (
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
                    <p className="mt-0 text-end fw-bold">
                      Agent:{' '}
                      {`${property.agent.firstName} ${property.agent.lastName}`}
                    </p>
                    <h5 className="fw-bold text-primary">
                      Price: &#x20A6;{Number(property.price).toLocaleString()}{' '}
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
                      <button
                        className="btn btn-secondary"
                        onClick={handleShowAR}
                      >
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
                        <li>
                          Schools: {property.neighborhood.amenities.schools}
                        </li>
                        <li>
                          Shopping:{property.neighborhood.amenities.shopping}
                        </li>
                        <li>
                          Restaurants:{' '}
                          {property.neighborhood.amenities.restaurants}
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
                      <p>
                        Crime Rate: {property.neighborhood.safety.crimeRate}
                      </p>
                      <p>
                        Police Stations:{' '}
                        {property.neighborhood.safety.policeStations}
                      </p>
                      <p>
                        Fire Stations:{' '}
                        {property.neighborhood.safety.fireStations}
                      </p>
                    </>
                  ) : (
                    <p>No Neighborhood Information found</p>
                  )}

                  <button
                    className="btn btn-secondary px-5"
                    onClick={() => {
                      if (!auth.isLoggedIn) auth.setShowLogin(true);
                      else showHandler();
                    }}
                  >
                    Schedule inspection
                  </button>
                </div>
              </div>
            ) : (
              <p>No record found</p>
            )}
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <CircularProgress />
          </div>
        )}
      </div>

      <Modal show={show} onHide={closeHandler} animation={true} centered>
        <Modal.Header className="border-0" closeButton />
        <Modal.Body className="pb-5 px-5">
          <div className="text-center">
            <h2 className="my-0">Schedule Inspection</h2>
            <p className="text-dark my-0">Arrange your inspection with Ease</p>
            <p className="mb-2">{property?.title}</p>
          </div>
          <ScheduleInspectionForm property={property} onSuccess={() => {}} />
          {/* <LoginForm onSuccess={onLoginSuccessHandler} /> */}
        </Modal.Body>
      </Modal>

      <Modal show={showAR} onHide={handleCloseAR} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Property AR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-3 px-2 pb-4">
            <Canvas frameloop="demand" style={{ height: '500px' }}>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls />
              <Model
                url={`${process.env.API_BASE_URL}/${prepareImageUrl(
                  property?.arModelUrl.path
                )}`}
              />
            </Canvas>

            {/* <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
              <Suspense fallback={null}>
                <Stage preset="rembrandt" intensity={1} environment="city"> 
          
            <ARComponent
              arModelUrl={`${process.env.API_BASE_URL}/${prepareImageUrl(
                property.arModelUrl.path
              )}`}
            />
            </Stage>
              </Suspense>
            Use OrbitControls for camera controls
            <OrbitControls />
            </Canvas> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PropertyDetail;
