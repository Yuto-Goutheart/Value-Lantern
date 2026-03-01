interface TextInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}

interface TextAreaProps extends TextInputProps {
  rows?: number;
}

export function TextInput({ label, value, onChange, placeholder, maxLength }: TextInputProps) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="field-input"
      />
    </div>
  );
}

export function TextArea({ label, value, onChange, placeholder, rows = 3 }: TextAreaProps) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="field-textarea"
      />
    </div>
  );
}
