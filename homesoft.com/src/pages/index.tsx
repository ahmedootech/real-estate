import { useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';

import Wrapper from '../components/ui/wrapper';
import PropertyCard from '../components/property/property-card';
import Testimony from '../components/ui/testimony-card';

const ViewAll = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      {/* <CurrentPage pageTitle="view-all" /> */}
      <div className="container-fluid py-4">
        <div className="row px-0">
          <div className="col px-0">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <Image
                  src="/assets/images/house.jpg"
                  layout="responsive"
                  width={5000}
                  height={2300}
                  alt="home image"
                  className="d-block w-100"
                />
              </Carousel.Item>

              <Carousel.Item>
                <Image
                  src="/assets/images/house2.jpg"
                  layout="responsive"
                  width={5000}
                  height={2300}
                  alt="home image"
                  className="d-block w-100"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      <Wrapper
        title="Our agents & partners"
        description="Our team of dedicated agents and trusted partners are here to help you find your dream home."
      >
        <div className="col">
          <Image
            src={'/assets/images/dantata.jpg'}
            alt="logo"
            layout="responsive"
            width={500}
            height={200}
          />
        </div>
        <div className="col">
          <Image
            src={'/assets/images/private.png'}
            alt="logo"
            layout="responsive"
            width={500}
            height={200}
          />
        </div>
        <div className="col bg-warning">
          <Image
            src={'/assets/images/propertypro.svg'}
            alt="logo"
            layout="responsive"
            width={500}
            height={200}
          />
        </div>
        <div className="col">
          <Image
            src={'/assets/images/logo-dark.png'}
            alt="logo"
            layout="responsive"
            width={500}
            height={200}
          />
        </div>
        <div className="col">
          <Image
            src={'/assets/images/transparent_logo.png'}
            alt="logo"
            layout="responsive"
            width={500}
            height={200}
          />
        </div>
        <div className="col">
          <Image
            src={'/assets/images/sky.png'}
            alt="logo"
            layout="responsive"
            width={500}
            height={200}
          />
        </div>
      </Wrapper>

      <Wrapper
        title="Properties for sale"
        description="Explore our diverse portfolio of properties available for sale. We ensure a smooth and rewarding experience as you embark on your journey to find your dream home"
        linkURL="/properties/for-sale"
        linkLabel="View properties for sale"
        withLink
        btnColor="danger"
      />

      <Wrapper
        title="Properties to rent"
        description="Explore our diverse range of rental properties. Count on us to make your search for the perfect rental home a smooth and rewarding experience."
        linkURL="/properties/to-rent"
        linkLabel="View properties to rent"
        withLink
        btnColor="warning"
      />

      <Wrapper
        title="Testimonials"
        description="Discover what our clients have to say about their experiences with us. From exceptional service to successful outcomes, read firsthand testimonials that showcase our commitment to excellence and client satisfaction."
      >
        <div className="row">
          <div className="col-lg-4">
            <Testimony
              src="/assets/images/passport.jpg"
              testimony="I highly recommend Homesoft to anyone looking to buy or sell property. Their professionalism and dedication exceeded my expectations. Thank you for making the process smooth and stress-free!"
              name="John D."
              position="Customer"
            />
          </div>
          <div className="col-lg-4">
            <Testimony
              src="/assets/images/lady.jpg"
              testimony="From the moment I contacted Homesoft, I knew I was in good hands. Their attention to detail and personalized service truly set them apart. I am grateful for their guidance in finding the perfect rental property."
              name="Emily L."
              position="Customer"
            />
          </div>
          <div className="col-lg-4">
            <Testimony
              src="/assets/images/guy.jpg"
              testimony="As a first-time homebuyer, I was nervous about the process, but Homesoft made it easy and enjoyable. They listened to my needs and found me the perfect home within my budget. I couldn't be happier with the outcome!"
              name="Michael P."
              position="Customer"
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
};
export default ViewAll;
