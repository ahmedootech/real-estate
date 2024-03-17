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
import TextArea from '../form-controls/textarea';

const defaultValues = {
  date: '',
  time: '',
  message: '',
};

const ScheduleInspectionForm = ({ onSuccess, property }) => {
  const scheduleInspectionSchema = yup.object().shape({
    date: yup.string().required('inspection date is required'),
    time: yup.string().required('inspection time is required'),
    message: yup.string(),
  });

  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(scheduleInspectionSchema),
  });

  const createScheduleHandler = async (data) => {
    try {
      const res = await getApiV1Instance().post('/inspections/', {
        ...data,
        agent: property.agent.id,
        property: property.id,
      });
      methods.reset(defaultValues);
      toast.success('Inspection scheduled successfully');
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
        onSubmit={methods.handleSubmit(createScheduleHandler)}
        autoComplete="off"
      >
        <div className="row">
          <div className="col-lg-12">
            <Input
              type="date"
              label="Preferred Inspection Date"
              name="date"
              required={true}
              control={methods.control}
            />
          </div>
          <div className="col-lg-12">
            <Input
              type="time"
              label="Preferred Inspection Time"
              name="time"
              required={true}
              control={methods.control}
            />
          </div>
          <div className="col-lg-12">
            <TextArea
              control={methods.control}
              name="message"
              label="Additional Message (if any)"
            />
          </div>
        </div>

        <SubmitButton label="Schedule Inspection" />
      </form>
    </>
  );
};
export default ScheduleInspectionForm;
