export const handleYupErrors = ({ formFields, serverError, yupSetError }) => {
  Object.keys(formFields).map((field) => {
    let fieldError = serverError.find((error) => error.field === field);
    yupSetError(field, {
      type: 'manual',
      message: fieldError?.message,
    });
  });
};
