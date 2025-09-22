import React from 'react';
import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-end">
                <nav>
                    <Link href="/authors" className="px-3 hover:text-gray-300">Meet the authors</Link>
                    <Link href="/create" className="px-3 hover:text-gray-300">Create an author</Link>
                    <Link href="/favorites" className="px-3 hover:text-gray-300">Your Favorites authors</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;