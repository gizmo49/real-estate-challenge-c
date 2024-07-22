import { useState, useEffect } from 'react';
import { getPropertiesList } from '../utils/api';
import PropertyCard from '../components/common/PropertyCard';
import FullPageError from '../components/common/FullPageError';
import SearchForm from '../components/common/SearchForm';
import Pagination from '../components/common/Pagination';
import { GetPropertiesResponse, GetPropertyResponse } from '@/types';


const Home = () => {
    const [properties, setProperties] = useState<GetPropertyResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useState({
        city: 'Los Angeles',
        state_code: 'CA',
        offset: 0,
        limit: 20,
        sort: 'newest',
        price_min: 0,
        price_max: 1000000,
        type: [],
    });

    const fetchProperties = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: GetPropertiesResponse = await getPropertiesList(searchParams);
            setProperties(response.data.home_search.results);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [searchParams]);

    const totalPages = properties && properties.length > 0 ? Math.ceil(properties.length / searchParams.limit) : 1;

    return (
        <div className="container mx-auto">
            <SearchForm
                defaultLocation={`${searchParams.city}, ${searchParams.state_code}`}
                defaultPriceRange={`${searchParams.price_min}-${searchParams.price_max}`}
                defaultTypes={searchParams.type}
                onSearch={(params: any) => setSearchParams({ ...searchParams, ...params })}
            />
            {loading ? (
                <div className='text-center'>Loading...</div>
            ) : error ? (
                <FullPageError message={error} onRetry={fetchProperties} />
            ) : (
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {properties?.length > 0 ? properties.map((property) => (
                            <PropertyCard key={property.property_id} property={property} />
                        )) : (
                            <div className="text-center">No Results</div>
                        )}
                    </div>
                    <Pagination
                        currentPage={searchParams.offset / searchParams.limit + 1}
                        totalPages={totalPages}
                        onPageChange={(page: number) => setSearchParams({ ...searchParams, offset: (page - 1) * searchParams.limit })}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
