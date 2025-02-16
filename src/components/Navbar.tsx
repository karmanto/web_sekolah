import React from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../lib/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Artikel', href: '/articles' },
    { name: 'Agenda', href: '/events' },
    { name: 'Pengumuman', href: '/announcements' },
    { name: 'Galeri', href: '/gallery' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 min-[850px]:px-6 lg:px-8">
        <div className="flex justify-between h-16">
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/sdiubaaz.png" alt="Logo SDIUBAAZ" className="h-10 w-auto" />
            <span className="text-xl font-bold text-indigo-600">SDIUBAAZ</span>
          </Link>
        </div>

          <div className="hidden min-[850px]:ml-6 min-[850px]:flex min-[850px]:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {item.name}
              </Link>
            ))}
            {authenticated ? (
              <>
                <Link
                  to="/admin"
                  className={`${
                    location.pathname.startsWith('/admin')
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-1 pt-1 border-transparent text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-1 pt-1 border-transparent text-gray-500 hover:text-gray-700"
              >
                Login
              </Link>
            )}
          </div>

          <div className="flex items-center min-[850px]:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="min-[850px]:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {authenticated ? (
              <>
                <Link
                  to="/admin"
                  className={`${
                    location.pathname.startsWith('/admin')
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}