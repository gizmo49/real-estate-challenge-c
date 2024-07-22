import React, { useEffect, useState } from 'react';
import { FirebaseUser, auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';

const Header: React.FC = () => {
    const [user, setUser] = useState<FirebaseUser | null>(null);

    useEffect(() => {
        // Set up listener for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.href = '/'; // Redirect to home or login page
        } catch (error: any) {
            console.error('Logout error:', error.message);
        }
    };

    return (
        <header className="p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link href="/" className='brand'>
                        <ReactSVG  src="https://res.cloudinary.com/metacare/image/upload/v1721594526/airbnb-1_uzaml1.svg" />
                        {/* <img alt="Logo" /> */}
                    </Link>
                </div>
                <nav>
                    <ul className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <li>
                                    <Link href="/profile">
                                        <span className="text-[14px] text-[#535353] cursor-pointer">{user.displayName || 'Profile'}</span>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="arrow-btn"
                                    >
                                        <span className="text-[14px] text-[#535353] cursor-pointer">Log Out</span>
                                        {/* <ReactSVG src='https://res.cloudinary.com/metacare/image/upload/v1721604402/Logout_2_ls4shq.svg' /> */}
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login">
                                        <span className="text-[14px] text-[#535353] cursor-pointer">Login</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/signup">
                                        <span className="text-[14px] text-[#535353] cursor-pointer">Sign Up</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
