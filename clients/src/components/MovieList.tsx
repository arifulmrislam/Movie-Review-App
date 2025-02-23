import type React from 'react';
import MovieCard from './MovieCard';
import { Tv } from 'lucide-react'; // Import the TV icon

interface Movie {
    id: string;
    title: string;
    imageUrl: string;
    averageRating: number;
    genres: string[]; // Add genres field
}

interface MovieListProps {
    title: string;
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
    return (
        <div className='my-8'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-2xl font-bold uppercase text-white'>{title}</h2>{' '}
                {/* White text for better contrast */}
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {movies.map((movie) => (
                    <div key={movie.id}>
                        <MovieCard {...movie} />
                        <div className='font-medium text-sm mt-1 text-gray-300'>
                            {/* Genres with TV icons */}
                            {movie.genres.map((genre, index) => (
                                <div key={index} className='flex items-center space-x-2'>
                                    <Tv className='w-5 h-5 text-blue-400' />{' '}
                                    {/* Blue icon for better visibility */}
                                    <span className='text-gray-900 font-semibold'>{genre}</span>{' '}
                                    {/* Softer gray text for readability */}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
