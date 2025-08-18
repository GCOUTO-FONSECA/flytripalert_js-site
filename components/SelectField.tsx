type Option = { value: string; label: string; disabled?: boolean };

type SelectFieldProps = {
  id: string;
  label: string;
  options: Option[];
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
};

export default function SelectField({
  id,
  label,
  options,
  placeholder = "Selecione",
  defaultValue = "",
  required,
  onChange,
  className = "",
  name,
}: SelectFieldProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <select
        id={id}
        name={name ?? id}
        className="mt-1 rounded-xl border px-3 py-2"
        defaultValue={defaultValue}
        required={required}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            disabled={opt.disabled}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}