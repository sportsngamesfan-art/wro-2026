'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Languages() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.3 })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const currentLanguages = [
    { name: 'Sanskrit', script: 'संस्कृत', status: 'Supported' },
    { name: 'Tamil', script: 'தமிழ்', status: 'Supported' },
    { name: 'Marathi', script: 'मराठी', status: 'Supported' },
    { name: 'Odia', script: 'ଓଡ଼ିଆ', status: 'Supported' },
  ]

  const futureLanguages = [
    { name: 'Warli', script: 'वरली', status: 'Planned' },
    { name: 'Kashmiri', script: 'کشمیری', status: 'Planned' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="languages"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 mb-6">
              Preserving <span className="text-saffron-600">Voices Across Cultures</span>
            </h2>
            <p className="text-lg text-navy-700 max-w-3xl mx-auto">
              BhashaSetu begins with India's rich linguistic heritage. Our initial focus is on endangered
              languages that carry centuries of cultural knowledge.
            </p>
          </motion.div>

          {/* Currently Supported */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center">Currently Supported</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentLanguages.map((lang) => (
                <motion.div
                  key={lang.name}
                  className="bg-gradient-to-br from-saffron-50 to-orange-50 rounded-xl p-6 border border-saffron-200 shadow-sm hover:shadow-lg transition-shadow text-center"
                  whileHover={{ y: -4 }}
                  variants={itemVariants}
                >
                  <div className="text-sm font-semibold text-saffron-600 uppercase tracking-wide mb-2">
                    {lang.status}
                  </div>
                  <h4 className="text-2xl font-bold text-navy-900 mb-2">{lang.name}</h4>
                  <p className="text-3xl font-semibold text-navy-600">{lang.script}</p>
                  <div className="mt-4 pt-4 border-t border-saffron-200">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      ✓ Active
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Future Expansion */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center">Future Expansion</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {futureLanguages.map((lang) => (
                <motion.div
                  key={lang.name}
                  className="bg-gradient-to-br from-navy-50 to-blue-50 rounded-xl p-6 border border-navy-200 border-dashed shadow-sm hover:shadow-lg transition-shadow text-center opacity-75"
                  whileHover={{ y: -4 }}
                  variants={itemVariants}
                >
                  <div className="text-sm font-semibold text-navy-600 uppercase tracking-wide mb-2">
                    {lang.status}
                  </div>
                  <h4 className="text-2xl font-bold text-navy-900 mb-2">{lang.name}</h4>
                  <p className="text-3xl font-semibold text-navy-600">{lang.script}</p>
                  <div className="mt-4 pt-4 border-t border-navy-200">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      ⏳ Coming Soon
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Insight */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-8 lg:p-12 text-white"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Start with These Languages?</h3>
                <p className="text-navy-100 leading-relaxed">
                  These languages carry centuries of Indian cultural heritage. They are spoken by communities
                  whose elders possess irreplaceable knowledge about history, traditions, and wisdom that exists
                  nowhere else.
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-lg font-semibold">BhashaSetu is designed to expand:</p>
                <ul className="text-navy-100 space-y-2">
                  <li>✓ More Indian languages</li>
                  <li>✓ Global indigenous languages</li>
                  <li>✓ Endangered minority languages</li>
                  <li>✓ Regional dialects and oral traditions</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
