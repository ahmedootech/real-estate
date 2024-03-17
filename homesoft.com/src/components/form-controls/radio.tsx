import React from 'react';
import {
  Controller,
  useFormContext,
  FieldError,
  Control,
  RegisterOptions,
  UseFormRegister,
  FieldName,
  FieldValue,
} from 'react-hook-form';
interface InputProps {
  label?: string;
  value: string;
  name: string;
  required?: boolean;
  register: UseFormRegister<any>;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.EventHandler<any>) => void;
}
const Radio: React.FC<InputProps> = ({
  name,
  value,
  label,
  register,
  required,
}) => {
  return (
    <>
      <label className="form-label">
        <input
          type="radio"
          name={name}
          value={value}
          {...register(name, { required })}
        />
        <span className="ms-1 me-3">{label}</span>
      </label>
    </>
  );
};

export default Radio;
