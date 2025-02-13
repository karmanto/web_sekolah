import content from '../data/content.json';

export interface User {
  email: string;
  password: string;
}

export const login = (email: string, password: string): boolean => {
  const user = content.users.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};