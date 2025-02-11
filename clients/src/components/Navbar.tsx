import type React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search } from 'lucide-react';
import logo from '../assets/logo-6-Photoroom.png';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className='bg-[#FA320A] text-white'>
            <nav className='container mx-auto'>
                <div className='flex flex-col space-y-2 px-4 py-2'>
                    <div className='flex items-center justify-between'>
                        <Link to='/' className='text-2xl font-bold lg:pl-20'>
                            {/* Movie Review App */}
                            <img className=" h-14" src={logo} alt="" srcset="" />
                        </Link>
                        <div className='flex items-center space-x-4'>
                            {user ? (
                                <>
                                    <Link to='/add-movie' className='hover:text-gray-200'>
                                        Add Movie
                                    </Link>
                                    <button onClick={logout} className='hover:text-gray-200'>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className='relative flex-1 max-w-xl'>
                                        <input
                                            type='search'
                                            placeholder='Search movies...'
                                            className='w-full px-4 py-2.5 pl-11 bg-white/10 rounded-lg placeholder-white/70 text-white transition-all focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-white/20'
                                        />
                                        <Search className='absolute left-3.5 top-3 h-5 w-5 text-white/70' />
                                    </div>
                                    <Link
                                        to='/login'
                                        className='hover:text-gray-200 border border-transparent rounded-md px-3 py-2 hover:border-white transition-all animate-borderSpin'
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to='/register'
                                        className='hover:text-gray-200 border border-transparent rounded-md px-3 py-2 hover:border-white transition-all animate-borderSpin'
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        {/* <div className='relative flex-1 max-w-xl'>
                            <input
                                type='search'
                                placeholder='Search movies...'
                                className='w-full px-4 py-2 pl-10 bg-white/10 rounded-md placeholder-white/70 focus:outline-none focus:bg-white/20'
                            />
                            <Search className='absolute left-3 top-2.5 h-5 w-5 text-white/70' />
                        </div> */}
                        {/* <div className='flex space-x-6 ml-6'>
                            <Link to='/' className='hover:text-gray-200'>
                                MOVIES
                            </Link>
                            <Link to='/' className='hover:text-gray-200'>
                                TV SHOWS
                            </Link>
                            <Link to='/' className='hover:text-gray-200'>
                                NEWS
                            </Link>
                            <Link to='/' className='hover:text-gray-200'>
                                SHOWTIMES
                            </Link>
                        </div> */}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
