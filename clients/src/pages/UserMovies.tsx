import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Edit, Trash, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserMovies: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const { user, token } = useAuth();
    const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
    const [editedMovie, setEditedMovie] = useState<any | null>(null);
    const navigate = useNavigate();

    // Redirect to login if user is not authenticated
    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
        }
    }, [user, token, navigate]);

    // Fetch user's movies
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

    // Start Editing a Movie
    const handleEdit = (movie: any) => {
        setEditingMovieId(movie.movie_id);
        setEditedMovie({ ...movie });
    };

    // Handle Input Changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        setEditedMovie((prev) => ({ ...prev, [field]: e.target.value }));
    };

    // Save Changes & Exit Editing Mode
    const handleSave = async () => {
        if (!editedMovie) return;
        try {
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
                        description: editedMovie.description,
                        release_yr: editedMovie.release_yr,
                        publisher: editedMovie.publisher,
                        genre: editedMovie.genre,
                    }),
                }
            );

            if (!response.ok) throw new Error('Failed to update movie');

            toast.success('Movie updated successfully.');
            setEditingMovieId(null);
            fetchMovies();
        } catch (error) {
            console.error('Error updating movie:', error);
            toast.error('Failed to update movie.');
        }
    };

    // Handle movie deletion
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
        <div className='p-8'>
            {/* User Info */}
            <div className='bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center justify-between mb-6'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-bold text-xl rounded-full'>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className='text-lg font-semibold'>{user.name}</h2>
                        <p className='text-gray-600'>{user.email}</p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-gray-700'>Movies Added:</span>
                    <span className='bg-yellow-400 text-black text-xs font-bold rounded-full px-3 py-1'>
                        {movies.length}
                    </span>
                </div>
            </div>

            {/* Movie List */}
            <h2 className='text-2xl font-bold mb-4'>Your Movies</h2>
            <div className='flex flex-col gap-4'>
                {movies.map((movie) => (
                    <div
                        key={movie.movie_id}
                        className='p-6 bg-gray-200 rounded-lg shadow-md flex items-center justify-between'
                    >
                        {/* Movie Info - Inline Editing */}
                        <div className='flex items-center gap-4'>
                            <img
                                src={movie.img || '/placeholder.jpg'}
                                alt={movie.title}
                                className='w-16 h-24 object-cover rounded'
                            />
                            <div>
                                {editingMovieId === movie.movie_id ? (
                                    <>
                                        <input
                                            type='text'
                                            value={editedMovie?.title || ''}
                                            onChange={(e) => handleChange(e, 'title')}
                                            className='border border-gray-400 p-1 rounded'
                                        />
                                        <input
                                            type='text'
                                            value={editedMovie.release_yr}
                                            onChange={(e) => handleChange(e, 'release_yr')}
                                            className='border border-gray-400 p-1 rounded mt-1'
                                        />
                                    </>
                                ) : (
                                    <>
                                        <h3 className='text-xl font-semibold text-black'>
                                            {movie.title}
                                        </h3>
                                        <p className='text-gray-600'>{movie.release_yr}</p>
                                    </>
                                )}
                                <p className='text-yellow-500 text-sm'>
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
                                    className='text-green-500 hover:text-green-700'
                                >
                                    <Check className='w-5 h-5' />
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(movie)}
                                    className='text-blue-500 hover:text-blue-700'
                                >
                                    <Edit className='w-5 h-5' />
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(movie.movie_id)}
                                className='text-red-500 hover:text-red-700'
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
