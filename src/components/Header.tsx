import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { auth } from '../utils/firebase'

async function handleLogout() {
    await signOut(auth)
}

function Header() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => onAuthStateChanged(auth, setUser), [])

    return (
        <>
            {/* Navigation bar */}
            <nav className="site-nav">
                {/* Logo + nav links */}
                <div className="brand-group">
                    <Link to="/" className="brand">
                        <span className="brand-dot"></span>
                        <span>DEV@Deakin</span>
                    </Link>

                    <div className="nav-links">
                        <Link to="/#about">About</Link>
                        <Link to="/#work">Work</Link>
                        <Link to="/#contact">Contact</Link>
                    </div>
                </div>

                {/* Search bar */}
                <div className="search-wrap">
                    <svg
                        className="search-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                </div>

                {/* Post and Login */}
                <div className="nav-actions">
                    <Link to="/post">Post</Link>
                    {user && <span className="auth-greeting">Hello, {user.displayName || "there"}!</span>}
                    {user && <button className="logout-button" type="button" onClick={handleLogout}>Logout</button>}
                    {!user && <Link to="/login">Login</Link>}
                </div>
            </nav>

            {/* Banner */}
            <div className="relative w-full group">
                <img src="images/banner.png" alt="Banner" className="w-full h-64 mb-3" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="absolute inset-0 pb-6 flex items-end justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h2 className="text-white text-3xl font-bold"> Hey, I'm Timmy!</h2>
                </div>
            </div>
        </>
    );
}

export default Header;