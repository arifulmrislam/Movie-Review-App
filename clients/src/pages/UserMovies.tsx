// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import MovieCard from '../components/MovieCard';
// 
// const UserMovies: React.FC = () => {
//     const [movies, setMovies] = useState<any[]>([]);
//     const { user, token } = useAuth();
//     const [editingMovie, setEditingMovie] = useState<any | null>(null);
// 
//     // Fetch user's movies when the component mounts
//     useEffect(() => {
//         const fetchMovies = async () => {
//             if (user?.user_id) {
//                 try {
//                     const response = await fetch(
//                         `http://localhost:3000/api/movie/user/${user.user_id}`,
//                         {
//                             headers: {
//                                 Authorization: token ? `Bearer ${token.trim()}` : '',
//                             },
//                         }
//                     );
//                     const data = await response.json();
//                     setMovies(data);
//                 } catch (error) {
//                     console.error('Error fetching movies:', error);
//                 }
//             }
//         };
// 
//         fetchMovies();
//     }, [user, token]);
// 
//     // Handle movie deletion
//     const handleDeleteMovie = async (movieId: number) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:3000/api/movie/${movieId}`,
//                 {
//                     method: 'DELETE',
//                     headers: {
//                         Authorization: token ? `Bearer ${token.trim()}` : '',
//                     },
//                 }
//             );
// 
//             if (!response.ok) {
//                 throw new Error('Failed to delete movie');
//             }
// 
//             setMovies(movies.filter((movie) => movie.id !== movieId));
//         } catch (error) {
//             console.error('Error deleting movie:', error);
//         }
//     };
// 
//     // Handle editing a movie
//     const handleEditMovie = (movie: any) => {
//         setEditingMovie(movie);
//         setTitle(movie.title);
//         setDescription(movie.desc);
//         setReleaseDate(
//             new Date(movie.release_yr, 0, 1).toISOString().split('T')[0]
//         );
//         setPublisher(movie.producer);
//         setGenre(movie.genre);
//         setImageUrl(movie.img);
//     };
// 
//     return (
//         <div className='min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white'>
//             <div className='max-w-6xl w-full p-8 bg-gray-700 rounded-lg shadow-lg'>
//                 <h2 className='text-3xl font-bold mb-6'>Your Movies</h2>
//                 {movies.length > 0 ? (
//                     movies.map((movie) => (
//                         <div
//                             key={movie.id}
//                             className='flex items-center justify-between p-4 bg-gray-600 rounded-lg mb-4'
//                         >
//                             <div>
//                                 <MovieCard
//                                     id={movie.id}
//                                     title={movie.title}
//                                     imageUrl={movie.img}
//                                     className='w-4 h-4 mr-4'
//                                 />
//                                 
//                                 <div>
//                                     <h3 className='text-xl font-semibold'>{movie.title}</h3>
//                                     <p className='text-sm text-gray-400'>{movie.release_yr}</p>
//                                     <p className='text-sm text-yellow-400'>
//                                         {movie.rating} • {movie.reviews_count} reviews
//                                     </p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <button
//                                     onClick={() => handleEditMovie(movie)}
//                                     className='text-sm font-semibold text-blue-400 hover:text-blue-500 mr-2'
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => handleDeleteMovie(movie.id)}
//                                     className='text-sm font-semibold text-red-500 hover:text-red-600'
//                                 >
//                                     DELETE
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className='text-center text-gray-400'>
//                         No movies in your favorites.
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };
// 
// export default UserMovies;


// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// 
// const UserMovies: React.FC = () => {
//     const [movies, setMovies] = useState<any[]>([]);
//     const { user, token } = useAuth();
// 
//     useEffect(() => {
//         const fetchMovies = async () => {
//             if (user?.user_id) {
//                 try {
//                     const response = await fetch(
//                         `http://localhost:3000/api/movie/user/${user.user_id}`,
//                         {
//                             headers: {
//                                 Authorization: token ? `Bearer ${token.trim()}` : '',
//                             },
//                         }
//                     );
//                     const data = await response.json();
//                     setMovies(data);
//                 } catch (error) {
//                     console.error('Error fetching movies:', error);
//                 }
//             }
//         };
// 
//         fetchMovies();
//     }, [user, token]);
// 
//     const handleDeleteMovie = async (movieId: number) => {
//         try {
//             const response = await fetch(
//               `http://localhost:3000/api/movie?movie_id=${Number(movieId)}`,
//               {
//                 method: 'DELETE',
//                 headers: {
//                   Authorization: token ? `Bearer ${token.trim()}` : '',
//                 },
//               }
//             );
// 
//             if (!response.ok) {
//                 throw new Error('Failed to delete movie');
//             }
// 
//             setMovies(movies.filter((movie) => movie.id !== movieId));
//         } catch (error) {
//             console.error('Error deleting movie:', error);
//         }
//     };
// 
//     return (
//         <div className='min-h-screen bg-gray-900 text-white'>
//             {/* Header */}
//             {/* <nav className='bg-red-600 p-4 flex justify-between items-center'>
//         <h1 className='text-2xl font-bold'>Rotten Tomatoes</h1>
//         <div className='flex items-center space-x-4'>
//           <span>Hi, {user?.username}</span>
//           <a href='/add-movie' className='hover:underline'>
//             Add Movie
//           </a>
//           <a href='/favorites' className='relative font-bold'>
//             Favorites{' '}
//             <span className='bg-yellow-400 text-black text-xs font-bold rounded-full px-2 ml-1'>
//               {movies.length}
//             </span>
//           </a>
//           <a href='/logout' className='hover:underline'>
//             Logout
//           </a>
//         </div>
//       </nav> */}
// 
//             <div className='max-w-4xl mx-auto p-4'>
//                 <h2 className='text-3xl font-bold mb-4'>Your Movies</h2>
//                 {movies.length > 0 ? (
//                     movies.map((movie) => (
//                         <div
//                             key={movie.id}
//                             className='flex items-center bg-gray-700 rounded-lg p-4 mb-4 shadow-md'
//                         >
//                             <img
//                                 src={movie.img}
//                                 alt={movie.title}
//                                 className='w-20 h-32 object-cover rounded'
//                             />
//                             <div className='ml-4 flex-grow'>
//                                 <h3 className='text-xl font-semibold'>{movie.title}</h3>
//                                 <p className='text-gray-400'>{movie.release_yr}</p>
//                                 <p className='text-yellow-400 text-sm'>
//                                     ⭐ {movie.rating ?? 'N/A'}
//                                 </p>
//                             </div>
//                             <div className='flex flex-col items-end'>
//                                 <button
//                                     onClick={() => handleDeleteMovie(movie.id)}
//                                     className='border border-white px-3 py-1 rounded-lg hover:bg-white hover:text-black mb-3'
//                                 >
//                                     EDIT
//                                 </button>
//                                 <button
//                                     onClick={() => handleDeleteMovie(movie.id)}
//                                     className='border border-white px-3 py-1 rounded-lg hover:bg-white hover:text-black'
//                                 >
//                                     DELETE
//                                 </button>
// 
//                                 <p className='text-xs text-gray-400 mt-1'>
//                                     {Math.floor(Math.random() * 10)} seconds ago
//                                 </p>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className='text-gray-400 text-center'>
//                         No movies in your favorites.
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };
// 
// export default UserMovies;


// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// 
// interface MovieReviewsProps {
//   movieId: string;
//   onReviewAdded: () => void; // Function to trigger re-fetch
// }
// 
// const UserMovies: React.FC<MovieReviewsProps> = ({ movieId }) => {
//   const [movies, setMovies] = useState<any[]>([]);
//   const { user, token } = useAuth();
//   const [editingMovie, setEditingMovie] = useState<any | null>(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [releaseDate, setReleaseDate] = useState('');
//   const [publisher, setPublisher] = useState('');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [genre, setGenre] = useState<string[]>([]);
// 
//   // Fetch user's movies
//   useEffect(() => {
//     const fetchMovies = async () => {
//       if (user?.user_id) {
//         try {
//           const response = await fetch(
//             `http://localhost:3000/api/movie/user/${user.user_id}`,
//             {
//               headers: {
//                 Authorization: token ? `Bearer ${token.trim()}` : '',
//               },
//             }
//           );
//           const data = await response.json();
//           setMovies(data);
//         } catch (error) {
//           console.error('Error fetching movies:', error);
//         }
//       }
//     };
// 
//     fetchMovies();
//   }, [user, token]);
// 
//   // Handle movie deletion
//   const handleDeleteMovie = async (movieId: number) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/movie?movie_id=${Number(movieId)}`,
//         {
//           method: 'DELETE',
//           headers: {
//             Authorization: token ? `Bearer ${token.trim()}` : '',
//           },
//         }
//       );
// 
//       if (!response.ok) {
//         throw new Error('Failed to delete movie');
//       }
// 
//       // Remove the deleted movie from the list
//       setMovies(movies.filter((movie) => movie.id !== movieId));
//     } catch (error) {
//       console.error('Error deleting movie:', error);
//     }
//   };
// 
//   // Handle editing a movie
//   const handleEditMovie = (movie: any) => {
//     setEditingMovie(movie);
//     setTitle(movie.title);
//     setDescription(movie.desc);
//     setReleaseDate(movie.release_yr);
//     setPublisher(movie.producer);
//     setGenre(movie.genre);
//     setImageUrl(movie.img);
//   };
// 
//   // Handle form submission for editing a movie
//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
// 
//     if (!token || !editingMovie) {
//       alert('No token found or movie not selected for editing.');
//       return;
//     }
// 
//     const movieData = {
//       title,
//       desc: description,
//       release_yr: releaseDate,
//       producer: publisher,
//       genre,
//       img: imageUrl,
//     };
// 
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/movie/${editingMovie.id}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: token ? `Bearer ${token.trim()}` : '',
//           },
//           body: JSON.stringify(movieData),
//         }
//       );
// 
//       if (!response.ok) {
//         throw new Error('Failed to update movie');
//       }
// 
//       // Update the movie in the list
//       const updatedMovie = await response.json();
//       setMovies(
//         movies.map((movie) =>
//           movie.id === updatedMovie.id ? updatedMovie : movie
//         )
//       );
// 
//       // Reset form and editing state
//       setEditingMovie(null);
//       setTitle('');
//       setDescription('');
//       setReleaseDate('');
//       setPublisher('');
//       setImageUrl(null);
//       setGenre([]);
//     } catch (error) {
//       console.error('Error updating movie:', error);
//     }
//   };
// 
//   return (
//     <div className='min-h-screen bg-gray-900 text-white'>
//       <div className='max-w-4xl mx-auto p-4'>
//         <h2 className='text-3xl font-bold mb-4'>Your Movies</h2>
// 
//         {/* Edit Movie Form */}
//         {editingMovie && (
//           <div className='bg-gray-800 p-6 rounded-lg mb-6'>
//             <h3 className='text-2xl font-bold mb-4'>Edit Movie</h3>
//             <form onSubmit={handleEditSubmit} className='space-y-4'>
//               <div>
//                 <label className='block text-sm font-medium text-gray-400'>
//                   Title
//                 </label>
//                 <input
//                   type='text'
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className='w-full px-3 py-2 bg-gray-700 rounded-lg text-white'
//                 />
//               </div>
//               <div>
//                 <label className='block text-sm font-medium text-gray-400'>
//                   Description
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className='w-full px-3 py-2 bg-gray-700 rounded-lg text-white'
//                   rows={4}
//                 />
//               </div>
//               <div>
//                 <label className='block text-sm font-medium text-gray-400'>
//                   Release Year
//                 </label>
//                 <input
//                   type='text'
//                   value={releaseDate}
//                   onChange={(e) => setReleaseDate(e.target.value)}
//                   className='w-full px-3 py-2 bg-gray-700 rounded-lg text-white'
//                 />
//               </div>
//               <div>
//                 <label className='block text-sm font-medium text-gray-400'>
//                   Publisher
//                 </label>
//                 <input
//                   type='text'
//                   value={publisher}
//                   onChange={(e) => setPublisher(e.target.value)}
//                   className='w-full px-3 py-2 bg-gray-700 rounded-lg text-white'
//                 />
//               </div>
//               <button
//                 type='submit'
//                 className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
//               >
//                 Update Movie
//               </button>
//             </form>
//           </div>
//         )}
// 
//         {/* Movies List */}
//         {movies.length > 0 ? (
//           movies.map((movie) => (
//             <div
//               key={movie.id}
//               className='flex items-center bg-gray-700 rounded-lg p-4 mb-4 shadow-md'
//             >
//               <img
//                 src={movie.img}
//                 alt={movie.title}
//                 className='w-20 h-32 object-cover rounded'
//               />
//               <div className='ml-4 flex-grow'>
//                 <h3 className='text-xl font-semibold'>{movie.title}</h3>
//                 <p className='text-gray-400'>{movie.release_yr}</p>
//                 <p className='text-yellow-400 text-sm'>
//                   ⭐ {movie.rating ?? 'N/A'}
//                 </p>
//               </div>
//               <div className='flex flex-col items-end'>
//                 <button
//                   onClick={() => handleEditMovie(movie)}
//                   className='border border-white px-3 py-1 rounded-lg hover:bg-white hover:text-black mb-3'
//                 >
//                   EDIT
//                 </button>
//                 <button
//                   onClick={() => handleDeleteMovie(movie.id)}
//                   className='border border-white px-3 py-1 rounded-lg hover:bg-white hover:text-black'
//                 >
//                   DELETE
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className='text-gray-400 text-center'>
//             No movies in your favorites.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };
// 
// export default UserMovies;

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
            console.log(user.name);
            console.log(user.email);
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
            <div className='grid gap-6 md:grid-cols-2'>
                {movies.map((movie) => (
                    <div
                        key={movie.movie_id}
                        className='p-6 bg-white rounded-lg shadow-md'
                    >
                        <h3 className='text-xl font-semibold'>{movie.title}</h3>
                        <p className='text-gray-400'>{movie.release_yr}</p>
                        <p className='text-yellow-400 text-sm'>
                            ⭐ {movie.rating ?? 'N/A'}
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

