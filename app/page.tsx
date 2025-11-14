"use client";

import { useState, useEffect, useRef } from "react";
import {
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { IoGameControllerOutline } from "react-icons/io5";
import ProfessionalView from "./components/ProfessionalView";
import GamingView from "./components/GamingView";

// Icon SVGs
const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const CardsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

export default function Home() {
  const [isGamingMode, setIsGamingMode] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number>(450);
  const currentYear = new Date().getFullYear();
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const professionalViewRef = useRef<HTMLDivElement>(null);
  const gamingViewRef = useRef<HTMLDivElement>(null);
  
  // Apply gaming theme class to root element
  useEffect(() => {
    if (isGamingMode) {
      document.documentElement.classList.add('gaming-theme');
    } else {
      document.documentElement.classList.remove('gaming-theme');
    }
  }, [isGamingMode]);

  // Dynamically measure and set container height based on visible content
  useEffect(() => {
    const measureHeight = () => {
      const visibleView = isGamingMode ? gamingViewRef.current : professionalViewRef.current;
      if (visibleView) {
        // Measure the scrollHeight (works even when absolutely positioned)
        const height = visibleView.scrollHeight;
        setContainerHeight(height);
      }
    };

    // Small delay to ensure DOM is updated and animations have started
    const timeoutId = setTimeout(measureHeight, 100);
    
    // Also measure on window resize
    window.addEventListener('resize', measureHeight);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', measureHeight);
    };
  }, [isGamingMode]);
  
  return (
    <div className={`min-h-screen bg-base-100 flex flex-col relative transition-all duration-[400ms] ${isGamingMode ? 'gaming-theme' : ''}`}>
      {/* Navbar */}
      <nav className="w-full border-b border-base-300 py-4 px-6 transition-all duration-[400ms]">
        <div className="container mx-auto max-w-6xl flex items-center relative">
          <div className="flex items-center gap-6">
            {/* Professional Links */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-base-content/70 hover:text-accent flex items-center gap-2 transition-opacity duration-[400ms] ease-in-out ${
                isGamingMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              style={{ transition: 'opacity 0.4s ease-in-out' }}
              aria-label="Resume"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">Resume</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-base-content/70 hover:text-accent flex items-center gap-2 transition-opacity duration-[400ms] ease-in-out ${
                isGamingMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              style={{ transition: 'opacity 0.4s ease-in-out' }}
              aria-label="GitHub"
            >
              <GitHubIcon />
              <span className="font-medium">GitHub</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
            
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-base-content/70 hover:text-accent flex items-center gap-2 transition-opacity duration-[400ms] ease-in-out ${
                isGamingMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              style={{ transition: 'opacity 0.4s ease-in-out' }}
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
              <span className="font-medium">LinkedIn</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Gaming Links - Absolutely positioned at left */}
          <div className={`absolute left-6 flex items-center gap-6 transition-opacity duration-[400ms] ease-in-out ${
            isGamingMode ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ transition: 'opacity 0.4s ease-in-out' }}>
            <a
              href="https://untapped.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/70 hover:text-accent flex items-center gap-2"
              aria-label="Untapped"
            >
              <CardsIcon />
              <span className="font-medium">Untapped</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
            
            <a
              href="https://moxfield.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/70 hover:text-accent flex items-center gap-2"
              aria-label="Moxfield"
            >
              <CardsIcon />
              <span className="font-medium">Moxfield</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1 flex flex-col items-center justify-center">
        {/* Name - Static, always visible, part of normal flow */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-base-content text-center pt-16 mb-12">
          Nithin Muthukumar
        </h1>
        
        {/* Content Container - relative container for views, positioned below name in normal flow */}
        <div 
          ref={contentContainerRef}
          className="relative w-full pb-12 transition-all duration-[400ms]" 
          style={{ minHeight: `${containerHeight}px` }}
        >
          {/* Professional View */}
          <ProfessionalView ref={professionalViewRef} isVisible={!isGamingMode} />

          {/* Gaming View */}
          <GamingView ref={gamingViewRef} isVisible={isGamingMode} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative border-t border-base-300 py-6 transition-all duration-[400ms]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base-content/60 text-sm transition-colors duration-[400ms]">
            © {currentYear} Nithin Muthukumar. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsGamingMode(!isGamingMode)}
        className="fixed top-6 right-6 btn btn-circle btn-accent hover:scale-110 transition-transform shadow-lg z-50"
        aria-label={isGamingMode ? "Switch to Professional" : "Switch to Gaming"}
      >
        {isGamingMode ? (
          <CodeBracketIcon className="w-6 h-6" />
        ) : (
          <IoGameControllerOutline className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
