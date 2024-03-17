import {
  Controller,
  useFormContext,
  FieldError,
  Control,
} from 'react-hook-form';
interface InputProps {
  label?: string;
  placeholder?: string;
  type: string;
  name: string;
  required?: boolean;
  control: Control;
  disabled?: boolean;
  value?: string;
  list?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  name,
  disabled,
  control,
  value,
  list,
  onChange,
  onFocus,
  onBlur,
}) => {
  // const { control } = useFormContext();
  return (
    <div className="py-1">
      {label && (
        <label htmlFor="" className={`form-label fw-bold`}>
          {label}:
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              type={type}
              className={`form-control py-2 px-2 shadow-none`}
              placeholder={placeholder ? placeholder : label}
              value={value ? value : field.value}
              list={list}
              {...field}
              disabled={disabled}
              onChange={(event) => {
                field.onChange(event); // React-hook-form's change handling
                if (onChange) {
                  onChange(event); // Call the provided onChange if available
                }
              }}
              onFocus={(event) => {
                if (onFocus) {
                  onFocus(event); // Call the provided onChange if available
                }
              }}
              onBlur={(event: any) => {
                if (onBlur) {
                  onBlur(event); // Call the provided onChange if available
                }
              }}
            />
            {error ? (
              <p className="form-text text-danger p-0 m-0">{error.message}</p>
            ) : null}
          </>
        )}
      />
    </div>
  );
};
export default Input;
