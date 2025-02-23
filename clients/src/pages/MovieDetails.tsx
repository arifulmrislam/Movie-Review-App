import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Building2, Star, Clock } from 'lucide-react';
import MovieReviews from './MovieReviews';

interface Movie {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    releaseDate: string;
    publisher: string;
    averageRating: number;
    length: number;
}

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    const fetchMovie = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/movie/${id}`);
            if (response.ok) {
                const data = await response.json();
                const formattedMovie: Movie = {
                    id: data.movie_id.toString(),
                    title: data.title,
                    imageUrl: data.img,
                    description: data.desc,
                    releaseDate: data.release_yr.toString(),
                    publisher: data.producer,
                    averageRating: data.rating ?? 0,
                    length: data.length, // Store movie length
                };
                setMovie(formattedMovie);
            } else {
                console.error('Failed to fetch movie');
            }
        } catch (error) {
            console.error('Error fetching movie:', error);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
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
                            <Clock className='w-5 h-5' />
                            <strong>Length:</strong> {movie.length} minutes
                        </p>
                        <p className='flex items-center gap-2 text-gray-600'>
                            <Star className='w-5 h-5 text-yellow-400' />
                            <strong>Average Rating:</strong>{' '}
                            <span className='text-lg'>{movie.averageRating.toFixed(1)}</span>
                        </p>
                    </div>
                    <p className='text-gray-700 leading-relaxed'>{movie.description}</p>
                </div>
            </div>


            <MovieReviews movieId={id} onReviewAdded={fetchMovie} />
        </div>
    );
};

export default MovieDetails;
