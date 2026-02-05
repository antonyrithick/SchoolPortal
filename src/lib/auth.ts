import { User, UserRole } from '@/types';

const STORAGE_KEY = 'school_auth_user';

// Mock users for demo
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@school.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    id: '2',
    name: 'John Teacher',
    email: 'teacher@school.com',
    password: 'teacher123',
    role: 'teacher' as UserRole,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher'
  },
  {
    id: '3',
    name: 'Sarah Parent',
    email: 'parent@school.com',
    password: 'parent123',
    role: 'parent' as UserRole,
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=parent'
  }
];

export const login = (email: string, password: string): User | null => {
  console.log('Login attempt:', { email, password });
  
  const user = MOCK_USERS.find(
    u => u.email === email && u.password === password
  );
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    console.log('Login successful:', userWithoutPassword);
    return userWithoutPassword;
  }
  
  console.log('Login failed: Invalid credentials');
  return null;
};

export const logout = () => {
  console.log('Logging out user');
  localStorage.removeItem(STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEY);
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      console.log('Current user retrieved:', user);
      return user;
    } catch (e) {
      console.error('Error parsing user data:', e);
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const hasRole = (role: UserRole): boolean => {
  const user = getCurrentUser();
  return user?.role === role;
};
