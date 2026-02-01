import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <a href="#" className="logo">
                    <span className="logo-accent">&lt;</span>
                    Luxshan
                    <span className="logo-accent">/&gt;</span>
                </a>

                <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="nav-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <div className={`bar ${menuOpen ? 'active' : ''}`}></div>
                    <div className={`bar ${menuOpen ? 'active' : ''}`}></div>
                    <div className={`bar ${menuOpen ? 'active' : ''}`}></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
