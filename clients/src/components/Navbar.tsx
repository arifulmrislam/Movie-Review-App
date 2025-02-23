'use client';

import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Menu, X, User, LogOut, PlusCircle } from 'lucide-react';
import logo from '../assets/logo-6-Photoroom.png';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className='bg-[#FA320A] text-white shadow-lg'>
            <nav className='container mx-auto px-10 py-3'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <Link to='/' className='flex items-center space-x-2'>
                        <img
                            className='h-12 w-auto'
                            src='https://res.cloudinary.com/di835w1z1/image/upload/v1726561472/logo_gdap68.png'
                            alt='Logo'
                        />
                    </Link>

                    {/* Centered Search Bar */}
                    <div className='flex-1 flex justify-center'>
                        <form onSubmit={handleSearch} className='relative w-full max-w-lg'>
                            <input
                                type='search'
                                placeholder='Search movies...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full px-4 py-2 pl-10 bg-white/10 rounded-full placeholder-white/70 text-white transition-all focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-white/20'
                            />
                            <button type='submit' className='absolute left-3 top-2.5'>
                                <Search className='h-5 w-5 text-white/70' />
                            </button>
                        </form>
                    </div>

                    {/* User Links */}
                    <div className='hidden md:flex items-center space-x-10 font-semibold'>
                        {user ? (
                            <>
                                <Link
                                    to='/user-movies'
                                    className='hover:text-gray-200 transition-colors'
                                >
                                    Hi, {user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1).toLowerCase()}
                                </Link>
                                <Link
                                    to='/add-movie'
                                    className='hover:text-gray-200 transition-colors'
                                >
                                    <span>Add Movie</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className='hover:text-gray-200 transition-colors cursor-pointer'
                                >
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to='/login'
                                    className='bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-full transition-all'
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/register'
                                    className='bg-white text-[#FA320A] font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition-all'
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className='md:hidden' onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className='md:hidden px-4 py-2 space-y-3'>
                        import {Search, X} from 'lucide-react';

                        <form onSubmit={handleSearch} className='relative w-full max-w-md mx-auto'>
                            <input
                                type='search'
                                placeholder='Search movies...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full px-4 py-2 pl-12 pr-10 bg-white/10 rounded-full placeholder-white/70 text-white transition-all focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-white/30'
                            />

                            {/* Search Icon */}
                            <button type='submit' className='absolute left-4 top-2.5 text-white/70 hover:text-white'>
                                <Search className='h-5 w-5' />
                            </button>

                            {/* Clear Input Button (Only visible when there's text) */}
                            {searchQuery && (
                                <button type='button' onClick={() => setSearchQuery('')} className='absolute right-4 top-2.5 text-white/70 hover:text-white'>
                                    <X className='h-5 w-5' />
                                </button>
                            )}
                        </form>


                        {user ? (
                            <>
                                <Link
                                    to='/add-movie'
                                    className='block py-2 hover:bg-white/10 rounded-lg transition-all'
                                >
                                    Add Movie
                                </Link>
                                <Link
                                    to='/user-movies'
                                    className='block py-2 hover:bg-white/10 rounded-lg transition-all'
                                >
                                    Your Movies
                                </Link>
                                <button
                                    onClick={logout}
                                    className='block w-full text-left py-2 hover:bg-white/10 rounded-lg transition-all'
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to='/login'
                                    className='block py-2 hover:bg-white/10 rounded-lg transition-all'
                                >
                                    <User size={18} className='inline mr-2' />
                                    Login
                                </Link>
                                <Link
                                    to='/register'
                                    className='block py-2 hover:bg-white/10 rounded-lg transition-all'
                                >
                                    <User size={18} className='inline mr-2' />
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
