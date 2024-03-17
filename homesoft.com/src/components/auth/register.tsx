import { yupResolver } from '@hookform/resolvers/yup';
import { getApiV1Instance } from '../../utils/axios-instance';
import Input from '../form-controls/input';
import SubmitButton from '../form-controls/submit-button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import RadioGroup from '../form-controls/radio-group';
import Radio from '../form-controls/radio';
import { handleYupErrors } from '../../utils/yup-form-helpers';

const defaultValues = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  phone: '',
  gender: '',
  address: '',
};

const RegisterForm = ({ onSuccess }) => {
  const registerSchema = yup.object().shape({
    firstName: yup.string().required('first name is required'),
    lastName: yup.string().required('last name is required'),
    username: yup.string().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
    gender: yup.string().required(),
    address: yup.string().required(),
  });

  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  });

  const createUserHandler = async (data) => {
    try {
      const res = await getApiV1Instance().post('/auth/users/register', data);
      methods.reset(defaultValues);
      toast.success('Account created successfully');
      onSuccess();
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
    <>
      <div className="d-flex flex-column align-items-center"></div>
      <form
        action=""
        onSubmit={methods.handleSubmit(createUserHandler)}
        autoComplete="off"
      >
        <div className="row">
          <div className="col-lg-6">
            <Input
              type="text"
              label="First name"
              name="firstName"
              required={true}
              control={methods.control}
            />
          </div>
          <div className="col-lg-6">
            <Input
              type="text"
              label="Last name"
              name="lastName"
              required={true}
              control={methods.control}
            />
          </div>
          <div className="col-lg-6">
            <Input
              type="text"
              label="Phone"
              name="phone"
              required={true}
              control={methods.control}
            />
          </div>
          <div className="col-lg-6">
            <RadioGroup
              label="Gender"
              name="gender"
              errors={methods.formState.errors}
            >
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
            </RadioGroup>
          </div>
          <div className="col-lg-6">
            <Input
              type="text"
              label="Username"
              name="username"
              required={true}
              control={methods.control}
            />
          </div>
          <div className="col-lg-6">
            <Input
              type="password"
              name="password"
              label="Password"
              required
              control={methods.control}
            />
          </div>
        </div>
        <div className="col-lg-12">
          <Input
            type="text"
            name="address"
            label="Address"
            required
            control={methods.control}
          />
        </div>
        <SubmitButton label="Create account" />
      </form>
    </>
  );
};
export default RegisterForm;
