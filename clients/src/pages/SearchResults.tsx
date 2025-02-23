'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, Calendar } from 'lucide-react';

// Define TypeScript interface for movie data
interface Movie {
    id: string;
    title: string;
    imageUrl: string;
    releaseYear: string;
    length: string;
    description: string;
    averageRating: number;
}

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:3000/api/movie?title=${query}`
                );

                if (Array.isArray(response.data) && response.data.length > 0) {
                    const formattedMovies: Movie[] = response.data.map((movie) => ({
                        id: movie.movie_id.toString(),
                        title: movie.title,
                        imageUrl: movie.img || '/placeholder.svg',
                        releaseYear: movie.release_yr.toString(),
                        length: movie.length ? movie.length.toString() : 'N/A',
                        description: movie.desc,
                        averageRating: movie.rating ?? 0.0, // Default to 0 if no rating
                    }));
                    setMovies(formattedMovies);
                } else {
                    setMovies([]);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError('Failed to fetch movies');
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchMovies();
    }, [query]);

    return (
        <div className='min-h-screen bg-red-100 text-white'>
            <main className='container mx-auto px-4 py-8'>
                <div className='mb-8 text-center'>
                    <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                        Search Results for <span className='text-red-500'>" {query} "</span>
                    </h2>
                </div>

                {loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white'></div>
                    </div>
                ) : error ? (
                    <p className='text-red-500 text-center mt-4'>{error}</p>
                ) : movies.length === 0 ? (
                    <p className='text-center mt-4 text-xl'>No movies found.</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className='bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105'
                            >
                                <img
                                    src={movie.imageUrl}
                                    alt={movie.title}
                                    className='w-full h-80 object-cover'
                                />
                                <div className='p-4'>
                                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                                        {movie.title}
                                    </h3>
                                    <div className='flex items-center text-sm text-gray-400 mb-2'>
                                        <Calendar className='mr-1' />
                                        <span>{movie.releaseYear}</span>
                                        <Clock className='ml-4 mr-1' />
                                        <span>{movie.length}</span>
                                    </div>
                                    <p className='text-sm text-gray-500 mb-4 line-clamp-3'>
                                        {movie.description}
                                    </p>
                                    <a
                                        href={`/movies/${movie.id}`}
                                        className='block w-full text-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition'
                                    >
                                        View Details
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
