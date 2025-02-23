import type React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Star, Film } from 'lucide-react'; // Import relevant icons

interface MovieCardProps {
    id: string;
    title: string;
    imageUrl: string;
    averageRating: number;
    release_yr: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
    id,
    title,
    imageUrl,
    averageRating,
    release_yr,
}) => {
    const ratingColor = averageRating >= 70 ? 'text-green-500' : 'text-[#FA320A]';

    return (
        <Link to={`/movies/${id}`} className='block'>
            <div className='group relative'>
                <div className='relative aspect-[2/3] overflow-hidden rounded-lg'>
                    <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10' />
                    {/* Custom button to view details */}
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20'>
                        <button
                            onClick={() => (window.location.href = `/movies/${id}`)}
                            className='flex items-center justify-center w-24 h-24 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                        >
                            <Edit className='w-12 h-12' />
                        </button>
                    </div>
                    <img
                        src={imageUrl || '/placeholder.svg'}
                        alt={title}
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='mt-2'>
                    <div className='flex items-center space-x-2'>
                        {/* Rating icon */}
                        <Star className={`w-4 h-4 ${ratingColor}`} />
                        <div className={`font-bold ${ratingColor}`}>
                            {Math.round(averageRating * 10)}%
                        </div>
                    </div>
                    <h3 className='font-medium text-m mt-1 line-clamp-2'>
                        <Film className='inline-block w-4 h-4 mr-1 text-gray-500' />
                        {title} ({release_yr})
                    </h3>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
