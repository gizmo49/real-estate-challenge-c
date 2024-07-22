import React from 'react';
import Modal from 'react-modal';

interface PhotoModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    images: string[];
    selectedImage: string | null;
    onImageSelect: (imageSrc: string) => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, onRequestClose, images, selectedImage, onImageSelect }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Image Gallery"
            className="w-full max-w-4xl mx-auto p-4 bg-white relative"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <button
                className="absolute top-2 right-2 text-white text-2xl"
                onClick={onRequestClose}
            >
                &times;
            </button>
            {selectedImage && (
                <img
                    src={selectedImage}
                    alt="Selected Property"
                    className="w-full h-auto object-contain"
                />
            )}
            <div className="flex mt-4 overflow-auto">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Gallery Image ${index}`}
                        className="w-32 h-32 object-cover cursor-pointer mx-2"
                        onClick={() => onImageSelect(image)}
                    />
                ))}
            </div>
        </Modal>
    );
};

export default PhotoModal;
