'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function BusinessModel() {
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

  const forms = [
    {
      name: 'BhashaSetu Robot',
      description: 'For villages, cultural centres, museums, schools, and old-age homes.',
      features: [
        'Complete hardware platform',
        'Autonomous operation',
        'Community interaction',
        'Real-time preservation',
      ],
    },
    {
      name: 'Smart Device',
      description: 'Affordable standalone device for homes and community spaces.',
      features: [
        'Compact design',
        'Easy setup',
        'Voice interface',
        'Offline capability',
      ],
    },
    {
      name: 'Mobile App',
      description: 'For people who already have smartphones.',
      features: [
        'Cross-platform',
        'User-friendly',
        'Cloud sync',
        'Community access',
      ],
    },
    {
      name: 'Platform',
      description: 'For researchers, linguists, schools, museums, and organizations.',
      features: [
        'API access',
        'Research tools',
        'Analytics',
        'Institutional integration',
      ],
    },
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
      id="business"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-navy-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 mb-6">
              From Robot to Every <span className="text-saffron-600">Home</span>
            </h2>
            <p className="text-lg text-navy-700 max-w-3xl mx-auto">
              The vision isn't to build one robot. The vision is to make language preservation affordable,
              accessible, and scalable globally.
            </p>
          </motion.div>

          {/* Forms Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center">
              BhashaSetu Can Take Many Forms
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {forms.map((form, idx) => (
                <motion.div
                  key={form.name}
                  className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm hover:shadow-lg transition-all"
                  whileHover={{ y: -4 }}
                  variants={itemVariants}
                >
                  <div className="text-4xl mb-3">
                    {['🤖', '📱', '💻', '🌐'][idx]}
                  </div>
                  <h4 className="font-bold text-navy-900 mb-2">{form.name}</h4>
                  <p className="text-sm text-navy-700 mb-4">{form.description}</p>
                  <ul className="text-xs space-y-2 text-navy-600">
                    {form.features.map((feature) => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Core Principle */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-8 lg:p-12 text-white"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">The Core Principle</h3>
              <p className="text-lg text-navy-100 leading-relaxed mb-6">
                Technology should not be a luxury. Language preservation should not be gatekept by cost or
                complexity. Our goal is to make it accessible to anyone who wants to preserve their language.
              </p>
              <p className="text-base text-navy-200">
                Affordability · Accessibility · Scalability
              </p>
            </div>
          </motion.div>

          {/* Vision Statement */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-xl p-8 border border-navy-100"
          >
            <div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">Scalability Roadmap</h3>
              <div className="space-y-4">
                {[
                  'Phase 1: Physical robot prototype (current)',
                  'Phase 2: Affordable smart device variant',
                  'Phase 3: Mobile application launch',
                  'Phase 4: Global platform for researchers',
                  'Phase 5: Community-driven preservation network',
                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3"
                    whileHover={{ x: 8 }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-saffron-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-navy-700 pt-0.5">{phase}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-saffron-50 to-orange-50 rounded-lg p-8 border border-saffron-200">
              <p className="text-sm font-semibold text-saffron-600 uppercase tracking-wide mb-3">Vision</p>
              <p className="text-lg font-semibold text-navy-900 leading-relaxed">
                A global network where communities, researchers, schools, and cultural organizations can
                preserve, celebrate, and share languages before the last voice fades.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
