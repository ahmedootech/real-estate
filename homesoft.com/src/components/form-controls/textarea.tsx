import {
  Controller,
  useFormContext,
  FieldError,
  Control,
} from 'react-hook-form';
interface InputProps {
  label?: string;
  name: string;
  required?: boolean;
  control: Control;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextArea: React.FC<InputProps> = ({
  label,
  name,
  disabled,
  control,
  onChange,
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
            <textarea
              rows={5}
              className={`form-control py-2 px-2 shadow-none`}
              placeholder={label}
              {...field}
              disabled={disabled}
              onChange={(event) => {
                field.onChange(event); // React-hook-form's change handling
                if (onChange) {
                  onChange(event); // Call the provided onChange if available
                }
              }}
            ></textarea>
            {error ? (
              <p className="form-text text-danger p-0 m-0">{error.message}</p>
            ) : null}
          </>
        )}
      />
    </div>
  );
};
export default TextArea;
