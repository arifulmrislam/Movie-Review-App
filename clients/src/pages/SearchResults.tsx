'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, Clock, Calendar } from 'lucide-react';

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
    const [searchInput, setSearchInput] = useState(query);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/api/movie?title=${query}`);

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `/search?query=${encodeURIComponent(searchInput)}`;
    };

    return (
        <div className='min-h-screen bg-gray-900 text-white'>
            <main className='container mx-auto px-4 py-8'>
                <h2 className='text-3xl font-bold text-center mb-8'>Search Results for "{query}"</h2>

                <form onSubmit={handleSearch} className='mb-6 flex justify-center'>

                </form>

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
                                className='bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105'
                            >
                                <img src={movie.imageUrl} alt={movie.title} className='w-full h-80 object-cover' />
                                <div className='p-4'>
                                    <h3 className='text-xl font-semibold mb-2'>{movie.title}</h3>
                                    <div className='flex items-center mb-2 text-yellow-400'>
                                        {/* <Star className='w-5 h-5' />
                                        <span className='text-lg ml-1'>{movie.averageRating.toFixed(1)}</span> */}
                                    </div>
                                    <div className='flex items-center text-sm text-gray-400 mb-2'>
                                        <Calendar className='mr-1' />
                                        <span>{movie.releaseYear}</span>
                                        <Clock className='ml-4 mr-1' />
                                        <span>{movie.length}</span>
                                    </div>
                                    <p className='text-sm text-gray-300 mb-4 line-clamp-3'>{movie.description}</p>
                                    <a
                                        href={`/movies/${movie.id}`}
                                        className='block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                                    >
                                        View Details
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className='bg-gray-800 py-6 mt-12'>
                <div className='container mx-auto px-4 text-center text-gray-400'>
                    <p>&copy; {new Date().getFullYear()} MovieReviewApp. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
