import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Send, Edit, Trash } from 'lucide-react';
import { toast } from 'react-toastify';

interface Review {
    rr_id: number;
    rating: number;
    review: string;
    user: { name: string };
}

interface MovieReviewsProps {
    movieId: string;
    onReviewAdded: () => void; // Function to trigger re-fetch
}

const MovieReviews: React.FC<MovieReviewsProps> = ({
    movieId,
    onReviewAdded,
}) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/review?movie_id=${Number(movieId)}`
                );
                if (!response.ok) throw new Error('Failed to fetch reviews');
                const data = await response.json();

                const formattedReviews = Array.isArray(data)
                    ? data.map((review) => ({
                        rr_id: review.rr_id,
                        rating: review.rating,
                        review: review.review,
                        user: {
                            name: review.user?.name || 'Unknown',
                            id: review.user_id || review.user?.id,
                        },
                    }))
                    : [];

                setReviews(formattedReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [movieId]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to post a review.');
            return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.id;

        const url = editMode
            ? `http://localhost:3000/api/review/${reviewToEdit!.rr_id}`
            : `http://localhost:3000/api/review/`;

        const method = editMode ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rating,
                    review: comment,
                    user_id: userId,
                    movie_id: movieId,
                }),
            });

            if (!response.ok) throw new Error('Failed to submit review');

            // Re-fetch updated reviews
            const fetchReviews = async () => {
                try {
                    const response = await fetch(
                        `http://localhost:3000/api/review?movie_id=${Number(movieId)}`
                    );
                    if (!response.ok) throw new Error('Failed to fetch reviews');
                    const data = await response.json();
                    setReviews(data);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                }
            };

            fetchReviews();

            // Trigger movie details update to reflect new average rating
            onReviewAdded();

            setComment('');
            setRating(5);
            setEditMode(false);
            setReviewToEdit(null);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const renderStars = (rating: number) =>
        Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
            >
                ★
            </span>
        ));

    const handleEdit = (rr_id: number | undefined) => {
        if (!rr_id) {
            console.error('Invalid review ID for editing');
            toast.error('Invalid review ID.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('User is not logged in.');
            toast.error('You must be logged in to edit a review.');
            return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.id;

        const selectedReview = reviews.find((r) => r.rr_id === rr_id);
        if (!selectedReview) {
            console.error('Review not found for editing');
            toast.error('Review not found.');
            return;
        }

        // Ensure user_id exists in selectedReview
        // if (!selectedReview.user || selectedReview.user.id !== userId) {
        //     console.error('You are not the owner of this review.');
        //     toast.error('You can only edit your own reviews.');
        //     return;
        // }

        console.log('Editing review with ID:', rr_id);
        setEditMode(true);
        setReviewToEdit(selectedReview);
        setComment(selectedReview.review);
        setRating(selectedReview.rating);
    };

    const handleDelete = async (rr_id: number | undefined) => {
        if (!rr_id) {
            console.error('Invalid review ID for deletion');
            toast.error('Invalid review ID.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('User is not logged in.');
            toast.error('You must be logged in to delete a review.');
            return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.id;

        const selectedReview = reviews.find((r) => r.rr_id === rr_id);
        if (!selectedReview) {
            console.error('Review not found for deletion');
            toast.error('Review not found.');
            return;
        }

        try {
            console.log('Attempting to delete review with ID:', rr_id);

            const response = await fetch(
                `http://localhost:3000/api/review/${rr_id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error('Failed to delete review');

            // Remove the review from the list
            setReviews((prevReviews) =>
                prevReviews.filter((review) => review.rr_id !== rr_id)
            );

            toast.success('Review deleted successfully.');

            // Re-fetch movie details to update the average rating
            onReviewAdded(); // This will trigger a re-fetch of the movie details
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Failed to delete review.');
        }
    };


    return (
        <div className='p-8 bg-gray-50 min-h-screen'>
            <h2 className='text-3xl font-bold mb-8 text-gray-900'>Reviews</h2>
            <div className='grid gap-8 md:grid-cols-2'>
                {reviews.map((review) => (
                    <div
                        key={review.rr_id}
                        className='p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow'
                    >
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <User className='w-6 h-6 mr-2 text-gray-600' />
                                <strong className='text-gray-900'>{review.user?.name}</strong>
                                {/* <p className='text-gray-600 ml-2'>{review.review}</p> */}
                            </div>
                            <div className='flex space-x-3'>
                                <button
                                    onClick={() => handleEdit(review.rr_id)}
                                    className='text-blue-500 hover:text-blue-700 focus:outline-none transition-colors'
                                >
                                    <Edit className='w-5 h-5' />
                                </button>
                                <button
                                    onClick={() => handleDelete(review.rr_id)}
                                    className='text-red-500 hover:text-red-700 focus:outline-none transition-colors'
                                >
                                    <Trash className='w-5 h-5' />
                                </button>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className='flex items-center gap-2 mb-3'>
                                <div className='flex'>{renderStars(review.rating)}</div>
                                <span className='text-gray-600'>({review.rating}/5)</span>
                            </div>
                            <p className='text-gray-700 mb-4'>{review.review}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Review Form */}
            <div className='max-w-2xl mt-12'>
                <form
                    onSubmit={handleReviewSubmit}
                    className='bg-white p-8 rounded-xl shadow-lg'
                >
                    <h3 className='text-2xl font-semibold mb-6 text-gray-900'>
                        Add Your Review
                    </h3>
                    <div className='mb-6'>
                        <label className='block mb-3 font-medium text-gray-700'>
                            Rating
                        </label>
                        <div className='flex gap-2'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    type='button'
                                    onClick={() => setRating(value)}
                                    className={`text-3xl ${value <= rating ? 'text-yellow-400' : 'text-gray-300'
                                        } hover:text-yellow-500 transition-colors`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='mb-6'>
                        <label
                            htmlFor='comment'
                            className='block mb-3 font-medium text-gray-700'
                        >
                            Your Review
                        </label>
                        <textarea
                            id='comment'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            rows={4}
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                            placeholder='Share your thoughts about the movie...'
                        />
                    </div>
                    <button
                        type='submit'
                        className='flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors'
                    >
                        <Send className='w-5 h-5' />
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MovieReviews;