'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const getRandomMovies = (movies, count = 20) => {
    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};

export default function Hero({ movies }) {
    const [randomMovies, setRandomMovies] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0);

    // Load 20 random movies initially
    useEffect(() => {
        if (movies.length > 0) {
            setRandomMovies(getRandomMovies(movies));
        }
    }, [movies]);

    // Auto-slide every 5 seconds (move one movie at a time)
    useEffect(() => {
        const autoSlide = setInterval(() => {
            setVisibleIndex((prevIndex) => (prevIndex + 1) % randomMovies.length);
        }, 5000);

        return () => clearInterval(autoSlide);
    }, [randomMovies]);

    // Manual controls for left and right navigation
    const scrollLeft = () => {
        setVisibleIndex((prevIndex) =>
            prevIndex === 0 ? randomMovies.length - 1 : prevIndex - 1
        );
    };

    const scrollRight = () => {
        setVisibleIndex((prevIndex) => (prevIndex + 1) % randomMovies.length);
    };

    if (!randomMovies || randomMovies.length === 0) {
        return (
            <div className='relative h-[400px] flex items-center justify-center bg-gray-900 text-white'>
                <p className='text-2xl'>No movies available</p>
            </div>
        );
    }

    // Get the current 5-movie slice
    const visibleMovies = [
        ...randomMovies.slice(visibleIndex, visibleIndex + 5),
        ...randomMovies.slice(
            0,
            Math.max(0, visibleIndex + 5 - randomMovies.length)
        ),
    ];

    return (
        <div className='relative w-full overflow-hidden'>
            {/* Left Scroll Button */}
            <button
                onClick={scrollLeft}
                className='absolute left-4 top-1/2 -translate-y-1/2 bg-red-500/50 hover:bg-red-500 hover:scale-110 p-2 rounded-full text-white z-10 transition-all duration-300'
            >
                <ChevronLeft className='h-6 w-6' />
            </button>

            {/* Movies List (Auto Slide One-by-One) */}
            <div className='flex space-x-4 overflow-hidden scroll-smooth p-4 transition-transform duration-500 ease-in-out'>
                {visibleMovies.map((movie, index) => (
                    <div
                        key={index}
                        className='relative min-w-[250px] md:min-w-[300px] lg:min-w-[350px] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105'
                    >
                        {/* Movie Image with Hover Zoom Effect */}
                        <div className='relative overflow-hidden'>
                            <img
                                src={movie.imageUrl || '/placeholder.svg'}
                                alt={movie.title}
                                className='w-full h-[300px] object-cover transform transition-transform duration-300 hover:scale-110'
                            />
                        </div>
                        <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent' />
                        <div className='absolute bottom-4 left-4 text-white'>
                            <h2 className='text-2xl font-bold'>{movie.title}</h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Scroll Button */}
            <button
                onClick={scrollRight}
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-red-500/50 hover:bg-red-500 hover:scale-110 p-2 rounded-full text-white z-10 transition-all duration-300'
            >
                <ChevronRight className='h-6 w-6' />
            </button>
        </div>
    );
}
