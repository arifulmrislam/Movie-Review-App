import type React from 'react';
import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }
        try {
            await register(username, email, password);
            navigate('/'); 
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Registration failed. Please try again.');
            return;
        }
    };

    const handleLogInClick = () => {
        navigate('/login');
    };

    return (
        <div className='w-full h-screen flex items-center justify-center bg-red-100'>
            <div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl'>
                <div className='text-center mb-6'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500 text-white shadow-lg'>
                        <Lock size={32} />
                    </div>
                    <h2 className='text-2xl font-bold text-gray-900 mt-2'>
                        Create Account
                    </h2>
                    <p className='text-gray-600 mt-1'>Join us today!</p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Username
                        </label>
                        <div className='relative'>
                            <User className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500' />
                            <input
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className='w-full pl-10 py-2.5 border border-gray-300 rounded-full'
                                placeholder='Enter your username'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Email Address
                        </label>
                        <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500' />
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='w-full pl-10 py-2.5 border border-gray-300 rounded-full'
                                placeholder='Enter your email'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Password
                        </label>
                        <div className='relative'>
                            <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500' />
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='w-full pl-10 py-2.5 border border-gray-300 rounded-full'
                                placeholder='Create a password'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Confirm Password
                        </label>
                        <div className='relative'>
                            <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500' />
                            <input
                                type='password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className='w-full pl-10 py-2.5 border border-gray-300 rounded-full'
                                placeholder='Confirm your password'
                            />
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-red-500 text-white py-2.5 rounded-full hover:bg-red-600 transition duration-200 shadow-md cursor-pointer'
                    >
                        Create Account
                    </button>
                </form>
                <div className='text-center mt-5 text-sm text-gray-600'>
                    Already have an account?
                    <button
                        onClick={handleLogInClick}
                        className='ml-1 font-medium text-red-500 hover:text-red-600 transition cursor-pointer'
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
