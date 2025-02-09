'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EditMovie: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [publisher, setPublisher] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch movie details
        // For now, we'll use mock data
        const mockMovie = {
            id: id,
            title: 'Sample Movie',
            description: 'This is a sample movie description.',
            releaseDate: '2023-01-01',
            publisher: 'Sample Publisher',
            imageUrl: '/placeholder.svg',
        };

        setTitle(mockMovie.title);
        setDescription(mockMovie.description);
        setReleaseDate(mockMovie.releaseDate);
        setPublisher(mockMovie.publisher);
        setImageUrl(mockMovie.imageUrl);
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the updated data to your backend
        console.log({ id, title, description, releaseDate, publisher, imageUrl });
        // After successful update, redirect to movie page
        navigate(`/movies/${id}`);
    };

    if (!user) {
        return <p>Please log in to edit a movie.</p>;
    }

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>Edit Movie</h1>
            <form onSubmit={handleSubmit} className='max-w-lg'>
                <div className='mb-4'>
                    <label htmlFor='title' className='block mb-2'>
                        Title:
                    </label>
                    <input
                        type='text'
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className='w-full px-3 py-2 border rounded-md'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='description' className='block mb-2'>
                        Description:
                    </label>
                    <textarea
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className='w-full px-3 py-2 border rounded-md'
                        rows={4}
                    ></textarea>
                </div>
                <div className='mb-4'>
                    <label htmlFor='releaseDate' className='block mb-2'>
                        Release Date:
                    </label>
                    <input
                        type='date'
                        id='releaseDate'
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        required
                        className='w-full px-3 py-2 border rounded-md'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='publisher' className='block mb-2'>
                        Publisher:
                    </label>
                    <input
                        type='text'
                        id='publisher'
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                        required
                        className='w-full px-3 py-2 border rounded-md'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='imageUrl' className='block mb-2'>
                        Image URL:
                    </label>
                    <input
                        type='url'
                        id='imageUrl'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                        className='w-full px-3 py-2 border rounded-md'
                    />
                </div>
                <button
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                >
                    Update Movie
                </button>
            </form>
        </div>
    );
};

export default EditMovie;
