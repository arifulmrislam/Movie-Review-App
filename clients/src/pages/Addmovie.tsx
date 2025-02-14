'use client';

import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddMovie: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [publisher, setPublisher] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log({ title, description, releaseDate, publisher, imageUrl });
        // After successful submission, redirect to home page
        navigate('/');
    };

    if (!user) {
        return <p>Please log in to add a new movie.</p>;
    }

    return (
        <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm'>
                <h1 className='text-3xl font-bold mb-8 text-gray-900'>Add New Movie</h1>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label
                            htmlFor='title'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Title
                        </label>
                        <input
                            type='text'
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='description'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Description
                        </label>
                        <textarea
                            id='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                            rows={4}
                        ></textarea>
                    </div>
                    <div>
                        <label
                            htmlFor='releaseDate'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Release Date
                        </label>
                        <input
                            type='date'
                            id='releaseDate'
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='publisher'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Publisher
                        </label>
                        <input
                            type='text'
                            id='publisher'
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='imageUrl'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Image URL
                        </label>
                        <input
                            type='url'
                            id='imageUrl'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium'
                    >
                        Add Movie
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMovie;
