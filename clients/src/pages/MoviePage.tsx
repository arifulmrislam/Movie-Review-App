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
        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/movie/${id}`
                );
                if (response.ok) {
                    const data = await response.json();

                    // Map API response to frontend expected format
                    const formattedMovie: Movie = {
                        id: data.movie_id.toString(),
                        title: data.title,
                        imageUrl: data.img, // Change from `img` to `imageUrl`
                        description: data.desc, // Change from `desc`
                        releaseDate: data.release_yr.toString(), // Change from `release_yr`
                        publisher: data.producer, // Change from `producer`
                        averageRating: data.rating ?? 0, // Handle null ratings
                    };

                    setMovie(formattedMovie);
                } else {
                    console.error('Failed to fetch movie');
                }
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        const fetchReviews = async () => {
            console.log('Fetching reviews for movie_id:', id);
            try {
                const response = await fetch(
                    `http://localhost:3000/api/review?movie_id=${Number(id)}`
                );
                if (!response.ok) {
                    // const data = await response.json();
                    // setReviews(data);
                    throw new Error('Failed to fetch reviews');
                }
                    const data = await response.json();
                    console.log('Fetched reviews:', data);

                    setReviews(data);  // Set the fetched reviews here
                
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchMovie();
        fetchReviews();
    }, [id]);
    const handleReviewSubmit = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/review/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rating,
                comment,
                user_id: 1,  // Ensure `currentUser.id` exists
                movie_id: id        // Ensure `movieId` exists
            }),
        });

        if (!response.ok) throw new Error('Failed to submit review');
        const newReview = await response.json();

        // Update the reviews state to include the new review
        setReviews((prevReviews) => [...prevReviews, newReview]);
        console.log('Review submitted successfully!');
    } catch (error) {
        console.error('Error submitting review:', error);
    }
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

    const averageReviewScore = reviews.length
        ? (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
        ).toFixed(1)
        : 'N/A';

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
                                    <strong>Average Rating:</strong> <span className="text-lg">{averageReviewScore}</span>
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