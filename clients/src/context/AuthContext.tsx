import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    user: any;
    token: string | null;
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
    const storedToken = localStorage.getItem('token');
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(storedToken);
    const [loading, setLoading] = useState(true); // Add a loading state
    const navigate = useNavigate();

    useEffect(() => {
        if (storedToken) {
            fetchUser(storedToken);
        } else {
            setLoading(false); // No token, so stop loading
        }
    }, [storedToken]);

    const fetchUser = async (token: string) => {
        try {
            const response = await axios.get('http://localhost:3000/api/user/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data.user);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            logout();
        } finally {
            setLoading(false); // Ensure loading state is updated
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/user/login',
                { email, password }
            );
            setUser(response.data.user);
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);

            toast.success('Login successful!');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/user/signup',
                { name, email, password }
            );
            setUser(response.data.user);
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);

            toast.success('Registration successful!');
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {!loading ? children : <p>Loading...</p>} {/* Prevent flickering */}
        </AuthContext.Provider>
    );
};

