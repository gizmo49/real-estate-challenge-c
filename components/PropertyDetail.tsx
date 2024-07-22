import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPropertyDetails } from '../utils/api';
import PropertyReview from './common/PropertyReview';
import { GetDetailedPropertyResponse } from '@/types/response';
import PhotoModal from './modal/PhotoModal';

interface PropertyDetailProps {
    initialData?: GetDetailedPropertyResponse;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ initialData }) => {
    const [property, setProperty] = useState<GetDetailedPropertyResponse | null | undefined>(initialData);
    const [loading, setLoading] = useState<boolean>(!initialData);
    const [error, setError] = useState<string | null>(null);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage(null);
    };

    const handleImageSelect = (imageSrc: string) => {
        setSelectedImage(imageSrc);
    };


    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!initialData && id) {
            const loadPropertyDetails = async () => {
                try {
                    const data = await getPropertyDetails(id as string);
                    setProperty(data.data);
                } catch (error: any) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            loadPropertyDetails();
        }
    }, [id, initialData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (<>

        {property ? (
            <div className="container mx-auto p-4">
                <div className="mb-6">
                    {/* Display Property Images */}
                    <div className="grid grid-cols-4 gap-4 max-w-full overflow-auto">
                        {property.home.photos.slice(0, 20).map(photo => (
                            <div
                                key={photo.href}
                                className="relative cursor-pointer"
                                onClick={() => {
                                    setSelectedImage(photo.href);
                                    openModal();
                                }}
                            >
                                <img
                                    src={photo.href}
                                    alt="Property Image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    {property.home.photos.length > 20 && (
                        <button
                            className="mt-4 text-blue-500 underline"
                            onClick={openModal}
                        >
                            View All Images
                        </button>
                    )}
                </div>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-4">{property.home.location.address.line}</h1>
                    <p className="text-xl font-semibold mb-2">${property.home.list_price.toLocaleString()}</p>
                    <p className="text-lg mb-2">
                        {property.home.location.address.city}, {property.home.location.address.state_code}
                    </p>
                    <p className="text-gray-700 mb-4">
                        {property.home.description.sub_type} - {property.home.description.beds} Beds, {property.home.description.baths} Baths
                    </p>
                    <p className="text-gray-700 mb-4">{property.home.description.text}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Agent Details</h2>
                    {property.home.advertisers.length > 0 && (
                        <div>
                            {property.home.advertisers[0].name && (
                                <p className="text-lg">{property.home.advertisers[0].name}</p>
                            )}
                            {property.home.advertisers[0].phones.map(phone => (
                                <p key={phone.number} className="text-lg">{phone.number}</p>
                            ))}
                        </div>
                    )}
                </div>
                <PropertyReview propertyId={id as string} />
            </div>
        ) : null}

        {modalIsOpen && property && <PhotoModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            images={property.home.photos.map(photo => photo.href)}
            selectedImage={selectedImage}
            onImageSelect={handleImageSelect}
        />}

    </>)

};

export default PropertyDetail;
