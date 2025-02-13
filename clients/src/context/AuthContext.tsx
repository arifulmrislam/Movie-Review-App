// 'use client';
// 
// import axios from 'axios';
// import type React from 'react';
// import { createContext, useState, useContext, useEffect } from 'react';
// import { toast } from 'react-toastify';
// 
// 
// interface AuthContextType {
//     user: User | null;
//     login: (email: string, password: string) => Promise<void>;
//     logout: () => void;
//     register: (name: string, email: string, password: string) => Promise<void>;
// }
// 
// interface User {
//     id: string;
//     email: string;
// }
// 
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// 
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//     children,
// }) => {
//     const [user, setUser] = useState<User | null>(null);
// 
//     useEffect(() => {
//         // Check if user is logged in on initial load
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);
// 
//     const login = async (email: string, password: string) => {
//         try {
//             const response = await axios.post('http://localhost:3000/api/user/', { email, password });
//             const userData = response.data;
//             setUser(userData);
//             localStorage.setItem('user', JSON.stringify(userData));
//         } catch (error) {
//             console.error('Login failed:', error);
//             toast.error(
//                 <div className="toast-error">
//                     {/* <i className="fas fa-exclamation-circle"></i> */}
//                     <p>{'Invalid credential'}</p>
//                 </div>,
//                 {
//                     position: "top-right",
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     autoClose: 5000,
//                     draggable: true,
//                     progress: undefined,
//                     pauseOnHover: true,
//                 }
//             )
//         }
//     };
// 
//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem('user');
//     };
// 
//     const register = async (name: string, email: string, password: string) => {
//         try {
//             const response = await axios.post('http://localhost:3000/api/user/signup', {
//             name,    
//             email,
//             password,
//             });
//             console.log(response);
//             const userData = response.data;
//             setUser(userData);
//             localStorage.setItem('user', JSON.stringify(userData));
//         } catch (error) {
//             console.error('Register failed:', error);
//         }
//     };
// 
//     return (
//         <AuthContext.Provider value={{ user, login, logout, register }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
// 
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };


import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', { email, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please check your credentials.');
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/signup', {
                name,
                email,
                password,
            });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

