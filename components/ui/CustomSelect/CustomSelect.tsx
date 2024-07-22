import React from 'react';
import Select, { Props as SelectProps } from 'react-select';
import styles from './CustomSelect.module.css';

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        borderColor: 'transparent',
        boxShadow: 'none',
        '&:hover': {
            borderColor: 'transparent',
        },
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#e0e7ff' : state.isSelected ? '#a5b4fc' : undefined,
        color: state.isSelected ? 'white' : undefined,
        fontSize: '12px',  
    }),
    container: (provided: any) => ({
        ...provided,
        border: 'none',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        fontSize: '12px',  
    }),
    input: (provided: any) => ({
        ...provided,
        border: 'none',
        fontSize: '12px', 
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    indicatorsContainer: (provided: any) => ({
        ...provided,
        border: 'none',
    }),
};
const CustomSelect = <OptionType extends { label: string; value: string }>({
    options,
    ...props
}: SelectProps<OptionType>) => {
    return (
        <Select
            className={styles.customSelect}
            styles={customStyles}
            options={options}
            {...props}
        />
    );
};

export default CustomSelect;
