import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div className='w-full h-screen flex items-center justify-center bg-red-100'>
        <div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl'>
            <div className='text-center mb-6'>
                <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500 text-white shadow-lg'>
                    <LogIn size={32} />
                </div>
                <h2 className='text-2xl font-bold text-gray-900 mt-2'>
                    Welcome Back!
                </h2>
                <p className='text-gray-600 mt-1'>Sign in to continue</p>
            </div>
            <form onSubmit={handleSubmit} className='space-y-5'>
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
                            placeholder='Enter your password'
                        />
                    </div>
                </div>
                <button
                    type='submit'
                    className='w-full bg-red-500 text-white py-2.5 rounded-full hover:bg-red-600 transition duration-200 shadow-md cursor-pointer'
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Log In'}
                </button>
            </form>

            <div className='text-center mt-5 text-sm text-gray-600'>
                Don't have an account?
                <button
                    onClick={() => navigate('/register')}
                    className='ml-1 font-medium text-red-500 hover:text-red-600 transition cursor-pointer'
                >
                    Sign up
                </button>
            </div>
        </div>
    </div>
);
}

export default Login;
