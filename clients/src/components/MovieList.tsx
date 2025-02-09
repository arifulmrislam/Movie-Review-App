import type React from 'react';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Movie {
    id: string;
    title: string;
    imageUrl: string;
    averageRating: number;
}

interface MovieListProps {
    title: string;
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
    return (
        <div className='my-8'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-bold uppercase'>{title}</h2>
                <div className='flex space-x-2'>
                    <button className='p-1 rounded-full hover:bg-gray-100'>
                        <ChevronLeft className='w-6 h-6' />
                    </button>
                    <button className='p-1 rounded-full hover:bg-gray-100'>
                        <ChevronRight className='w-6 h-6' />
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
