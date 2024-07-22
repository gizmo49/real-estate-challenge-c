interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    className?: string;
}

const Input = ({ value, onChange, placeholder, type = 'text', className = '' }: InputProps) => (
    <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border p-2 rounded w-full ${className}`}
    />
);

export default Input;
