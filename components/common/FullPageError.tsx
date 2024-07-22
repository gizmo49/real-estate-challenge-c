import React from 'react';
import Button from '../ui/Button';

interface FullPageErrorProps {
    message: string;
    onRetry: () => void;
}

const FullPageError: React.FC<FullPageErrorProps> = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-lg mb-4">{message}</p>
            <Button
                onClick={onRetry}
                // className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Retry
            </Button>
        </div>
    );
};

export default FullPageError;
