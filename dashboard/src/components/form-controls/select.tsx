import { Controller, Control, useFormContext } from 'react-hook-form';
interface SelectProps {
  label?: string;
  name: string;
  control: Control;
  children: React.ReactNode;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select: React.FC<SelectProps> = ({
  label,
  name,
  children,
  disabled,
  control,
  onChange,
}) => {
  // const { control } = useFormContext();
  return (
    <div className="py-1">
      {label && (
        <label htmlFor="" className="form-label fw-bold">
          {label}:
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <select
              className={`form-select py-2 px-2 shadow-none`}
              {...field}
              disabled={disabled}
              onChange={(event) => {
                field.onChange(event); // React-hook-form's change handling
                if (onChange) {
                  onChange(event); // Call the provided onChange if available
                }
              }}
            >
              {children}
            </select>
            {error && (
              <p className="form-text text-danger p-0 m-0">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};
export default Select;
