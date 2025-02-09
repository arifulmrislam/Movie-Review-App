// 'use client';
// 
// import type React from 'react';
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ReviewForm from '../components/ReviewForm';
// 
// interface Movie {
//     id: string;
//     title: string;
//     imageUrl: string;
//     description: string;
//     releaseDate: string;
//     publisher: string;
//     averageRating: number;
// }
// 
// interface Review {
//     id: string;
//     rating: number;
//     comment: string;
//     author: string;
// }
// 
// const MoviePage: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const [movie, setMovie] = useState<Movie | null>(null);
//     const [reviews, setReviews] = useState<Review[]>([]);
// 
//     useEffect(() => {
//         // Fetch movie details and reviews
//         // For now, we'll use mock data
//         const mockMovie: Movie = {
//             id: id || '1',
//             title: 'Sample Movie',
//             imageUrl: '/placeholder.svg',
//             description: 'This is a sample movie description.',
//             releaseDate: '2023-01-01',
//             publisher: 'Sample Publisher',
//             averageRating: 4.2,
//         };
//         setMovie(mockMovie);
// 
//         const mockReviews: Review[] = [
//             { id: '1', rating: 4, comment: 'Great movie!', author: 'User1' },
//             { id: '2', rating: 5, comment: 'Loved it!', author: 'User2' },
//         ];
//         setReviews(mockReviews);
//     }, [id]);
// 
//     const handleReviewSubmit = (newReview: {
//         rating: number;
//         comment: string;
//     }) => {
//         const review: Review = {
//             id: String(reviews.length + 1),
//             ...newReview,
//             author: 'Current User', // Replace with actual user name
//         };
//         setReviews([...reviews, review]);
//     };
// 
//     if (!movie) {
//         return <div>Loading...</div>;
//     }
// 
//     return (
//         <div>
//             <div className='flex flex-col md:flex-row gap-8'>
//                 <img
//                     src={movie.imageUrl || '/placeholder.svg'}
//                     alt={movie.title}
//                     className='w-full md:w-1/3 rounded-lg'
//                 />
//                 <div>
//                     <h1 className='text-3xl font-bold mb-4'>{movie.title}</h1>
//                     <p className='mb-2'>
//                         <strong>Release Date:</strong> {movie.releaseDate}
//                     </p>
//                     <p className='mb-2'>
//                         <strong>Publisher:</strong> {movie.publisher}
//                     </p>
//                     <p className='mb-4'>
//                         <strong>Average Rating:</strong> {movie.averageRating.toFixed(1)}
//                     </p>
//                     <p className='mb-4'>{movie.description}</p>
//                 </div>
//             </div>
//             <div className='mt-8'>
//                 <h2 className='text-2xl font-bold mb-4'>Reviews</h2>
//                 {reviews.map((review) => (
//                     <div key={review.id} className='mb-4 p-4 bg-white rounded-lg shadow'>
//                         <div className='flex items-center mb-2'>
//                             <span className='text-yellow-500 mr-1'>★</span>
//                             <span>{review.rating}</span>
//                         </div>
//                         <p className='mb-2'>{review.comment}</p>
//                         <p className='text-sm text-gray-500'>By {review.author}</p>
//                     </div>
//                 ))}
//                 <ReviewForm movieId={movie.id} onReviewSubmit={handleReviewSubmit} />
//             </div>
//         </div>
//     );
// };
// 
// export default MoviePage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Building2, Star, User, Send } from 'lucide-react';
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
    const { id } = useParams<{
        id: string;
    }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    useEffect(() => {
        const mockMovie: Movie = {
            id: id || '1',
            title: 'Sample Movie',
            imageUrl:
                'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
            description:
                'This is a sample movie description that would typically contain a brief synopsis of the movie plot and other relevant details about the film.',
            releaseDate: '2023-01-01',
            publisher: 'Sample Publisher',
            averageRating: 4.2,
        };
        setMovie(mockMovie);
        const mockReviews: Review[] = [
            {
                id: '1',
                rating: 4,
                comment: 'Great movie!',
                author: 'User1',
            },
            {
                id: '2',
                rating: 5,
                comment: 'Loved it!',
                author: 'User2',
            },
        ];
        setReviews(mockReviews);
    }, [id]);
    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const review: Review = {
            id: String(reviews.length + 1),
            rating,
            comment,
            author: 'Current User', // Replace with actual user name
        };
        setReviews([...reviews, review]);
        setRating(5);
        setComment('');
    };
    const renderStars = (rating: number) => {
        return Array.from(
            {
                length: 5,
            },
            (_, index) => (
                <span
                    key={index}
                    className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                >
                    ★
                </span>
            )
        );
    };
    if (!movie) {
        return <div>Loading...</div>;
    }
    return (
        <div className='min-h-screen w-full bg-gray-50'>
            <main className='max-w-6xl mx-auto p-6'>
                <div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
                    <div className='flex flex-col md:flex-row gap-8'>
                        <img
                            src={movie.imageUrl || '/placeholder.svg'}
                            alt={movie.title}
                            className='w-full md:w-1/3 rounded-lg object-cover h-[400px]'
                        />
                        <div className='flex-1'>
                            <h1 className='text-4xl font-bold mb-6 text-gray-800'>
                                {movie.title}
                            </h1>
                            <div className='space-y-4 mb-6'>
                                <p className='flex items-center gap-2 text-gray-600'>
                                    <Calendar className='w-5 h-5' />
                                    <strong>Release Date:</strong> {movie.releaseDate}
                                </p>
                                <p className='flex items-center gap-2 text-gray-600'>
                                    <Building2 className='w-5 h-5' />
                                    <strong>Publisher:</strong> {movie.publisher}
                                </p>
                                <p className='flex items-center gap-2 text-gray-600'>
                                    <Star className='w-5 h-5 text-yellow-400' />
                                    <strong>Average Rating:</strong>{' '}
                                    <span className='text-lg'>
                                        {movie.averageRating.toFixed(1)}
                                    </span>
                                </p>
                            </div>
                            <p className='text-gray-700 leading-relaxed'>
                                {movie.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='mb-8'>
                    <h2 className='text-2xl font-bold mb-6 text-gray-800'>Reviews</h2>
                    <div className='grid gap-6 md:grid-cols-2'>
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className='p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'
                            >
                                <div className='flex items-center gap-2 mb-3'>
                                    <div className='flex'>{renderStars(review.rating)}</div>
                                    <span className='text-gray-600'>({review.rating}/5)</span>
                                </div>
                                <p className='text-gray-700 mb-4'>{review.comment}</p>
                                <div className='flex items-center gap-2 text-sm text-gray-500'>
                                    <User className='w-4 h-4' />
                                    <span>{review.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='max-w-2xl'>
                    <form
                        onSubmit={handleReviewSubmit}
                        className='bg-white p-6 rounded-lg shadow-md'
                    >
                        <h3 className='text-xl font-semibold mb-4'>Add Your Review</h3>
                        <div className='mb-4'>
                            <label className='block mb-2 font-medium'>Rating</label>
                            <div className='flex gap-2'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        type='button'
                                        onClick={() => setRating(value)}
                                        className={`text-2xl ${value <= rating ? 'text-yellow-400' : 'text-gray-300'
                                            } hover:text-yellow-400 transition-colors`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='comment' className='block mb-2 font-medium'>
                                Your Review
                            </label>
                            <textarea
                                id='comment'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                rows={4}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                                placeholder='Share your thoughts about the movie...'
                            />
                        </div>
                        <button
                            type='submit'
                            className='flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors'
                        >
                            <Send className='w-4 h-4' />
                            Submit Review
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default MoviePage;