import * as yup from 'yup';
import { useForm, FieldValues } from 'react-hook-form';
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
import ClearIcon from '@mui/icons-material/Clear';

const defaultValues = {
  title: '',
  description: '',
  price: 0,
  bedrooms: 0,
  toilets: 0,
  sittingRooms: 0,
  state: '',
  lga: '',
  ward: '',
  area: '',
  houseNoStreet: '',
  images: [''],
};

const FILE_SIZE = 1024 * 1024 * 5;
const PropertyForm = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [lgas, setLgas] = useState([]);
  const [selectedLga, setSelectedLga] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);

  const [imageFields, setImageFields] = useState(['images[0]']);

  useEffect(() => {
    const getData = async () => {
      const statesRes = await apiV1.get('/location/states');
      setStates(statesRes.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const state = JSON.parse(selectedState);
      const lgasRes = await apiV1.get(`/location/states/${state.id}/lgas`);
      setLgas(lgasRes.data);
    };
    if (selectedState) getData();
  }, [selectedState]);

  useEffect(() => {
    const getData = async () => {
      const lga = JSON.parse(selectedLga);
      const wardsRes = await apiV1.get(`/location/lgas/${lga.id}/wards`);
      console.log('wards', wardsRes);
      setWards(wardsRes.data);
    };
    if (selectedLga) getData();
  }, [selectedLga]);

  useEffect(() => {
    const getData = async () => {
      const ward = JSON.parse(selectedWard);
      const areasRes = await apiV1.get(`/location/wards/${ward.id}/areas`);

      console.log(areasRes);
      setAreas(areasRes.data);
    };
    if (selectedWard) getData();
  }, [selectedWard]);

  const propertySchema = yup.object().shape({
    title: yup.string().required('property title is required'),
    description: yup.string().required('property description is required'),
    price: yup
      .number()
      .typeError('only numbers are allowed')
      .min(1, 'invalid property price')
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
    state: yup.string().required('state is required'),
    lga: yup.string().required('lga is required'),
    ward: yup.string().required('ward is required'),
    area: yup.string().required('area is required'),
    houseNoStreet: yup.string().required('houseNoStreet is required'),
    images: yup
      .array()
      .of(
        yup
          .mixed()
          .test('isImage', 'Please upload only image files', (value: any) => {
            const ALLOWED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];

            if (!value.length) return true; // No file is selected, consider it invalid.
            for (const image of value)
              if (!ALLOWED_FORMATS.includes(image.type)) return false;

            return true;
          })
          .test('fileSize', 'Please each image must be < 5MB', (value: any) => {
            if (!value.length) return true;
            for (const image of value) if (image.size > FILE_SIZE) return false;
            return true;
          })
      )
      .test('atLeastOneImage', 'At least one image is required', (value) => {
        return value && value.length >= 1;
      }),
  });

  const methods = useForm<FieldValues>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(propertySchema),
  });
  const addImageField = () => {
    console.log('imagesLength', imageFields.length);
    const newIndex = `images[${imageFields.length}]`;
    setImageFields([...imageFields, newIndex]);
    methods.setValue(newIndex, ''); // Initialize the new field with an empty value
  };
  const removeImageField = (index) => {
    if (index === 0) return;
    const updatedFields = [...imageFields];
    updatedFields[index] = '';
    // const removedField = updatedFields.splice(index, 1)[0]; // Get the removed field name
    methods.setValue(`imagePreview[${index}]`, '');
    methods.setValue(`images[${index}]`, ''); // Clear the value of the removed field
    methods.clearErrors(`images[${index}]`);
    setImageFields(updatedFields);
  };
  const imagePreview = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (event) => {
        resolve(event.target.result);
      };
    });
  };

  const propertySubmitHandler = async (data: any) => {
    if (data.images.every((image) => image === '')) {
      toast.error('No image uploaded');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('price', data.price);
      formData.append('bedrooms', data.bedrooms);
      formData.append('toilets', data.toilets);
      formData.append('sittingRooms', data.sittingRooms);
      formData.append('state', JSON.parse(data.state)._id);
      formData.append('lga', JSON.parse(data.lga)._id);
      formData.append('ward', JSON.parse(data.ward)._id);
      formData.append('area', JSON.parse(data.area)._id);
      formData.append('houseNoStreet', data.houseNoStreet);
      formData.append('description', data.description);

      data.images.forEach((image) => {
        if (image) formData.append(`images`, image[0]);
      });
      const res = await apiV1.post('/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
        <div className="col-lg-7">
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
                  console.log(e.target.value);
                  setSelectedState(e.target.value);
                }}
              >
                <option>---Select State---</option>
                {states.map((state, index) => (
                  <option value={JSON.stringify(state)} key={index}>
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
                  setSelectedLga(e.target.value);
                }}
              >
                <option>---Select Lga---</option>
                {lgas.map((lga, index) => (
                  <option value={JSON.stringify(lga)} key={index}>
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
                  setSelectedWard(e.target.value);
                }}
              >
                <option>---Select Ward---</option>
                {wards.map((ward, index) => (
                  <option value={JSON.stringify(ward)} key={index}>
                    {ward.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="col-lg-4">
              <Select
                control={methods.control}
                name="area"
                label="Area"
                onChange={(e) => {
                  setSelectedArea(e.target.value);
                }}
              >
                <option>---Select Area---</option>
                {areas.map((area, index) => (
                  <option value={JSON.stringify(area)} key={index}>
                    {area.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="col-lg-8">
              {/* <HorizontalLabel label="House No & Street " /> */}

              <Input
                type="text"
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
        </div>
        <div className="col-lg-5">
          <div className="my-2">
            {imageFields.map((fieldName, index) => {
              let indexPosition = String(fieldName).indexOf('[') + 1;
              let errorIndex = String(fieldName).charAt(
                String(fieldName).indexOf('[') + 1
              );

              return (
                fieldName && (
                  <div key={fieldName}>
                    <label htmlFor="images" className="d-block fw-bold mb-2">
                      Images:
                    </label>
                    {/* Display image preview */}
                    {methods.watch(`imagePreview[${index}]`) && (
                      <img
                        className=" mt"
                        style={{ maxHeight: '200px', objectFit: 'contain' }}
                        src={methods.watch(`imagePreview[${index}]`)}
                        alt={`Image Preview ${index}`}
                      />
                    )}
                    <div className="d-flex my-2">
                      <input
                        type="file"
                        multiple
                        name={fieldName}
                        {...methods.register(fieldName)}
                        className="form-control flex-grow-1"
                        onChange={async (e) => {
                          const file = e.target.files[0];

                          // Get and set image preview
                          const preview = await imagePreview(file);
                          methods.setValue(`imagePreview[${index}]`, preview);
                        }}
                      />
                      <button
                        className="btn text-danger"
                        type="button"
                        onClick={() => removeImageField(index)}
                      >
                        <ClearIcon />
                      </button>
                    </div>

                    {methods.formState.errors['images'] &&
                    methods.formState.errors['images'][errorIndex] ? (
                      <p className="form-text text-danger p-0 m-0">
                        {`${methods.formState.errors['images'][errorIndex]?.message}`}
                      </p>
                    ) : null}
                  </div>
                )
              );
            })}
            <button
              className="btn btn-secondary mt-2"
              type="button"
              onClick={addImageField}
            >
              Add Image
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <SubmitButton label="Add Property" type="submit" />
      </div>
    </form>
  );
};
export default PropertyForm;
