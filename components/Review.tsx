import React from 'react';
import { Review as ReviewType } from '../types';

interface ReviewProps {
    review: ReviewType;
}

const Review: React.FC<ReviewProps> = ({ review }) => (
    <div className="p-4 border rounded-lg">
        <p>{review.comment}</p>
        <div className="flex items-center mt-2">
            <img src={review.user.image} alt={review.user.name} className="w-8 h-8 rounded-full" />
            <p className="ml-2">{review.user.name}</p>
        </div>
    </div>
);

export default Review;
