import React, { useState } from 'react';

interface SearchBarProps {
    setSearchParams: (params: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchParams }) => {
    const [city, setCity] = useState('');
    const [stateCode, setStateCode] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [propertyType, setPropertyType] = useState('');

    const handleSearch = () => {
        setSearchParams({
            city,
            state_code: stateCode,
            price_min: parseInt(priceMin) || 0,
            price_max: parseInt(priceMax) || 1000000,
            property_type: propertyType,
        });
    };

    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-2 mr-2"
            />
            <input
                type="text"
                placeholder="State Code"
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="border p-2 mr-2"
            />
            <input
                type="number"
                placeholder="Min Price"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="border p-2 mr-2"
            />
            <input
                type="number"
                placeholder="Max Price"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="border p-2 mr-2"
            />
            <input
                type="text"
                placeholder="Property Type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="border p-2 mr-2"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
                Search
            </button>
        </div>
    );
};

export default SearchBar;
