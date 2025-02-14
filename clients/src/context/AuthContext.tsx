import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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

