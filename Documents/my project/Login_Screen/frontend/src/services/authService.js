import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const getCurrentUser = () => auth.currentUser;

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};
