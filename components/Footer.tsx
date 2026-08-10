'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#bhashasetu' },
    { label: 'Technology', href: '#technology' },
    { label: 'Languages', href: '#languages' },
    { label: 'Impact', href: '#impact' },
    { label: 'Team', href: '#team' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          className="py-16 lg:py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold">
                Bhasha<span className="text-saffron-400">Setu</span>
              </h3>
              <p className="text-navy-300 leading-relaxed">
                A bridge between voices, languages and generations. Preserving human heritage through technology.
              </p>
              <p className="text-saffron-400 font-semibold text-sm">Before the last voice fades, we listen.</p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-navy-300 hover:text-saffron-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Project Info */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold mb-4">Project</h4>
              <ul className="space-y-2 text-navy-300">
                <li>Competition: WRO 2026</li>
                <li>Category: Future Innovators</li>
                <li>Level: Junior</li>
              </ul>
            </motion.div>

            {/* School Info */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold mb-4">Team</h4>
              <p className="text-navy-300 mb-2">Heritage Hackers</p>
              <p className="text-navy-400 text-sm">
                Jamnabai Narsee School
                <br />
                Mumbai, India
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-navy-700" />

          {/* Bottom Footer */}
          <motion.div
            variants={itemVariants}
            className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-navy-400"
          >
            <p>© {currentYear} Heritage Hackers. All rights reserved.</p>
            <p className="text-center text-sm">
              Built with passion for language preservation
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
