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
      <label className="block text-amber-200 text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full bg-gray-700 border border-gray-600 focus:border-amber-400 text-gray-100 placeholder-gray-500 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
      />
    </div>
  );
}

export function TextArea({ label, value, onChange, placeholder, rows = 3 }: TextAreaProps) {
  return (
    <div>
      <label className="block text-amber-200 text-sm font-medium mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-gray-700 border border-gray-600 focus:border-amber-400 text-gray-100 placeholder-gray-500 rounded-lg px-3 py-2 text-sm outline-none transition-colors resize-none"
      />
    </div>
  );
}
