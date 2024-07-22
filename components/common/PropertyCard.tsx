import React from 'react';
import { motion } from 'framer-motion';
import { GetPropertyResponse } from '@/types';
import { useRouter } from 'next/router';


interface PropertyCardProps {
    property: GetPropertyResponse
}

const PropertyCard = ({ property }: PropertyCardProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/property/${property.property_id}`);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 cursor-pointer"
            onClick={handleClick}

        >
            <img src={property?.primary_photo?.href} alt="Property" className="w-full h-48 object-cover rounded-lg" />
            <div className="py-2">
                <h3 className="text-[16px] font-semibold">{property.location.address.line}</h3>
                <p className="text-gray-600 text-sm">{property.location.address.city}, {property.location.address.state_code}</p>
                <p className="text-[16px] font-bold">${property.list_price.toLocaleString()}</p>
                <p className="text-gray-800 text-sm mt-2">{property.description.sub_type} - {property.description.beds} Beds, {property.description.baths} Baths</p>
                <span className="text-blue-500 text-sm hover:underline mt-2 block">View Property</span>
            </div>
        </motion.div>
    )
};

export default PropertyCard;
