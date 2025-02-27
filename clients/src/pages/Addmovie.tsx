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
    const [length, setLength] = useState('');
    const [showSuccess, setShowSuccess] = useState(false); // State for success message

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
            length,
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

            // Show success message
            setShowSuccess(true);

            // Hide the success message after 3 seconds and navigate to home
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/');
            }, 5000); // 3 seconds delay
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <div className='min-h-screen bg-red-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl'>
                <h1 className='text-3xl font-bold mb-8 text-gray-900'>Create Movie</h1>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label
                            htmlFor='title'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Movie Name
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
                            htmlFor='length'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Movie Length (minutes)
                        </label>
                        <input
                            type='number'
                            id='length'
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            required
                            className='block w-full px-3 py-2.5 border border-gray-300 rounded-lg'
                        />
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
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Genres
                        </label>
                        <div className='grid grid-cols-2 gap-2'>
                            {[
                                'Action',
                                'Adventure',
                                'Thriller',
                                'Crime',
                                'Comedy',
                                'Drama',
                                'Sci-Fi',
                                'Sport',
                                'Animation',
                                'Horror',
                            ].map((g) => (
                                <label
                                    key={g}
                                    className='flex items-center space-x-2 cursor-pointer'
                                >
                                    <input
                                        type='checkbox'
                                        value={g}
                                        checked={genre.includes(g)}
                                        onChange={(e) => {
                                            const selected = e.target.value;
                                            setGenre(
                                                (prev) =>
                                                    prev.includes(selected)
                                                        ? prev.filter((item) => item !== selected) // Remove if unchecked
                                                        : prev.length < 12
                                                            ? [...prev, selected] // Add if under 3
                                                            : prev // Ignore if 3 are selected
                                            );
                                        }}
                                        className='h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded'
                                    />
                                    <span className='text-gray-700'>{g}</span>
                                </label>
                            ))}
                        </div>
                        {genre.length === 12 && (
                            <p className='text-xs text-red-500 mt-1'>
                                {/* You can only select up to 3 genres. */}
                            </p>
                        )}
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
                            Thumbnail
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
                        className='w-full bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200 font-medium shadow-md'
                    >
                        Create Movie
                    </button>
                </form>

                {/* Success Message */}
                {showSuccess && (
                    <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 z-50'>
                        <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
                            <h2 className='text-2xl font-bold text-green-600 mb-4'>
                                Movie Added Successfully!
                            </h2>
                            <p className='text-gray-700'>
                                You will be redirected to the homepage shortly.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddMovie;
