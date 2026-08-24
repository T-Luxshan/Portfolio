import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Research from './components/Research';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Intro from './components/Intro';
import CursorFX from './components/CursorFX';
import './App.css';

function App() {
  return (
    <div className="App">
      <Intro />
      <CursorFX />
      <div className="atmosphere" aria-hidden="true" />
      <div className="atmosphere-vignette" aria-hidden="true" />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Research />
      <Projects />
      <Certifications />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;
