import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import ThemedText from "../typography"
import clsx from "clsx";
interface TextAreaProps{
    defaultValue?: string;
      name: string;
      isRequired: boolean;
      errorText: string;
      disabled: boolean;
      label: string;
      register: UseFormRegister<FieldValues>;
      errors: FieldErrors<FieldValues>
}
const ThemedTextArea = ({
    defaultValue,
    name,
    isRequired,
    errorText,
    disabled,
    label,
    register,
    errors
}:TextAreaProps)=>{
    return (
         <>
            <div className="flex flex-col gap-2">
                <label htmlFor={name}> <ThemedText variant="title" weight="bold" color="dark">{label}</ThemedText> </label>
                <textarea  id={name}className={clsx("w-full h-52 text-small-text p-5 hover:outline-none border border-gray rounded-lg hover:border-primary focus:outline-none focus:border-primary", errors.name && "border-red hover:border-red ")} {...register(name, {required:isRequired})} disabled={disabled} defaultValue={defaultValue}>
                </textarea>
                {errors.name && <ThemedText variant="small-text" color="red">{errorText}</ThemedText>}
            </div>
         </>
    )
}

export default ThemedTextArea