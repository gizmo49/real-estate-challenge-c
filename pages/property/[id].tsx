import React from 'react';
import { GetServerSideProps } from 'next';
import PropertyDetail from '../../components/PropertyDetail';
import { getPropertyDetails } from '../../utils/api';

interface PropertyPageProps {
    initialData: any; // Define proper type based on API response
    error?: string;
}

const PropertyPage: React.FC<PropertyPageProps> = ({ initialData, error }) => {
    if (error) {
        return <div className="text-red-500">Failed to load property details: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <PropertyDetail initialData={initialData} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    try {
        const data = await getPropertyDetails(id as string);
        return {
            props: {
                initialData: data.data,
            },
        };
    } catch (error: any) {
        return {
            props: {
                error: error.message,
            },
        };
    }
};

export default PropertyPage;
