import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext);
  const location = useLocation();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const isCourseListPage = location.pathname.includes('/course-list');
  const navigateTo = useNavigate();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 bg-gradient-to-r from-black to-[#0A1E40] lg:px-36 border-b border-yellow-500 py-4 ${
        isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'
      }`}
    >
      {/* ✅ Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer h-10 w-auto brightness-0 invert hue-rotate-180" 
      />

      {/* ✅ Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 text-white">
        {user && (
          <>
            <button onClick={() => navigate('/educator')}>
              {isEducator ? 'Educator Dashboard' : 'Become Educator'}
            </button>
            <Link to="/my-enrollments">My Enrollments</Link>
          </>
        )}
        
        {/* ✅ Text-to-Speech Button */}
        <button 
          onClick={() => navigateTo('/speech-converter')}
          className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700"
        >
          Text-to-Speech
        </button>

        {/* ✅ Debugging Game Button */}
        <button
          onClick={() => navigateTo('/debug-game')}
          className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700"
        >
          Debugging Game
        </button>

        {/* ✅ Code Game Button */}
        <button
          onClick={() => navigateTo('/code-game')}
          className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700"
        >
          Code Game
        </button>

        {/* ✅ Dashboard Button */}
        <a
          href="https://v0-full-stack-lms-development.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700"
        >
          Dashboard
        </a>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={openSignIn} className="bg-blue-600 text-white px-5 py-2 rounded-full">
            Create Account
          </button>
        )}
      </div>

      {/* ✅ Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        {user && (
          <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
            <button onClick={() => navigate('/educator')}>
              {isEducator ? 'Educator Dashboard' : 'Become Educator'}
            </button>
            <Link to="/my-enrollments">My Enrollments</Link>
          </div>
        )}

        {/* ✅ Text-to-Speech Button (Mobile) */}
        <button 
          onClick={() => navigateTo('/speech-converter')}
          className="bg-green-600 text-white px-4 py-2 rounded-full text-xs"
        >
          TTS
        </button>

        {/* ✅ Debugging Game Button (Mobile) */}
        <button
          onClick={() => navigateTo('/debug-game')}
          className="bg-purple-600 text-white px-4 py-2 rounded-full text-xs"
        >
          Debugging Game
        </button>

        {/* ✅ Code Game Button (Mobile) */}
        <button
          onClick={() => navigateTo('/code-game')}
          className="bg-red-600 text-white px-4 py-2 rounded-full text-xs"
        >
          Code Game
        </button>

        {/* ✅ Dashboard Button (for Mobile) */}
        <a
          href="https://v0-full-stack-lms-development.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs"
        >
          Dashboard
        </a>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={openSignIn}>
            <img src={assets.user_icon} alt="User Icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;