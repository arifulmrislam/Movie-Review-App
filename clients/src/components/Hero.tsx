'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ movies }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % movies.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [movies.length]);

    if (!movies || movies.length === 0) {
        return (
            <div className='relative h-[600px] flex items-center justify-center bg-gray-900 text-white'>
                <p className='text-2xl'>No movies available</p>
            </div>
        );
    }

    return (
        <div className='relative h-[400px] overflow-hidden bg-gray-900'>
            <div
                className='absolute inset-0 transition-transform duration-500 ease-in-out'
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                <div className='flex h-full'>
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className='relative w-full h-full flex-shrink-0'
                        >
                            <img
                                src={movie.imageUrl || '/placeholder.svg'}
                                alt={movie.title}
                                className='absolute inset-0 w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent' />
                            <div className='absolute bottom-0 left-0 p-8 text-white'>
                                <h2 className='text-3xl font-bold mb-2'>{movie.title}</h2>
                                <p className='text-lg mb-4'>{movie.description}</p>
                                <Link
                                    to={movie.link}
                                    className='inline-block bg-white/20 hover:bg-white/30 px-6 py-2 rounded-md transition-colors'
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={prevSlide}
                className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors ${currentSlide === 0 ? 'bg-red-500' : ''
                    }`}
            >
                <ChevronLeft className='h-6 w-6' />
            </button>
            <button
                onClick={nextSlide}
                className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors ${currentSlide === movies.length - 1 ? 'bg-red-500' : ''
                    }`}
            >
                <ChevronRight className='h-6 w-6' />
            </button>
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'>
                {movies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-red-500' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
