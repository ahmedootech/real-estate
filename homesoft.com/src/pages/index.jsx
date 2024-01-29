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
        title="Our Agents Partners"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Hic, distinctio iure eum at aliquid qui?"
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
        title="Properties to rent"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Hic, distinctio iure eum at aliquid qui?"
        linkURL="/"
        linkLabel="View more properties to rent"
        withLink
      >
        {Array(3)
          .fill(0)
          .map((property, index) => {
            return (
              <div className="col-lg-4" key={index}>
                <PropertyCard type="small" />
              </div>
            );
          })}
      </Wrapper>

      <Wrapper
        title="Properties for sale"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Hic, distinctio iure eum at aliquid qui?"
        linkURL="/"
        linkLabel="View more properties for sale"
        withLink
      >
        {Array(3)
          .fill(0)
          .map((property, index) => {
            return (
              <div className="col-lg-4" key={index}>
                <PropertyCard type="small" />
              </div>
            );
          })}
      </Wrapper>
      {/* <Wrapper
        title="New homes for sale"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Hic, distinctio iure eum at aliquid qui?"
        linkURL="/"
        linkLabel="View more new homes"
        withLink
      >
        {Array(3)
          .fill(0)
          .map((property, index) => {
            return (
              <div className="col-lg-4" key={index}>
                <PropertyCard type="small" />
              </div>
            );
          })}
      </Wrapper> */}

      <Wrapper
        title="Testimonials"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
        atque recusandae adipisci vel possimus ea, ex quaerat magni?
        Minima, voluptatibus."
      >
        {Array(6)
          .fill(0)
          .map((property, index) => {
            return (
              <div className="col-lg-4" key={index}>
                <Testimony
                  src="/assets/images/passport.jpg"
                  testimony="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quo dolore molestias itaque magni odit!"
                />
              </div>
            );
          })}
      </Wrapper>
    </>
  );
};
export default ViewAll;
