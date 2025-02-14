'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import Hero from '../components/Hero';
import axios from 'axios';

const Home: React.FC = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/movie');
                const data = response.data;

            const formattedMovies = data.map((movie:any) => ({
                id: movie.movie_id,
                title: movie.title,
                imageUrl: movie.img,
                averageRating: movie.averageRating || 0,
            }));

            setMovies(formattedMovies);

        } catch (error) {
            console.error('Failed to fetch movies:', error);
        }   
    }; 
    
    getMovies();
    }, []);

        return (
        <div className='-mx-4'>
            <Hero />
            <div className='container mx-auto px-4'>
                <MovieList title='MOVIE LIST' movies={movies} />
            </div>
        </div>
    );
};

export default Home;
