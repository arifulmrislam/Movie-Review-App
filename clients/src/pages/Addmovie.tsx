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
    const [genre, setGenre] = useState<string[]>([]); // New state for genre

    const { user, token } = useAuth(); // Assuming you have a token in context
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log('Token from context:', token);
        if(!token) {
            alert('No token found. Please log in again.');
            return;
        }
        // Prepare the movie data
        const movieData = {
            user_id: user?.id,  // Assuming user object has an id
            title,
            img: imageUrl,
            desc: description,
            release_yr: new Date(releaseDate).getFullYear(),
            length: "120",  // Placeholder, can be dynamic
            producer: publisher,
            genre,
        };

        try {
            // Send the data to backend
            const response = await fetch('http://localhost:3000/api/movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token?.trim()}` : '',  // Pass token for authorization
                },
                body: JSON.stringify(movieData),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error:', error); // Log the error message
                throw new Error('Failed to add movie');
            }

            // Redirect to home page after successful addition
            navigate('/');
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    if (!user) {
        return <p>Please log in to add a new movie.</p>;
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm'>
                <h1 className='text-3xl font-bold mb-8 text-gray-900'>Add New Movie</h1>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label
                            htmlFor='genre'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Genre
                        </label>
                        <select
                            id='genre'
                            value={genre}
                            onChange={(e) => setGenre(Array.from(e.target.selectedOptions, option => option.value))}
                            multiple
                            className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg'
                        >
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            {/* Add more genres as necessary */}
                        </select>
                    </div>
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
                            className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg'
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
                            className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg'
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
                            className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg'
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
                            className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg'
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
                            className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg'
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
