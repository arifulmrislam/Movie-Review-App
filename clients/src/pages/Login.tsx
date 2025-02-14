import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Attempt login
            await login(email, password);
            navigate('/'); // Only navigate if login is successful
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please check your credentials.');
            // Do not navigate, the page will stay on the login screen
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUpClick = () => {
        navigate('/register');
    };

    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4'>
                        <LogIn size={32} />
                    </div>
                    <h2 className='text-2xl font-bold text-gray-900'>Welcome back</h2>
                    <p className='text-gray-600 mt-2'>
                        Please enter your details to sign in
                    </p>
                </div>
                <div className='bg-white p-8 rounded-xl shadow-lg'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
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
                                    id='email'
                                    type='email'
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
                                    id='password'
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg'
                                    placeholder='Enter your password'
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                    <div className='text-center mt-6 text-sm text-gray-600'>
                        Don't have an account?
                        <button
                            onClick={handleSignUpClick}
                            className='font-medium text-blue-600 hover:text-blue-500 ml-1'
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
