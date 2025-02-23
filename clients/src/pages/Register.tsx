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
            // navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Registration failed. Please try again.');
            return;
        }
    };

    const handleLogInClick = () => {
        navigate('/login');
    }
    return (
        <div className='min-h-auto w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8 transform transition-all'>
                <div className='flex flex-col items-center mb-8'>
                    <div className='h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
                        <Lock className='h-6 w-6 text-blue-600' />
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900'>Create Account</h1>
                    <p className='text-gray-600 mt-2'>Join us today!</p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label
                            htmlFor='username'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Username
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <User className='h-5 w-5 text-gray-400' />
                            </div>
                            <input
                                type='text'
                                id='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg'
                                placeholder='Enter your username'
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Email address
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Mail className='h-5 w-5 text-gray-400' />
                            </div>
                            <input
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg'
                                placeholder='Enter your email'
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Password
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock className='h-5 w-5 text-gray-400' />
                            </div>
                            <input
                                type='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg'
                                placeholder='Create a password'
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='confirmPassword'
                            className='block text-sm font-medium text-gray-700 mb-2'
                        >
                            Confirm Password
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock className='h-5 w-5 text-gray-400' />
                            </div>
                            <input
                                type='password'
                                id='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg'
                                placeholder='Confirm your password'
                            />
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer'
                    >
                        Create Account
                    </button>
                </form>
                <p className='mt-6 text-center text-sm text-gray-600'>
                    Already have an account?{' '}
                    <button
                        onClick={handleLogInClick}
                        className='text-blue-600 hover:text-blue-700 font-medium cursor-pointer'
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
