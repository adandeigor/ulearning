import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import ThemedText from "../typography";
import clsx from "clsx";

interface ThemedFileInputType {
  name: string;
  isRequired: boolean;
  errorText: string;
  label: string;
  placeholder: string;
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  accept?: string;
  multiple?: boolean;
}

const ThemedFileInput = ({
  name,
  isRequired,
  errorText,
  label,
  placeholder,
  disabled,
  register,
  errors,
  accept,
  multiple = false,
}: ThemedFileInputType) => {
  return (
    <>
      <label htmlFor={name}>
        <ThemedText color="dark" weight="bold" variant="title">
          {label}
        </ThemedText>
      </label>
      <div
        className={clsx(
          "border border-solid rounded-[4px] px-[18px] py-[16px] text-small-text min-w-[320px] hover:border-primary focus:border-primary flex flex-col gap-2 disabled:bg-gray-soft w-full",
          errors[name] && "border-red focus:border-red hover:border-red"
        )}
      >
        <input
          type="file"
          id={name}
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          {...register(name, { required: isRequired })}
          className={clsx(
            "focus:outline-none hover:outline-none text-dark placeholder:text-gray disabled:bg-gray-soft w-full"
          )}
          placeholder={placeholder}
        />
      </div>
      {errors[name] && (
        <ThemedText color="red" variant="small-text">
          {errorText}
        </ThemedText>
      )}
    </>
  );
};

export default ThemedFileInput;
