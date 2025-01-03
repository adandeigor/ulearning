import React from 'react';
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';



interface SelectFormProps {
  id: string; 
  label: string;
  options: { id: string; name: string }[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  requiredMessage?: string;
  defaultValue?: string;
}

const SelectForm = ({ id, label, options, register, errors, requiredMessage , defaultValue}: SelectFormProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id as string} className="block mb-2 text-sm font-semibold">
        {label}
      </label>
      <select
        id={id as string}
        {...register(id as string, { required: requiredMessage || "Ce champ est obligatoire" })}
        className="p-2 border rounded w-full"
        defaultValue={defaultValue}
      >
        <option value="">Sélectionnez une option</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
        
      </select>
      {errors[id] && (
        <span className="text-red-500 text-sm mt-1">
          {typeof errors[id]?.message === 'string' ? errors[id]?.message : ''}
        </span>
      )}
    </div>
  );
};

export default SelectForm;
