import * as yup from 'yup';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SubmitButton from '../form-controls/submit-button';
import HorizontalLabel from '../form-controls/horizontal-label';
import Input from '../form-controls/input';
import Radio from '../form-controls/radio';
import { apiV1, getApiV1Instance } from '../../utils/axios-instance';
import { toast } from 'react-toastify';
import { handleYupErrors } from '../../utils/yup-form-helpers';
import TextArea from '../form-controls/textarea';
import { useEffect, useState } from 'react';
import Select from '../form-controls/select';
import ClearIcon from '@mui/icons-material/Clear';
import { prepareImageUrl } from '../../utils/images';

const defaultValues = {
  name: '',
  description: '',
};

const CategoryForm = ({ updateList = () => {}, category = null }) => {
  const propertySchema = yup.object().shape({
    name: yup.string().required('category name is required'),
    description: yup.string(),
  });
  useEffect(() => {
    if (category) {
      methods.reset({ name: category.name, description: category.description });
    }
  }, []);
  const methods = useForm<FieldValues>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(propertySchema),
  });

  const categorySubmitHandler = async (data: any) => {
    try {
      if (category) {
        await getApiV1Instance().put(`/categories/${category.id}`, data);
        toast.success('Category updated successfully');
      } else {
        await getApiV1Instance().post('/categories', data);
        toast.success('Category created successfully');
      }
      methods.reset(defaultValues);
      updateList();
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
    <form onSubmit={methods.handleSubmit(categorySubmitHandler)}>
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12 d-flex flex-column justify-content-start">
              <HorizontalLabel label="Name" />
              <Input
                type="text"
                name="name"
                placeholder="Category name"
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
            <SubmitButton label="Add Category" type="submit" />
          </div>
        </div>
      </div>
    </form>
  );
};
export default CategoryForm;
