import { yupResolver } from '@hookform/resolvers/yup';
import { getApiV1Instance } from '../../utils/axios-instance';
import Input from '../form-controls/input';
import SubmitButton from '../form-controls/submit-button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { handleYupErrors } from '../../utils/yup-form-helpers';

const LoginForm = ({ onSuccess }) => {
  const signInSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const methods = useForm({
    defaultValues: { username: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(signInSchema),
  });

  const loginUserHandler = async (data) => {
    try {
      const response = await getApiV1Instance().post('/auth/users/login', data);
      Cookies.set('token', response.data.jwt);
      const me = await getApiV1Instance().get('/auth/me', {
        headers: { Authorization: response.data.jwt },
      });
      Cookies.set('user', JSON.stringify(me.data));

      toast.success('login successful');
      onSuccess();
      //   router.push('/dashboard');
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
        onSubmit={methods.handleSubmit(loginUserHandler)}
        autoComplete="off"
      >
        <Input
          type="text"
          label="Username"
          name="username"
          required={true}
          control={methods.control}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          required
          control={methods.control}
        />
        {/* <p className="form-text py-0 my-0 text-primary fw-semibold">
          Forget password?
        </p> */}
        <SubmitButton label="Login" />
      </form>
    </>
  );
};
export default LoginForm;
