import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from './Register';
import { auth } from 'Config'; // To mock its methods
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'), // Preserve other exports like getAuth if needed by other parts
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
  Toaster: () => <div data-testid="toaster" />, // Mock Toaster component
}));

// Mock react-router-dom's useHistory
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
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


describe('Register Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    createUserWithEmailAndPassword.mockClear();
    updateProfile.mockClear();
    toast.success.mockClear();
    toast.error.mockClear();
    mockHistoryPush.mockClear();
    mockLocalStorageSetItem.mockClear();
    mockWindowLocationReload.mockClear();
  });

  test('renders registration form correctly', () => {
    render(<Register />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // Note: The button text in Register.jsx is "Sign in", not "Sign up". Testing current state.
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument(); // Check if Toaster is rendered
  });

  test('handles successful registration', async () => {
    const mockUser = { uid: 'testUser123' };
    createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });
    updateProfile.mockResolvedValue(undefined); // updateProfile usually returns void/undefined on success

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        'password123'
      );
    });
    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledWith(mockUser, { displayName: 'Test User' });
    });
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('User registered Successfully'));
    await waitFor(() => expect(mockLocalStorageSetItem).toHaveBeenCalledWith('name', 'Test User'));
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/admin/default'));
  });

  test('handles failed registration (e.g., email already in use)', async () => {
    const errorMessage = 'Email already in use';
    createUserWithEmailAndPassword.mockRejectedValue({
      code: 'auth/email-already-in-use',
      message: errorMessage,
    });

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        'password123'
      );
    });

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Please Try Again Later'));

    expect(updateProfile).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
    expect(mockLocalStorageSetItem).not.toHaveBeenCalled();
    expect(mockHistoryPush).not.toHaveBeenCalled();
    expect(mockWindowLocationReload).not.toHaveBeenCalled();
  });
});
