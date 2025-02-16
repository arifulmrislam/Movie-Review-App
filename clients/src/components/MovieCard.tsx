import type React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface MovieCardProps {
    id: string;
    title: string;
    imageUrl: string;
    averageRating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
    id,
    title,
    imageUrl,
    averageRating,
}) => {
    const ratingColor = averageRating >= 70 ? 'text-green-500' : 'text-[#FA320A]';

    return (
        <Link to={`/movies/${id}`} className='block'>
            <div className='group relative'>
                <div className='relative aspect-[2/3] overflow-hidden rounded-lg'>
                    <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10' />
                    <Play className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20' />
                    <img
                        src={imageUrl || '/placeholder.svg'}
                        alt={title}
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='mt-2'>
                    <div className='flex items-center space-x-2'>
                        <div className={`font-bold ${ratingColor}`}>
                            {Math.round(averageRating * 10)}%
                        </div>
                    </div>
                    <h3 className='font-medium text-sm mt-1 line-clamp-2'>{title}</h3>
                    <button className='mt-2 text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 transition-colors'>
                        WATCHLIST
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
