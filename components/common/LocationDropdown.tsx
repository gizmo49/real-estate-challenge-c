import { useState, useEffect } from 'react';
import { getLocations } from '../../utils/api';
import { SingleValue, MultiValue, ActionMeta } from 'react-select';
import CustomSelect from '../ui/CustomSelect/CustomSelect';

interface LocationOption {
    label: string;
    value: string;
}

interface LocationDropdownProps {
    value: string;
    onLocationSelect: (location: string) => void;
}

const LocationDropdown = ({ value, onLocationSelect }: LocationDropdownProps) => {
    const [locations, setLocations] = useState<LocationOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async (input: string) => {
            setLoading(true);
            setError(null);
            try {
                const data = await getLocations(input);
                const locationOptions = data.autocomplete.map((location: any) => ({
                    value: location.city,
                    label: `${location.city}, ${location.state_code}`
                }));
                setLocations(locationOptions);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations(value);
    }, [value]);

    const handleChange = (
        newValue: SingleValue<LocationOption> | MultiValue<LocationOption> | any,
        actionMeta: ActionMeta<LocationOption>
    ) => {
        if (newValue && !Array.isArray(newValue)) {
            onLocationSelect(newValue.value);
        }
    };

    return (
        <div className="my-4">
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <CustomSelect
                value={locations.find(option => option.value === value) || null}
                onChange={handleChange}
                options={locations}
                isClearable
                placeholder="Location"
            />
        </div>
    );
};

export default LocationDropdown;
