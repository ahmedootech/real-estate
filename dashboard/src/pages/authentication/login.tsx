import Input from '../../components/form-controls/input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SubmitButton from '../../components/form-controls/submit-button';
import { useRouter } from 'next/router';
import BlankLayout from '../../layout/blank-layout';

import { apiV1 } from '../../utils/axios-instance';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Login = () => {
  const router = useRouter();

  const signInSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { username: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(signInSchema),
  });

  const loginHandler = async (data) => {
    try {
      const response = await apiV1.post('/auth/staff/login', data);
      Cookies.set('token', response.data.jwt);
      const me = await apiV1.get('/auth/me', {
        headers: { Authorization: response.data.jwt },
      });
      Cookies.set('user', JSON.stringify(me.data));

      toast.success('login successful');
      router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h5 className="fw-semibold mt-2 mb-2">Login</h5>
      </div>
      <form action="" onSubmit={handleSubmit(loginHandler)} autoComplete="off">
        <Input
          type="text"
          label="Username"
          name="username"
          required={true}
          control={control}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          required
          control={control}
        />
        <p className="form-text py-0 my-0 text-primary fw-semibold">
          Forget password?
        </p>
        <SubmitButton label="Login" />
      </form>
    </>
  );
};

Login.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
Login.onlyGuest = true;
export default Login;
