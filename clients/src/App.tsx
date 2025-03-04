import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import Navbar from './components/Navbar';
import UserMovies from './pages/UserMovies';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className='min-h-screen bg-gray-100'>
                    <Navbar />
                    <ToastContainer autoClose={1500} hideProgressBar />
                    <main className='container mx-auto px-4 py-8 bg-[#ffffff]'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/movies/:id' element={<MoviePage />} />
                            <Route path='/add-movie' element={<AddMovie />} />
                            <Route path='/user-movies' element={<UserMovies />} />
                            <Route path='/edit-movie/:id' element={<EditMovie />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/search' element={<SearchResults />} />
                        </Routes>
                    </main>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
