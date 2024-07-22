interface TextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
}

const Textarea = ({ value, onChange, placeholder, className = '' }: TextareaProps) => (
    <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border p-2 rounded w-full ${className}`}
        rows={4}
    />
);

export default Textarea;
