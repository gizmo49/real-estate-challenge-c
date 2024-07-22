import { useEffect, useState } from 'react';
import { addPropertyReview, getPropertyReviews } from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

interface PropertyReviewProps {
    propertyId: string;
}

const PropertyReview = ({ propertyId }: PropertyReviewProps) => {
    const { user } = useAuth();
    const [rating, setRating] = useState<number>(1);
    const [reviews, setReviews] = useState<any[]>([]);
    const [comment, setComment] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!user) {
            setError('You must be logged in to submit a review.');
            return;
        }

        try {
            await addPropertyReview(propertyId, {
                rating,
                comment,
                userId: user.uid
            });
            alert('Review submitted successfully');
            setRating(1);
            setComment('');
        } catch (err: any) {
            console.log("err", err);
            setError(err.message);
        }
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const fetchedReviews = await getPropertyReviews(propertyId);
                setReviews(fetchedReviews);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchReviews();
    }, [propertyId]);

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label className="block mb-2">Rating:</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    min="1"
                    max="5"
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Comment:</label>
                <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <Button onClick={handleSubmit}>Submit Review</Button>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                {reviews.map(review => (
                    <div key={review.id} className="mb-4 p-4 border rounded">
                        <p className="font-semibold">Rating: {review.rating}</p>
                        <p>{review.comment}</p>
                        <p className="text-sm text-gray-500">User: {review.userId}</p>
                        <p className="text-sm text-gray-500">Date: {new Date(review.timestamp.toDate()).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyReview;
