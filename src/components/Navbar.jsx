import React, { useState, useEffect } from 'react';
import { RESUME_URL } from '../constants';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    const links = [
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Skills', href: '#skills', id: 'skills' },
        { name: 'Experience', href: '#experience', id: 'experience' },
        { name: 'Education', href: '#education', id: 'education' },
        { name: 'Research', href: '#research', id: 'research' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Contact', href: '#contact', id: 'contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sectionIds = links.map((link) => link.id);
        const observers = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((observer) => observer.disconnect());
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        const navbarEl = e.target.closest('nav');
        const navbarHeight = navbarEl ? navbarEl.offsetHeight : 80;
        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
        setMenuOpen(false);
    };

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
                            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-resume-btn"
                        onClick={() => setMenuOpen(false)}
                    >
                        View Resume
                    </a>
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
