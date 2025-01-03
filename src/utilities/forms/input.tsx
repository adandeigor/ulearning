import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import ThemedText from "../typography";
import clsx from "clsx";
import { useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

interface ThemedInputsType {
  type: "text" | "password";
  placeholder: string;
  name: string;
  isRequired: boolean;
  errorText: string;
  disabled: boolean;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>
  minLength?: number;
  defaultValue?: string;
}

const ThemedInputs = ({
  name,
  type,
  isRequired,
  errorText,
  label,
  placeholder,
  disabled,
  register,
  errors,
  minLength,
  defaultValue
}: ThemedInputsType) => {
  const [visible, setVisible] = useState(false)

  const ToggleVisible=()=>{
    setVisible(!visible)
  }
  if (type ==='password') {
    return (
      <>
        <label htmlFor={name}>
        <ThemedText color="dark" weight="bold" variant="title">
          {label}
        </ThemedText>
      </label>
      <div className={clsx("border border-solid rounded-[4px] text-small-text min-w-[320px] hover:border-primary focus:border-primary flex flex-row items-center justify-between gap-2 disabled:bg-gray-soft w-full", errors[name] && "border-red focus:border-red hover:border-red")}>
        <input
          type={visible ? "text" : "password"}
          id={name}
          disabled={disabled}
          {...register(name, { required: isRequired, minLength: minLength })}
          className={clsx(" focus:outline-none hover:outline-none px-[18px] py-[16px]  active:outline-none text-dark placeholder:text-gray disabled:bg-gray-soft w-full ")}
          placeholder={placeholder}
        />
        <span>
          {
            visible ? <PiEyeLight  size={24} onClick={()=>ToggleVisible()} className="cursor-pointer"/> : <PiEyeSlashLight size={24} onClick={()=>ToggleVisible()} className="cursor-pointer" />
          }
        </span>
      </div>
      {errors[name] && (
        <ThemedText color="red" variant="small-text">
          {errorText}
        </ThemedText>
      )}
      </>
    )
  }
  return (
    <>
      <label htmlFor={name}>
        <ThemedText color="dark" weight="bold" variant="title">
          {label}
        </ThemedText>
      </label>
      <input
        type={type}
        id={name}
        value={defaultValue}
        disabled={disabled}
        {...register(name, { required: isRequired })}
        className={clsx("border border-solid rounded-[4px] px-[18px] py-[16px] text-small-text min-w-[320px] focus:outline-none hover:outline-none active:outline-none hover:border-primary disabled:bg-gray-soft", errors[name] && "border-red")}
        placeholder={placeholder}
      />
      {errors[name] && (
        <ThemedText color="red" variant="small-text">
          {errorText}
        </ThemedText>
      )}
    </>
  );
};

export default ThemedInputs;
