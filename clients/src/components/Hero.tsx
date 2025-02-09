'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        title: 'The Latest Blockbuster',
        description:
            'An epic adventure that will keep you on the edge of your seat',
        image:
            'https://images.freecreatives.com/wp-content/uploads/2016/11/movie-posters.jpg',
        link: '/movies/1',
    },
    {
        id: 2,
        title: 'Award Season Favorites',
        description: 'The most acclaimed films of the year',
        image:
            'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/11/Marvel_Thor_Ragnarok_Movie_Poster-resized.jpg?w=1250&h=1120&crop=1',
        link: '/movies/2',
    },
    {
        id: 3,
        title: 'Must-Watch Movies',
        description: "Don't miss these incredible films",
        image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-09%20094906-c4o7ZoPRCRy7XOnT5amIWs7w5m1Bwz.png',
        link: '/movies/3',
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className='relative h-[400px] overflow-hidden bg-gray-900'>
            <div
                className='absolute inset-0 transition-transform duration-500 ease-in-out'
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                <div className='flex h-full'>
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className='relative w-full h-full flex-shrink-0'
                        >
                            <img
                                src={slide.image || '/placeholder.svg'}
                                alt={slide.title}
                                className='absolute inset-0 w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent' />
                            <div className='absolute bottom-0 left-0 p-8 text-white'>
                                <h2 className='text-3xl font-bold mb-2'>{slide.title}</h2>
                                <p className='text-lg mb-4'>{slide.description}</p>
                                <Link
                                    to={slide.link}
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
                className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors'
            >
                <ChevronLeft className='h-6 w-6' />
            </button>
            <button
                onClick={nextSlide}
                className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors'
            >
                <ChevronRight className='h-6 w-6' />
            </button>
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
