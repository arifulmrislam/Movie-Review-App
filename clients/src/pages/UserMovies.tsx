import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Edit,
    Trash,
    Check,
    Film,
    User,
    Calendar,
    Clock,
    UserCircle,
    List,
    FileText,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserMovies: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const { user, token } = useAuth();
    const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
    const [editedMovie, setEditedMovie] = useState<any | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
        }
    }, [user, token, navigate]);

    useEffect(() => {
        if (user?.user_id) {
            fetchMovies();
        }
    }, [user]);

    const fetchMovies = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/movie/user/${user.user_id}`,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token.trim()}` : '',
                    },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch movies');
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleEdit = (movie: any) => {
        setEditingMovieId(movie.movie_id);
        setEditedMovie({ ...movie });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        setEditedMovie((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file); // Use 'image' as the field name

        try {
            const response = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                return data.imageUrl; // Return the uploaded image URL
            } else {
                throw new Error(data.error || 'Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const handleSave = async () => {
        if (!editedMovie) return;

        try {
            let imageUrl = editedMovie.img;

            // Upload new image if selected
            if (selectedFile) {
                imageUrl = await handleImageUpload(selectedFile);
            }

            // Update the movie with the new image URL
            const response = await fetch(
                `http://localhost:3000/api/movie/${editedMovie.movie_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: editedMovie.title,
                        release_yr: editedMovie.release_yr,
                        length: editedMovie.length,
                        producer: editedMovie.producer,
                        genre: editedMovie.genre,
                        desc: editedMovie.desc,
                        img: imageUrl, // Include the updated image URL
                    }),
                }
            );

            if (!response.ok) throw new Error('Failed to update movie');

            toast.success('Movie updated successfully.');
            setEditingMovieId(null);
            setSelectedFile(null); // Clear the selected file
            fetchMovies(); // Refresh the movie list
        } catch (error) {
            console.error('Error updating movie:', error);
            toast.error('Failed to update movie.');
        }
    };

    const handleDelete = async (movieId: number) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/movie/${movieId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error('Failed to delete movie');

            toast.success('Movie deleted successfully.');
            setMovies((prevMovies) =>
                prevMovies.filter((movie) => movie.movie_id !== movieId)
            );
        } catch (error) {
            console.error('Error deleting movie:', error);
            toast.error('Failed to delete movie.');
        }
    };

    return (
        <div className='p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen'>
            {/* User Profile Section */}
            <div className='bg-gradient-to-r from-blue-500 to-purple-600 shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center justify-between mb-6'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 flex items-center justify-center bg-white text-blue-500 font-bold text-xl rounded-full'>
                        <User className='w-6 h-6' />
                    </div>
                    <div>
                        <h2 className='text-lg font-semibold text-white'>{user.name}</h2>
                        <p className='text-gray-200'>{user.email}</p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-gray-200'>Movies Added:</span>
                    <span className='bg-yellow-400 text-black text-xs font-bold rounded-full px-3 py-1'>
                        {movies.length}
                    </span>
                </div>
            </div>

            {/* Movie List Section */}
            <h2 className='text-2xl font-bold mb-4 flex items-center gap-2 text-purple-800'>
                <Film className='w-6 h-6 text-purple-600' /> Your Movies
            </h2>
            <div className='flex flex-col gap-4'>
                {movies.map((movie) => (
                    <div
                        key={movie.movie_id}
                        className='p-6 bg-gradient-to-r from-white to-purple-50 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition-shadow duration-200'
                    >
                        <div className='flex items-center gap-4'>
                            <img
                                src={movie.img || '/placeholder.jpg'}
                                alt={movie.title}
                                className='w-44 h-60 object-cover rounded'
                            />
                            <div>
                                {editingMovieId === movie.movie_id ? (
                                    <>
                                        <input
                                            type='text'
                                            value={editedMovie?.title || ''}
                                            onChange={(e) => handleChange(e, 'title')}
                                            className='border border-gray-400 p-1 rounded w-full'
                                            placeholder='Title'
                                        />
                                        <input
                                            type='text'
                                            value={editedMovie.release_yr}
                                            onChange={(e) => handleChange(e, 'release_yr')}
                                            className='border border-gray-400 p-1 rounded w-full mt-2'
                                            placeholder='Release Year'
                                        />
                                        <input
                                            type='text'
                                            value={editedMovie.length}
                                            onChange={(e) => handleChange(e, 'length')}
                                            className='border border-gray-400 p-1 rounded w-full mt-2'
                                            placeholder='Length'
                                        />
                                        <input
                                            type='text'
                                            value={editedMovie.producer}
                                            onChange={(e) => handleChange(e, 'producer')}
                                            className='border border-gray-400 p-1 rounded w-full mt-2'
                                            placeholder='Producer'
                                        />
                                        <input
                                            type='text'
                                            value={editedMovie.genres.map((g) => g.genre).join(', ')}
                                            onChange={(e) => handleChange(e.target.value)}
                                            className='border border-gray-400 p-1 rounded w-full mt-2'
                                            placeholder='Genres (comma-separated)'
                                        />
                                        <input
                                            type='text'
                                            value={editedMovie.desc}
                                            onChange={(e) => handleChange(e, 'desc')}
                                            className='border border-gray-400 p-1 rounded w-full mt-2'
                                            placeholder='Description'
                                        />
                                        <input
                                            type='file'
                                            onChange={(e) =>
                                                setSelectedFile(e.target.files?.[0] || null)
                                            }
                                            className='border border-gray-400 p-1 rounded w-full mt-2'
                                        />
                                    </>
                                ) : (
                                    <>
                                        <h3 className='text-xl font-semibold text-purple-800 flex items-center gap-2'>
                                            <Film className='w-5 h-5 text-purple-600' /> {movie.title}
                                        </h3>
                                        <p className='text-gray-600 flex items-center gap-2'>
                                            <Calendar className='w-4 h-4 text-blue-500' />{' '}
                                            {movie.release_yr}
                                        </p>
                                        <p className='text-gray-600 flex items-center gap-2'>
                                            <Clock className='w-4 h-4 text-blue-500' /> {movie.length}{' '}
                                            minutes
                                        </p>
                                        <p className='text-gray-600 flex items-center gap-2'>
                                            <UserCircle className='w-4 h-4 text-blue-500' />{' '}
                                            {movie.producer}
                                        </p>
                                        <div className='text-gray-600 flex items-center gap-2'>
                                            <List className='w-4 h-4 text-blue-500' /> Genres:
                                            {movie.genres.length > 0 ? (
                                                movie.genres.map((genreItem, index) => (
                                                    <span key={index} className='mr-2'>
                                                        {genreItem.genre}
                                                    </span>
                                                ))
                                            ) : (
                                                <p>No genres available</p>
                                            )}
                                        </div>
                                        <p className='text-gray-600 flex items-center gap-2'>
                                            <FileText className='w-4 h-4 text-blue-500' />{' '}
                                            {movie.desc}
                                        </p>
                                    </>
                                )}
                                <p className='text-yellow-500 text-sm flex items-center gap-2'>
                                    ⭐{' '}
                                    {movie.averageRating ? movie.averageRating.toFixed(1) : 'N/A'}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex gap-4'>
                            {editingMovieId === movie.movie_id ? (
                                <button
                                    onClick={handleSave}
                                    className='bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200'
                                >
                                    <Check className='w-5 h-5' />
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(movie)}
                                    className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200'
                                >
                                    <Edit className='w-5 h-5' />
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(movie.movie_id)}
                                className='bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200'
                            >
                                <Trash className='w-5 h-5' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserMovies;
