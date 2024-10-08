import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  name: string;
  label?: string;
  rows?: number;
  placeholder?: string;
  controllerProps: UseFormRegisterReturn;
  error?: string;
}

const INPUT_BASE = "border-b p-2 w-full transition duration-150 ease-in-out";

export const TextInput = ({
  name,
  label,
  error,
  rows,
  placeholder,
  controllerProps,
}: TextInputProps) => {
  const errorClassName = error ? "border-red-500" : "border-gray-400";
  const focusClassName = error
    ? "focus:border-red-600"
    : "focus:border-blue-500";

  const inputProps = {
    id: name,
    placeholder,
    className: `${INPUT_BASE} ${errorClassName} ${focusClassName}`,
    ...controllerProps,
  };

  return (
    <div className="grid grid-cols-1 gap-1">
      {label && (
        <label
          htmlFor={name}
          className={`text-xs ${error ? "text-red-500" : "text-gray-600"}`}
        >
          {label}
        </label>
      )}

      {rows ? (
        <textarea rows={rows} {...inputProps} />
      ) : (
        <input {...inputProps} />
      )}

      {error && (
        <div>
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};
