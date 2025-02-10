// 'use client';
// 
// import type React from 'react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// 
// const Login: React.FC = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { login } = useAuth();
//     const navigate = useNavigate();
// 
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await login(email, password);
//             navigate('/');
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };
// 
//     return (
//         <div className='max-w-md mx-auto'>
//             <h1 className='text-3xl font-bold mb-6'>Login</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className='mb-4'>
//                     <label htmlFor='email' className='block mb-2'>
//                         Email:
//                     </label>
//                     <input
//                         type='email'
//                         id='email'
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className='w-full px-3 py-2 border rounded-md'
//                     />
//                 </div>
//                 <div className='mb-4'>
//                     <label htmlFor='password' className='block mb-2'>
//                         Password:
//                     </label>
//                     <input
//                         type='password'
//                         id='password'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className='w-full px-3 py-2 border rounded-md'
//                     />
//                 </div>
//                 <button
//                     type='submit'
//                     className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };
// 
// export default Login;


import React, { useState } from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth, AuthProvider } from '../context/AuthContext';

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
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='min-h-auto w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4'>
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
                                    className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-400'
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
                                    className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-400'
                                    placeholder='Enter your password'
                                />
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <input
                                    id='remember-me'
                                    name='remember-me'
                                    type='checkbox'
                                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                                />
                                <label
                                    htmlFor='remember-me'
                                    className='ml-2 block text-sm text-gray-700'
                                >
                                    Remember me
                                </label>
                            </div>
                            <button
                                type='button'
                                className='text-sm font-medium text-blue-600 hover:text-blue-500'
                            >
                                Forgot password?
                            </button>
                        </div>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? (
                                <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin' />
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>
                    <p className='mt-6 text-center text-sm text-gray-600'>
                        Don't have an account?{' '}
                        <button className='font-medium text-blue-600 hover:text-blue-500'>
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
// function App() {
//     return (
//         <AuthProvider>
//             <MemoryRouter>
//                 <LoginPage />
//             </MemoryRouter>
//         </AuthProvider>
//     );
// }

export default Login;



