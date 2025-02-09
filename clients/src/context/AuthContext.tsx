'use client';

import type React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
}

interface User {
    id: string;
    email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check if user is logged in on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        // Implement your login logic here
        // For now, we'll just set a mock user
        const mockUser = { id: '1', email };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const register = async (email: string, password: string) => {
        // Implement your registration logic here
        // For now, we'll just set a mock user
        const mockUser = { id: '1', email };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
