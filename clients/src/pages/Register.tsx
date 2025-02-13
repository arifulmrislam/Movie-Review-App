// 'use client';
// 
// import type React from 'react';
// import { useState } from 'react';
// import { Lock } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// 
// const Register: React.FC = () => {
//     const [username, setUsername] = useState(''); 
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const { register } = useAuth();
//     const navigate = useNavigate();
// 
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (password !== confirmPassword) {
//             alert("Passwords don't match");
//             return;
//         }
//         try {
//             await register(username, email, password);
//             navigate('/');
//         } catch (error) {
//             console.error('Registration failed:', error);
//         }
//     };
// 
//     return (
//         <div className='min-h-auto w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4'>
//             <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8 transform transition-all'>
//                 <div className='flex flex-col items-center mb-8'>
//                     <div className='h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
//                         <Lock className='h-6 w-6 text-blue-600' />
//                     </div>
//                     <h1 className='text-3xl font-bold text-gray-900'>Create Account</h1>
//                     <p className='text-gray-600 mt-2'>Join us today!</p>
//                 </div>
//                 <form onSubmit={handleSubmit} className='space-y-6'>
//                     <div>
//                         <label
//                             htmlFor='username'
//                             className='block text-sm font-medium text-gray-700 mb-2'
//                         >
//                             Username
//                         </label>
//                         <input
//                             type='text'
//                             id='username'
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                             className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
//                             placeholder='Enter your username'
//                         />
//                     </div>
//                     <div>
//                         <label
//                             htmlFor='email'
//                             className='block text-sm font-medium text-gray-700 mb-2'
//                         >
//                             Email address
//                         </label>
//                         <input
//                             type='email'
//                             id='email'
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
//                             placeholder='Enter your email'
//                         />
//                     </div>
//                     <div>
//                         <label
//                             htmlFor='password'
//                             className='block text-sm font-medium text-gray-700 mb-2'
//                         >
//                             Password
//                         </label>
//                         <input
//                             type='password'
//                             id='password'
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
//                             placeholder='Create a password'
//                         />
//                     </div>
//                     <div>
//                         <label
//                             htmlFor='confirmPassword'
//                             className='block text-sm font-medium text-gray-700 mb-2'
//                         >
//                             Confirm Password
//                         </label>
//                         <input
//                             type='password'
//                             id='confirmPassword'
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             required
//                             className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
//                             placeholder='Confirm your password'
//                         />
//                     </div>
//                     <button
//                         type='submit'
//                         className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
//                     >
//                         Create Account
//                     </button>
//                 </form>
//                 <p className='mt-6 text-center text-sm text-gray-600'>
//                     Already have an account?{' '}
//                     <a href='#' className='text-blue-600 hover:text-blue-700 font-medium'>
//                         Sign in
//                     </a>
//                 </p>
//             </div>
//         </div>
//     );
// };
// export default Register;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify'; // Import toast

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
    try {
      await register(username, email, password);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className='min-h-auto w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8 transform transition-all'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='w-full px-4 py-3 rounded-lg border'
              placeholder='Enter your username'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Email address
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full px-4 py-3 rounded-lg border'
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full px-4 py-3 rounded-lg border'
              placeholder='Create a password'
            />
          </div>
          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='w-full px-4 py-3 rounded-lg border'
              placeholder='Confirm your password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg'
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
