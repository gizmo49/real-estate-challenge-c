import React from 'react';
import Select from 'react-select';

interface MultiSelectProps {
    value: string[];
    onChange: (value: string[]) => void;
    options: { value: string; label: string }[];
}

const MultiSelect = ({ value, onChange, options }: MultiSelectProps) => {
    const handleChange = (selectedOptions: any) => {
        onChange(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
    };

    return (
        <Select
            isMulti
            value={options.filter(option => value.includes(option.value))}
            onChange={handleChange}
            options={options}
            className="react-select-container"
            classNamePrefix="react-select"
        />
    );
};

export default MultiSelect;
