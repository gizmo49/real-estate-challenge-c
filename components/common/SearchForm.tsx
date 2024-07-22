import { useState } from 'react';
import LocationDropdown from './LocationDropdown';
import Button from '../ui/Button';
import CustomSelect from '../ui/CustomSelect/CustomSelect';

interface SearchFormProps {
    defaultLocation: string;
    defaultPriceRange: string;
    defaultTypes: string[];
    onSearch: (params: any) => void;
}

const SearchForm = ({ defaultLocation, defaultPriceRange, defaultTypes, onSearch }: SearchFormProps) => {
    const [selectedLocation, setSelectedLocation] = useState<string>(defaultLocation);
    const [priceRange, setPriceRange] = useState<string>(defaultPriceRange);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(defaultTypes);

    const handleSearch = () => {
        onSearch({ selectedLocation, priceRange, type: selectedTypes });
    };

    const priceOptions = [
        { value: '', label: 'Select Price Range' },
        { value: '0-100000', label: '$0 - $100,000' },
        { value: '100000-500000', label: '$100,000 - $500,000' },
        { value: '500000-1000000', label: '$500,000 - $1,000,000' },
        { value: '1000000+', label: '$1,000,000+' },
    ];

    const typeOptions = [
        { value: 'house', label: 'House' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'condo', label: 'Condo' },
    ];

    return (
        <div className="flex justify-center items-center px-4 gap-4 my-4 w-fit border mx-auto rounded-[32px] ">
            <LocationDropdown value={selectedLocation} onLocationSelect={setSelectedLocation} />
            <div className="my-4">
                <CustomSelect
                    isMulti
                    value={typeOptions.filter(option => selectedTypes.includes(option.value))}
                    onChange={(options: any) => setSelectedTypes((options as { value: string }[]).map(option => option.value))}
                    options={typeOptions}
                    placeholder="Property Type"
                />
            </div>
            <div className="my-4">
                <CustomSelect
                    value={priceOptions.find(option => option.value === priceRange)}
                    onChange={(option: any) => setPriceRange((option as { value: string }).value)}
                    options={priceOptions}
                    placeholder="Price Range"
                />
            </div>
            <button
                className={`arrow-btn`}
                onClick={handleSearch}
            >
                <img src="search.svg" className="" alt="Search" />
            </button>
        </div>
    );
};

export default SearchForm;
