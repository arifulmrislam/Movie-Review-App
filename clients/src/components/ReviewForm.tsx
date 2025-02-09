'use client';

import type React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface ReviewFormProps {
    movieId: string;
    onReviewSubmit: (review: { rating: number; comment: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ movieId, onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { user } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onReviewSubmit({ rating, comment });
        setRating(0);
        setComment('');
    };

    if (!user) {
        return <p>Please log in to leave a review.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className='mt-6'>
            <div className='mb-4'>
                <label htmlFor='rating' className='block mb-2'>
                    Rating:
                </label>
                <select
                    id='rating'
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className='w-full px-3 py-2 border rounded-md'
                    required
                >
                    <option value=''>Select a rating</option>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                            {value} stars
                        </option>
                    ))}
                </select>
            </div>
            <div className='mb-4'>
                <label htmlFor='comment' className='block mb-2'>
                    Comment:
                </label>
                <textarea
                    id='comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='w-full px-3 py-2 border rounded-md'
                    rows={4}
                    required
                ></textarea>
            </div>
            <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
            >
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;
