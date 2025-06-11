import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import { auth } from 'Config'; // To mock its methods
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    // You might need to return a more complete mock object
    // if other auth properties/methods are accessed
  })),
  signInWithEmailAndPassword: jest.fn(),
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock react-router-dom's useHistory
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Preserve other exports
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

// Mock localStorage
const mockLocalStorageSetItem = jest.fn();
global.Storage.prototype.setItem = mockLocalStorageSetItem;


// Mock window.location.reload
const mockWindowLocationReload = jest.fn();
Object.defineProperty(window, 'location', {
  configurable: true,
  value: { reload: mockWindowLocationReload },
});


describe('Login Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    require('firebase/auth').signInWithEmailAndPassword.mockClear();
    toast.success.mockClear();
    toast.error.mockClear();
    mockHistoryPush.mockClear();
    mockLocalStorageSetItem.mockClear();
    mockWindowLocationReload.mockClear();
  });

  test('renders login form correctly', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    const mockUser = { uid: '123' };
    require('firebase/auth').signInWithEmailAndPassword.mockResolvedValue({ user: mockUser });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(require('firebase/auth').signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth, // This should be the actual auth object from Config
        'test@example.com',
        'password123'
      );
    });

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('logedin successfully'));
    await waitFor(() => expect(mockLocalStorageSetItem).toHaveBeenCalledWith('name', 'test@example.com'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/admin/default'));
  });

  test('handles failed login', async () => {
    const errorMessage = 'Invalid credentials';
    require('firebase/auth').signInWithEmailAndPassword.mockRejectedValue({
      code: 'auth/wrong-password',
      message: errorMessage,
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(require('firebase/auth').signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        'wrongpassword'
      );
    });

    // Check that success toast was NOT called
    expect(toast.success).not.toHaveBeenCalled();
    // Check that history.push was NOT called
    expect(mockHistoryPush).not.toHaveBeenCalled();
    // Check that localStorage.setItem was NOT called
    expect(mockLocalStorageSetItem).not.toHaveBeenCalled();

    // In the current implementation, errors are only console.logged.
    // If UI error feedback is added, this test should be updated.
    // For now, we can at least ensure no success actions were taken.
  });
});
