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
        <div className='bg-gradient-to-r from-[#FA320A] to-[#FF6B4A] text-white shadow-lg'>
            <nav className='container mx-auto'>
                <div className='flex items-center justify-between px-4 py-3'>
                    <Link to='/' className='flex items-center space-x-2'>
                        <img
                            className='h-12 w-auto'
                            src={logo || '/placeholder.svg'}
                            alt='Logo'
                        />
                        {/* <span className='text-2xl font-bold hidden sm:inline'>
              MovieCritic
            </span> */}
                    </Link>

                    <div className='hidden md:flex items-center space-x-4'>
                        <form onSubmit={handleSearch} className='relative'>
                            <input
                                type='search'
                                placeholder='Search movies...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-64 px-4 py-2 pl-10 bg-white/10 rounded-full placeholder-white/70 text-white transition-all focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-white/20'
                            />
                            <button type='submit' className='absolute left-3 top-2.5'>
                                <Search className='h-5 w-5 text-white/70' />
                            </button>
                        </form>

                        {user ? (
                            <>
                                <Link
                                    to='/add-movie'
                                    className='flex items-center space-x-1 hover:text-gray-200 transition-colors'
                                >
                                    <PlusCircle size={18} />
                                    <span>Add Movie</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className='flex items-center space-x-1 hover:text-gray-200 transition-colors'
                                >
                                    <LogOut size={18} />
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

                    <button className='md:hidden' onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className='md:hidden px-4 py-2 space-y-3'>
                        <form onSubmit={handleSearch} className='relative'>
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

                        {user ? (
                            <>
                                <Link
                                    to='/add-movie'
                                    className='block py-2 hover:bg-white/10 rounded-lg transition-all'
                                >
                                    <PlusCircle size={18} className='inline mr-2' />
                                    Add Movie
                                </Link>
                                <button
                                    onClick={logout}
                                    className='block w-full text-left py-2 hover:bg-white/10 rounded-lg transition-all'
                                >
                                    <LogOut size={18} className='inline mr-2' />
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





