'use client';

import type React from 'react';
import MovieList from '../components/MovieList';
import Hero from '../components/Hero';

// Mock data for movies
const mockMovies = [
    {
        id: '1',
        title: 'Game of Thrones',
        imageUrl:
            'https://i.pinimg.com/564x/7f/bf/1e/7fbf1eaecb95dc82ffee4e60c7d627a7.jpg',
        averageRating: 0.89,
    },
    {
        id: '2',
        title: 'Forrest Gump',
        imageUrl:
            'https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        averageRating: 0.96,
    },
    {
        id: '3',
        title: 'Wicked',
        imageUrl:
            'https://m.media-amazon.com/images/M/MV5BOWMwYjYzYmMtMWQ2Ni00NWUwLTg2MzAtYzkzMDBiZDIwOTMwXkEyXkFqcGc@._V1_.jpg',
        averageRating: 0.86,
    },
    {
        id: '4',
        title: 'Moana 2',
        imageUrl:
            'https://lumiere-a.akamaihd.net/v1/images/p_moana2_v3_94b2f083.jpeg',
        averageRating: 0.67,
    },
    {
        id: '5',
        title: 'The Last Showgirl',
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUsHKb1e91P704aeWdjh3UCalgTZd1F0Tjgw&s',
        averageRating: 0.81,
    },
    {
        id: '6',
        title: 'Nickel Boys',
        imageUrl:
            'https://m.media-amazon.com/images/M/MV5BMGRkMzIyY2QtMjc5My00NGRjLWE5ZGUtYjRiMDNjMzAwOTU0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        averageRating: 0.92,
    },
];

const Home: React.FC = () => {
    return (
        <div className='-mx-4'>
            <Hero />
            <div className='container mx-auto px-4'>
                <MovieList title='NOW IN THEATERS' movies={mockMovies} />
                <MovieList title='NEW TO RENT/BUY AT HOME' movies={mockMovies} />
            </div>
        </div>
    );
};

export default Home;
