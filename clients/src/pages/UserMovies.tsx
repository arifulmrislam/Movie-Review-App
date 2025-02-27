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
    X,
    AlertTriangle,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    message,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold flex items-center gap-2'>
                        <AlertTriangle className='w-6 h-6 text-yellow-500' />
                        Confirm Action
                    </h2>
                    <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
                        <X className='w-6 h-6' />
                    </button>
                </div>
                <p className='text-gray-700 mb-6'>{message}</p>
                <div className='flex justify-end gap-4'>
                    <button
                        onClick={onClose}
                        className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors'
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const UserMovies: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const { user, token } = useAuth();
    const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
    const [editedMovie, setEditedMovie] = useState<any | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<number | null>(null);
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
        setEditedMovie({
            ...movie,
            genre: movie.genres ? movie.genres.map((g: any) => g.genre) : [],
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        if (field === 'genre') {
            const selectedGenres = e.target.value.split(',').map((g) => g.trim());
            setEditedMovie((prev) => ({ ...prev, [field]: selectedGenres }));
        } else {
            setEditedMovie((prev) => ({ ...prev, [field]: e.target.value }));
        }
    };

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
                return data.imageUrl;
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

            if (selectedFile) {
                imageUrl = await handleImageUpload(selectedFile);
            }

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
                        img: imageUrl,
                    }),
                }
            );

            if (!response.ok) throw new Error('Failed to update movie');

            toast.success('Movie updated successfully.');
            setEditingMovieId(null);
            setSelectedFile(null);
            fetchMovies();
        } catch (error) {
            console.error('Error updating movie:', error);
            toast.error('Failed to update movie.');
        }
    };

    const handleDeleteConfirm = async () => {
        if (movieToDelete !== null) {
            try {
                console.log('Deleting movie with ID:', movieToDelete);
                const response = await fetch(
                    `http://localhost:3000/api/movie/${movieToDelete}`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) throw new Error('Failed to delete movie');

                console.log('Movies before deletion:', movies);
                setMovies((prevMovies) => {
                    const updatedMovies = prevMovies.filter((movie) => movie.movie_id !== movieToDelete);
                    console.log('Movies after deletion:', updatedMovies);
                    return updatedMovies;
                });

                toast.success('Movie deleted successfully.');
            } catch (error) {
                console.error('Error deleting movie:', error);
                toast.error('Failed to delete movie.');
            } finally {
                console.log('Closing modal and resetting state...');
                setIsModalOpen(false);
                setMovieToDelete(null);
            }
        }
    };

    console.log('Component re-rendered with movies:', movies);

    return (
        <div className='p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen'>
            {/* User Profile Section */}
            <div className='bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center justify-between mb-6 border border-gray-200'>
                <div className='flex items-center gap-4'>
                    <div className='w-14 h-14 flex items-center justify-center bg-blue-500 text-white font-bold text-xl rounded-full shadow-lg'>
                        <User className='w-7 h-7' />
                    </div>
                    <div className='text-center md:text-left'>
                        <h2 className='text-lg font-semibold text-gray-900'>
                            {user.name}
                        </h2>
                        <p className='text-gray-600 text-sm'>{user.email}</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 mt-4 md:mt-0'>
                    <span className='text-gray-700 text-sm'>Movies Added:</span>
                    <span className='bg-yellow-400 text-gray-900 text-sm font-semibold rounded-full px-3 py-1 shadow-md'>
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
                                        {/* <input
                                            type='text'
                                            value={editedMovie.genre ? editedMovie.genre.join(', ') : ''}
                                            onChange={(e) => handleChange(e, 'genre')}
                                            className='border border-gray-400 p-1 rounded w-full mt-2'
                                            placeholder='Genres (comma-separated)'
                                        /> */}
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
                                            <Film className='w-5 h-5 text-purple-600' />{' '}
                                            {movie.title}
                                        </h3>
                                        <p className='text-gray-600 flex items-center gap-2'>
                                            <Calendar className='w-4 h-4 text-blue-500' />{' '}
                                            {movie.release_yr}
                                        </p>
                                        <p className='text-gray-600 flex items-center gap-2'>
                                            <Clock className='w-4 h-4 text-blue-500' />{' '}
                                            {movie.length} minutes
                                        </p>
                                        <p className='text-gray-600 flex items-center gap-2'>
                                            <UserCircle className='w-4 h-4 text-blue-500' />{' '}
                                            {movie.producer}
                                        </p>
                                        {/* <div className='text-gray-600 flex items-center gap-2'>
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
                                        </div> */}
                                        <p className='text-gray-600 flex items-center gap-2'>
                                            <FileText className='w-4 h-4 text-blue-500' />{' '}
                                            {movie.desc}
                                        </p>
                                    </>
                                )}
                                <p className='text-yellow-500 text-sm flex items-center gap-2'>
                                    ⭐{' '}
                                    {movie.averageRating
                                        ? movie.averageRating.toFixed(1)
                                        : 'N/A'}
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
                                onClick={() => {
                                    setMovieToDelete(movie.movie_id);
                                    setIsModalOpen(true);
                                }}
                                className='bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200'
                            >
                                <Trash className='w-5 h-5' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                message='Are you sure you want to delete this movie? This action cannot be undone.'
            />
        </div>
    );
};

export default UserMovies;