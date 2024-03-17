import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import HorizontalLabel from '../form-controls/horizontal-label';
import Input from '../form-controls/input';
import { useForm } from 'react-hook-form';
import Select from '../form-controls/select';
import SubmitButton from '../form-controls/submit-button';
import { apiV1 } from '../../utils/axios-instance';
import { toast } from 'react-toastify';
import { handleYupErrors } from '../../utils/yup-form-helpers';
import { useEffect } from 'react';

const defaultValues = {
  overview: '',
  parks: '',
  schools: '',
  shopping: '',
  restaurants: '',
  entertainment: '',
  publicTransit: '',
  majorHighways: '',
  crimeRate: '',
  policeStations: '',
  fireStations: '',
};

const neighborhoodSchema = yup.object().shape({
  overview: yup.string().required('Overview is required'),
  parks: yup.string().required('Parks are required'),
  schools: yup.string().required('Schools are required'),
  shopping: yup.string().required('Shopping places are required'),
  restaurants: yup.string().required('Restaurants are required'),
  entertainment: yup.string().required('Entertainment places are required'),
  publicTransit: yup.string().required('Public Transit is required'),
  majorHighways: yup.string().required('Major Highways are required'),
  crimeRate: yup.string().required('Crime Rate is required'),
  policeStations: yup.string().required('Police Stations are required'),
  fireStations: yup.string().required('Fire Stations are required'),
});
const NeighborhoodForm = ({
  propertyId,
  reloadData,
  closeModal,
  neighborhoodInfo,
}) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(neighborhoodSchema),
  });

  useEffect(() => {
    if (neighborhoodInfo) {
      const propertyValues = {
        overview: neighborhoodInfo.overview,
        parks: neighborhoodInfo.amenities.parks,
        schools: neighborhoodInfo.amenities.schools,
        shopping: neighborhoodInfo.amenities.shopping,
        restaurants: neighborhoodInfo.amenities.restaurants,
        entertainment: neighborhoodInfo.amenities.entertainment,
        publicTransit: neighborhoodInfo.transportation.publicTransit,
        majorHighways: neighborhoodInfo.transportation.majorHighways,
        crimeRate: neighborhoodInfo.safety.crimeRate,
        policeStations: neighborhoodInfo.safety.policeStations,
        fireStations: neighborhoodInfo.safety.fireStations,
      };
      methods.reset(propertyValues);
    }
  }, []);

  const neighborhoodSubmitHandler = async (data) => {
    try {
      const res = await apiV1.put(
        `/properties/${propertyId}/neighborhood`,
        data
      );
      toast.success('Neighborhood information updated successfully');
      closeModal();
      reloadData();
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;
      if (errors[0].field) {
        handleYupErrors({
          formFields: data,
          serverError: errors,
          yupSetError: methods.setError,
        });
      } else {
        toast.error(errors[0].message);
      }
    }
  };
  return (
    <form onSubmit={methods.handleSubmit(neighborhoodSubmitHandler)}>
      <p className="form-text text-end m-0 p-0">
        Use comma separation for more than one value{' '}
      </p>
      <div className="row align-items-start">
        <div className="col-lg-12 d-flex flex-column justify-content-start">
          <HorizontalLabel label="Overview" />
          <Input
            type="text"
            name="overview"
            placeholder="Neighborhood Overview"
            control={methods.control}
          />
        </div>
      </div>
      {/* Parks */}
      <div className="row align-items-start">
        <div className="col-lg-6 d-flex flex-column justify-content-start">
          <HorizontalLabel label="Schools" />
          <Input
            type="text"
            name="schools"
            placeholder="Schools"
            control={methods.control}
          />
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-start">
          <HorizontalLabel label="Parks" />
          <Input
            type="text"
            name="parks"
            placeholder="Parks"
            control={methods.control}
          />
        </div>
      </div>

      <div className="row align-items-start">
        <div className="col-lg-6 d-flex flex-column justify-content-start">
          <HorizontalLabel label="Shopping" />
          <Input
            type="text"
            name="shopping"
            placeholder="Shopping places"
            control={methods.control}
          />
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-start">
          <HorizontalLabel label="Restaurants" />
          <Input
            type="text"
            name="restaurants"
            placeholder="Restaurants"
            control={methods.control}
          />
        </div>
      </div>

      {/* Entertainment */}
      <div className="row align-items-start">
        <div className="col-lg-6 d-flex flex-column justify-content-start">
          <HorizontalLabel label="Entertainment" />
          <Input
            type="text"
            name="entertainment"
            placeholder="Entertainment places"
            control={methods.control}
          />
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-start">
          <HorizontalLabel label="Public Transit" />
          <Input
            type="text"
            name="publicTransit"
            placeholder="Public Transit"
            control={methods.control}
          />
        </div>
      </div>

      {/* Major Highways */}
      <div className="row align-items-start">
        <div className="col-lg-6 d-flex flex-column justify-content-end">
          <HorizontalLabel label="Major Highways" />
          <Input
            type="text"
            name="majorHighways"
            placeholder="Major Highways"
            control={methods.control}
          />
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-end">
          {/* <HorizontalLabel label="Crime Rate" /> */}
          <Select name="crimeRate" control={methods.control} label="Crime Rate">
            <option value="">Select crime rate---</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </div>
      </div>

      {/* Police Stations */}
      <div className="row align-items-start">
        <div className="col-lg-6 d-flex flex-column justify-content-start">
          <HorizontalLabel label="Police Stations" />
          <Input
            type="text"
            name="policeStations"
            placeholder="Police Stations"
            control={methods.control}
          />
        </div>

        <div className="col-lg-6 d-flex flex-column justify-content-start">
          <HorizontalLabel label="Fire Stations" />
          <Input
            type="text"
            name="fireStations"
            placeholder="Fire Stations"
            control={methods.control}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <SubmitButton label="Update Neighborhood Info" type="submit" />
      </div>
    </form>
  );
};

export default NeighborhoodForm;
