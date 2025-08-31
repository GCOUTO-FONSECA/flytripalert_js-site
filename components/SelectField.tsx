// Define o tipo Option para representar cada opção do select
type Option = { value: string; label: string; disabled?: boolean };

// Define as propriedades esperadas pelo componente SelectField
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
  value?: string;
};

// Componente SelectField que renderiza um campo de seleção personalizado
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
  value,
}: SelectFieldProps) {
  // Define se o select será controlado ou não, dependendo se 'value' foi passado
  const controlledProps = value !== undefined
    ? { value }
    : { defaultValue };

  return (
    // Container flexível para o label e o select
    <div className={`flex flex-col ${className}`}>
      {/* Renderiza o label do campo */}
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {/* Renderiza o elemento select com as opções */}
      <select
        id={id}
        name={name ?? id}
        className="mt-1 rounded-xl border px-3 py-2"
        required={required}
        onChange={(e) => onChange?.(e.target.value)}
        {...controlledProps}
      >
        {/* Renderiza a opção de placeholder, desabilitada */}
        <option value="" disabled>{placeholder}</option>
        {/* Mapeia e renderiza cada opção recebida via props */}
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