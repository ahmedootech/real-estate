import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SubmitButton from '../form-controls/submit-button';
import HorizontalLabel from '../form-controls/horizontal-label';
import Input from '../form-controls/input';
import Radio from '../form-controls/radio';
import { apiV1 } from '../../utils/axios-instance';
import { toast } from 'react-toastify';
import { handleYupErrors } from '../../utils/yup-form-helpers';
import TextArea from '../form-controls/textarea';
import { useEffect, useState } from 'react';
import Select from '../form-controls/select';

const defaultValues = {
  title: '',
  description: '',
  price: 0,
  state: '',
  lga: '',
  ward: '',
  address: {
    state: '',
    lga: '',
    ward: '',
    area: '',
    houseNoStreet: '',
  },
  bedrooms: 0,
  toilets: 0,
  sittingRooms: 0,
  agent: '',
};

const PropertyForm = () => {
  const [states, setStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [lgas, setLgas] = useState([]);
  const [selectedLgaId, setSelectedLgaId] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWardId, setSelectedWardId] = useState(null);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const statesRes = await apiV1.get('/location/states');
      setStates(statesRes.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const lgasRes = await apiV1.get(
        `/location/states/${selectedStateId}/lgas`
      );
      setLgas(lgasRes.data);
    };
    if (selectedStateId) getData();
  }, [selectedStateId]);

  useEffect(() => {
    const getData = async () => {
      const wardsRes = await apiV1.get(`/location/lgas/${selectedLgaId}/wards`);
      console.log('wards', wardsRes);
      setWards(wardsRes.data);
    };
    if (selectedLgaId) getData();
  }, [selectedLgaId]);

  useEffect(() => {
    const getData = async () => {
      const areasRes = await apiV1.get(
        `/location/wards/${selectedWardId}/areas`
      );

      console.log(areasRes);
      setAreas(areasRes.data);
    };
    if (selectedWardId) getData();
  }, [selectedWardId]);

  const propertySchema = yup.object().shape({
    title: yup.string().required('property title is required'),
    description: yup.string().required('property description is required'),
    price: yup
      .number()
      .typeError('only numbers are allowed')
      .min(1)
      .required('price is required'),
    bedrooms: yup
      .number()
      .typeError('only numbers are allowed')
      .min(1, 'minimum of 1')
      .required('bedrooms is required'),
    toilets: yup
      .number()
      .typeError('only numbers are allowed')
      .min(1, 'minimum of 1')
      .required('toilets is required'),
    sittingRooms: yup
      .number()
      .typeError('only numbers are allowed')
      .min(0, 'minimum of 0')
      .required('price is required'),
  });

  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(propertySchema),
  });

  const propertySubmitHandler = async (data: any) => {
    try {
      const res = await apiV1.post('/properties/create', data);
      methods.reset(defaultValues);
      toast.success('Property created successfully');
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
    <form onSubmit={methods.handleSubmit(propertySubmitHandler)}>
      <div className="row">
        <div className="col-lg-12 d-flex flex-column justify-content-start">
          <HorizontalLabel label="Title" />
          <Input
            type="text"
            name="title"
            placeholder="Property title"
            control={methods.control}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 d-flex flex-column">
          <HorizontalLabel label="Price" />
          <Input
            type="number"
            name="price"
            placeholder="Property price"
            control={methods.control}
          />
        </div>
      </div>

      <div className="row align-items-start">
        <div className="col-lg-4 d-flex flex-column">
          <HorizontalLabel label="Bed Rooms" />

          <Input
            type="number"
            name="bedrooms"
            placeholder="Number of bedrooms"
            control={methods.control}
          />
        </div>
        <div className="col-lg-4 d-flex flex-column">
          <HorizontalLabel label="Sitting rooms" />

          <Input
            type="number"
            name="sittingRooms"
            placeholder="Number of sitting rooms"
            control={methods.control}
          />
        </div>
        <div className="col-lg-4 d-flex flex-column">
          <HorizontalLabel label="Toilets" />
          <Input
            type="number"
            name="toilets"
            placeholder="Number of toilets"
            control={methods.control}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <Select
            control={methods.control}
            name="state"
            label="State"
            onChange={(e) => {
              setSelectedStateId(e.target.value);
            }}
          >
            <option>---Select State---</option>
            {states.map((state, index) => (
              <option value={state.id} key={index}>
                {state.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg-4">
          <Select
            control={methods.control}
            name="lga"
            label="Lga"
            onChange={(e) => {
              setSelectedLgaId(e.target.value);
            }}
          >
            <option>---Select Lga---</option>
            {lgas.map((lga, index) => (
              <option value={lga.id} key={index}>
                {lga.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg-4">
          <Select
            control={methods.control}
            name="ward"
            label="Ward"
            onChange={(e) => {
              setSelectedWardId(e.target.value);
            }}
          >
            <option>---Select Ward---</option>
            {wards.map((ward, index) => (
              <option value={ward.id} key={index}>
                {ward.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg-4">
          <Select control={methods.control} name="area" label="Area">
            <option>---Select Area---</option>
            {areas.map((area, index) => (
              <option value={area.id} key={index}>
                {area.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg-8">
          {/* <HorizontalLabel label="House No & Street " /> */}

          <Input
            type="number"
            label="House No & Street "
            name="houseNoStreet"
            placeholder="House No & Street"
            control={methods.control}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 d-flex flex-column justify-content-start">
          <HorizontalLabel label="Description" />
          <TextArea name="description" control={methods.control} />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <SubmitButton label="Add Property" type="submit" />
      </div>
    </form>
  );
};
export default PropertyForm;
