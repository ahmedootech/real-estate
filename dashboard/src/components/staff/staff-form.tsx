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
import { useEffect, useState } from 'react';
import Select from '../form-controls/select';

const defaultValues = {
  firstName: '',
  lastName: '',
  gender: '',
  phone: '',
  address: '',
  role: '',
  username: '',
  password: '12345',
};
const StaffForm = () => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const rolesRes = await apiV1.get('/staffs/roles');
        setRoles(rolesRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const staffSchema = yup.object().shape({
    firstName: yup.string().required('staff first name is required'),
    lastName: yup.string().required('staff last name is required'),
    gender: yup.string().required('gender is required'),
    phone: yup.string().required('contact phone is required'),
    address: yup.string().required('address is required'),
    role: yup.string().required('role is required'),
    username: yup.string().required('contact phone is required'),
    password: yup.string().required('contact phone is required'),
  });

  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(staffSchema),
  });

  const staffSubmitHandler = async (data: any) => {
    try {
      const res = await apiV1.post('/auth/staff/register', data);
      methods.reset(defaultValues);
      toast.success('Staff created successfully');
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
    <form onSubmit={methods.handleSubmit(staffSubmitHandler)}>
      <div className="row">
        <div className="col-lg-2 d-flex align-items-center">
          <HorizontalLabel label="Staff's Name" />
        </div>
        <div className="col-lg-5">
          <Input
            type="text"
            name="firstName"
            placeholder="First"
            control={methods.control}
          />
        </div>
        <div className="col-lg-5">
          <Input
            type="text"
            name="lastName"
            placeholder="Last"
            control={methods.control}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-2">
          <HorizontalLabel label="Gender" />
        </div>
        <div className="col-lg-5">
          <div className="d-flex">
            <Radio
              name="gender"
              value="Male"
              label="Male"
              register={methods.register}
            />
            <Radio
              name="gender"
              value="Female"
              label="Female"
              register={methods.register}
            />
          </div>
          {methods.formState.errors['gender'] && (
            <p className="form-text text-danger p-0 m-0">
              {methods.formState.errors['gender'].message}
            </p>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-2">
          <HorizontalLabel label="Phone" />
        </div>
        <div className="col-lg-5">
          <Input
            type="text"
            name="phone"
            placeholder="0803#######"
            control={methods.control}
            onChange={(e) => {
              methods.setValue('username', e.target.value);
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-2">
          <HorizontalLabel label="Staff's address" />
        </div>
        <div className="col-lg-10">
          <Input
            type="text"
            name="address"
            placeholder="Staff full address"
            control={methods.control}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-2 d-flex align-items-center">
          <HorizontalLabel label="Role" />
        </div>
        <div className="col-lg-5">
          <Select control={methods.control} name="role">
            <option value="">---Choose Role---</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-2">
          <HorizontalLabel label="Staff's Login" />
        </div>
        <div className="col-lg-5">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            control={methods.control}
          />
        </div>
        <div className="col-lg-5">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            control={methods.control}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <SubmitButton label="Add Staff" type="submit" />
      </div>
    </form>
  );
};
export default StaffForm;
