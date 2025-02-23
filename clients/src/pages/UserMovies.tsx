import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Edit, Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserMovies: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const { user, token, logout } = useAuth(); // Add logout from useAuth
    const [editingMovie, setEditingMovie] = useState<any | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [publisher, setPublisher] = useState('');
    const [genre, setGenre] = useState<string[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const navigate = useNavigate(); // Initialize useNavigate

    // Redirect to login if user is not authenticated
    useEffect(() => {
        if (!user || !token) {
            navigate('/login'); // Redirect to login page
        }
    }, [user, token, navigate]);

    // Fetch user's movies
    useEffect(() => {
        if (user?.user_id) {
            fetchMovies();
            // console.log(user.name);
            // console.log(user.email);
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
            console.log('Fetched movies:', data); // Debugging
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    // Handle editing a movie
    const handleEdit = (movie: any) => {
        setEditingMovie(movie);
        setTitle(movie.title);
        setDescription(movie.description);
        setReleaseDate(movie.release_date);
        setPublisher(movie.publisher);
        setGenre(movie.genre);
        setImageUrl(movie.image_url || null);
    };

    const handleUpdateMovie = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingMovie) return;

        try {
            const response = await fetch(
                `http://localhost:3000/api/movie/${editingMovie.movie_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        release_date: releaseDate,
                        publisher,
                        genre,
                    }),
                }
            );

            if (!response.ok) throw new Error('Failed to update movie');

            toast.success('Movie updated successfully.');
            setEditingMovie(null);
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
            <div>
                <h2>{user.name}</h2>
                <h2>{user.email}</h2>
                <span className='bg-yellow-400 text-black text-xs font-bold rounded-full px-2 ml-1'>
                    {movies.length}
                </span>
            </div>

            <h2 className='text-2xl font-bold mb-6'>Your Movies</h2>
            <div className='grid gap-6 md:grid-cols-1'>
                {movies.map((movie) => (
                    <div
                        key={movie.movie_id}
                        className='p-6 bg-white rounded-lg shadow-md'
                    >
                        <h3 className='text-xl font-semibold'>{movie.title}</h3>
                        <p className='text-gray-400'>{movie.release_yr}</p>
                        <p className='text-yellow-400 text-sm'>
                            ⭐ {movie.averageRating ? movie.averageRating.toFixed(1) : 'N/A'}
                        </p>
                        <img
                            src={movie.img}
                            alt={movie.title}
                            className='w-20 h-32 object-cover rounded'
                        />

                        <div className='mt-4 flex gap-4'>
                            <button
                                onClick={() => handleEdit(movie)}
                                className='text-blue-500 hover:text-blue-700'
                            >
                                <Edit className='w-5 h-5' />
                            </button>
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

            {editingMovie && (
                <div className='mt-8 p-6 bg-gray-100 rounded-lg shadow-md'>
                    <h3 className='text-xl font-bold mb-4'>Edit Movie</h3>
                    <form onSubmit={handleUpdateMovie}>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded mb-4'
                            placeholder='Movie Title'
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded mb-4'
                            placeholder='Description'
                        />
                        <input
                            type='date'
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded mb-4'
                        />
                        <input
                            type='text'
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded mb-4'
                            placeholder='Publisher'
                        />
                        <button
                            type='submit'
                            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                        >
                            Update Movie
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserMovies;

