'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { apiClient, LoginResponse } from '../lib/api';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  branchId?: string;
  branch?: any;
  phoneNumber?: string;
  isActive: boolean;
  lastLogin?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'REFRESH_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'REFRESH_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token },
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await apiClient.login(email, password);
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token },
        });
        
        toast.success('Login successful!');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE' });
      const message = error.response?.data?.message || error.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await apiClient.changePassword(currentPassword, newPassword);
      if (response.success) {
        toast.success('Password changed successfully');
      } else {
        throw new Error(response.message || 'Failed to change password');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to change password';
      toast.error(message);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await apiClient.getCurrentUser();
      if (response.success && response.data) {
        const user = response.data;
        localStorage.setItem('user_data', JSON.stringify(user));
        dispatch({ type: 'REFRESH_USER', payload: user });
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    changePassword,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
