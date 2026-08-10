'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#problem', label: 'The Problem' },
    { href: '#solution', label: 'BhashaSetu' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#technology', label: 'Technology' },
    { href: '#languages', label: 'Languages' },
    { href: '#impact', label: 'Impact' },
    { href: '#future', label: 'Future' },
    { href: '#team', label: 'Team' },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center space-x-2">
            <div className="text-xl md:text-2xl font-bold gradient-text">
              BhashaSetu
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy-900 hover:text-saffron transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#solution"
              className="px-6 py-2 bg-gradient-saffron text-white rounded-lg font-medium hover-lift shadow-soft"
            >
              Explore BhashaSetu
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-cream transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-slide-down">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-navy-900 hover:bg-cream rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#solution"
              className="block w-full px-4 py-2 bg-gradient-saffron text-white rounded-lg font-medium text-center hover-lift"
              onClick={() => setIsOpen(false)}
            >
              Explore BhashaSetu
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
