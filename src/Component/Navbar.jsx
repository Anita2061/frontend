import React, { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const guestLinks = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/service', label: 'Service' },
      { to: '/products', label: 'Product' },
      { to: '/contact', label: 'Contact' },
    ],
    []
  );

  const userLinks = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/service', label: 'Service' },
      { to: '/products', label: 'Product' },
      { to: '/orders', label: 'Orders' },
      { to: '/contact', label: 'Contact' },
    ],
    []
  );

  const links = user ? userLinks : guestLinks;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    `font-medium transition hover:text-black ${isActive ? 'text-black' : 'text-orange-600'}`;

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <Link to="/" onClick={closeMenu} className="cursor-pointer text-xl font-bold text-orange-600">
          Shopee
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/cart" className="relative text-orange-600 font-semibold hover:text-black transition">
            Cart
            {cartCount > 0 ? (
              <span className="absolute -top-2 -right-3 rounded-full bg-orange-600 px-2 text-xs text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="rounded-md bg-gray-900 px-5 py-2 text-white transition hover:bg-black"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-red-500 px-6 py-2 text-white transition hover:bg-red-600"
            >
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 justify-center rounded-lg border border-orange-200 px-3 py-2 text-orange-600 transition hover:bg-orange-50 lg:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <span className="text-lg leading-none">{isMenuOpen ? 'x' : '='}</span>
          <span className="text-sm font-semibold">{isMenuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-orange-100 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 font-medium transition ${
                    isActive
                      ? 'bg-orange-50 text-gray-900'
                      : 'text-orange-600 hover:bg-orange-50 hover:text-gray-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-2 flex flex-col gap-3 border-t border-orange-100 pt-4">
              <Link
                to="/cart"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-xl border border-orange-200 px-4 py-3 font-semibold text-orange-600"
              >
                <span>Cart</span>
                {cartCount > 0 ? (
                  <span className="rounded-full bg-orange-600 px-2 py-1 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                ) : null}
              </Link>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-xl bg-orange-600 px-4 py-3 text-center font-semibold text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
