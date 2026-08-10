'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const footerLinks = {
  Main: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#solution' },
    { label: 'Technology', href: '#technology' },
  ],
  Project: [
    { label: 'Languages', href: '#languages' },
    { label: 'Impact', href: '#impact' },
    { label: 'Team', href: '#team' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="space-y-16"
        >
          {/* Footer Content */}
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold gradient-text">BhashaSetu</h3>
              <p className="text-gray-400 leading-relaxed">
                A bridge between voices, languages and generations.
              </p>
            </motion.div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h4 className="font-semibold text-white">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-saffron transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-white">Location</h4>
              <div className="text-gray-400 space-y-1">
                <p>Heritage Hackers</p>
                <p>Jamnabai Narsee School</p>
                <p>Mumbai, India</p>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              © 2026 BhashaSetu. All rights reserved.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              Built with purpose by Heritage Hackers
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
