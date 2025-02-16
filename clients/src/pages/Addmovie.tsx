'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddMovie: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [publisher, setPublisher] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [genre, setGenre] = useState<string[]>([]);

    const { user, token } = useAuth();
    const navigate = useNavigate();

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                console.log('Uploaded Image URL:', data.imageUrl);
                setImageUrl(data.imageUrl);
                return data.imageUrl;
            } else {
                console.error('Upload failed', data.error);
                return null;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            alert('No token found. Please log in again.');
            return;
        }

        let uploadedImageUrl = imageUrl; 

        if (imageFile) {
            uploadedImageUrl = await handleImageUpload(imageFile);
            if (!uploadedImageUrl) {
                alert('Image upload failed. Please try again.');
                return;
            }
        }

        const movieData = {
            user_id: user?.id,
            title,
            img: uploadedImageUrl, // Use uploaded image URL
            desc: description,
            release_yr: new Date(releaseDate).getFullYear(),
            length: '120',
            producer: publisher,
            genre,
        };

        try {
            const response = await fetch('http://localhost:3000/api/movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `Bearer ${token.trim()}` : '',
                },
                body: JSON.stringify(movieData),
            });

            if (!response.ok) {
                throw new Error('Failed to add movie');
            }

            navigate('/');
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

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
                            onChange={(e) =>
                                setGenre(
                                    Array.from(e.target.selectedOptions, (option) => option.value)
                                )
                            }
                            multiple
                            className='block w-full pl-3 pr-3 py-2.5 border border-gray-300 rounded-lg'
                        >
                            <option value='Action'>Action</option>
                            <option value='Comedy'>Comedy</option>
                            <option value='Drama'>Drama</option>
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
                            className='block w-full px-3 py-2.5 border border-gray-300 rounded-lg'
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
                            className='block w-full px-3 py-2.5 border border-gray-300 rounded-lg'
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
                            className='block w-full px-3 py-2.5 border border-gray-300 rounded-lg'
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
                            className='block w-full px-3 py-2.5 border border-gray-300 rounded-lg'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='imageFile'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Upload Movie Image
                        </label>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                            required
                            className='block w-full px-3 py-2.5 border border-gray-300 rounded-lg'
                        />
                    </div>

                    {/* Image preview */}
                    {imageUrl && (
                        <div className='mt-4'>
                            <p className='text-sm text-gray-500'>Preview:</p>
                            <img
                                src={imageUrl}
                                alt='Uploaded Movie'
                                width='200'
                                className='mt-2 rounded-lg shadow-md'
                            />
                        </div>
                    )}

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
