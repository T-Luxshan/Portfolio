import React, { useState, useEffect, useRef } from 'react';
import { RESUME_URL } from '../constants';
import usePointerTilt from '../hooks/usePointerTilt';
import './Navbar.css';

const links = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Research', href: '#research', id: 'research' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Certifications', href: '#certifications', id: 'certifications' },
    { name: 'Contact', href: '#contact', id: 'contact' },
];

const NavLink = ({ link, isActive, onSelect }) => {
    const ref = usePointerTilt({ maxTilt: 0, maxMagnet: 3 });

    return (
        <a
            ref={ref}
            href={link.href}
            className={`nav-link ${isActive ? 'active' : ''}`}
            onClick={(e) => onSelect(e, link.href)}
        >
            {link.name}
        </a>
    );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('about');
    const progressRef = useRef(null);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            const scrollY = window.scrollY;
            setScrolled(scrollY > 50);

            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollable > 0 ? Math.min(scrollY / scrollable, 1) : 0;
            if (progressRef.current) {
                progressRef.current.style.setProperty('--progress', progress.toFixed(4));
            }
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    useEffect(() => {
        const observers = [];

        links.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
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
                        <NavLink
                            key={link.name}
                            link={link}
                            isActive={activeSection === link.id}
                            onSelect={handleNavClick}
                        />
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
            <div ref={progressRef} className="nav-progress" aria-hidden="true" />
        </nav>
    );
};

export default Navbar;
