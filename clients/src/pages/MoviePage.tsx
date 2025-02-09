'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';

interface Movie {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    releaseDate: string;
    publisher: string;
    averageRating: number;
}

interface Review {
    id: string;
    rating: number;
    comment: string;
    author: string;
}

const MoviePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        // Fetch movie details and reviews
        // For now, we'll use mock data
        const mockMovie: Movie = {
            id: id || '1',
            title: 'Sample Movie',
            imageUrl: '/placeholder.svg',
            description: 'This is a sample movie description.',
            releaseDate: '2023-01-01',
            publisher: 'Sample Publisher',
            averageRating: 4.2,
        };
        setMovie(mockMovie);

        const mockReviews: Review[] = [
            { id: '1', rating: 4, comment: 'Great movie!', author: 'User1' },
            { id: '2', rating: 5, comment: 'Loved it!', author: 'User2' },
        ];
        setReviews(mockReviews);
    }, [id]);

    const handleReviewSubmit = (newReview: {
        rating: number;
        comment: string;
    }) => {
        const review: Review = {
            id: String(reviews.length + 1),
            ...newReview,
            author: 'Current User', // Replace with actual user name
        };
        setReviews([...reviews, review]);
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='flex flex-col md:flex-row gap-8'>
                <img
                    src={movie.imageUrl || '/placeholder.svg'}
                    alt={movie.title}
                    className='w-full md:w-1/3 rounded-lg'
                />
                <div>
                    <h1 className='text-3xl font-bold mb-4'>{movie.title}</h1>
                    <p className='mb-2'>
                        <strong>Release Date:</strong> {movie.releaseDate}
                    </p>
                    <p className='mb-2'>
                        <strong>Publisher:</strong> {movie.publisher}
                    </p>
                    <p className='mb-4'>
                        <strong>Average Rating:</strong> {movie.averageRating.toFixed(1)}
                    </p>
                    <p className='mb-4'>{movie.description}</p>
                </div>
            </div>
            <div className='mt-8'>
                <h2 className='text-2xl font-bold mb-4'>Reviews</h2>
                {reviews.map((review) => (
                    <div key={review.id} className='mb-4 p-4 bg-white rounded-lg shadow'>
                        <div className='flex items-center mb-2'>
                            <span className='text-yellow-500 mr-1'>★</span>
                            <span>{review.rating}</span>
                        </div>
                        <p className='mb-2'>{review.comment}</p>
                        <p className='text-sm text-gray-500'>By {review.author}</p>
                    </div>
                ))}
                <ReviewForm movieId={movie.id} onReviewSubmit={handleReviewSubmit} />
            </div>
        </div>
    );
};

export default MoviePage;
