'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

export default function ProblemSection() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const aspects = [
    { icon: '🗣️', label: 'Stories' },
    { icon: '🎭', label: 'Traditions' },
    { icon: '💭', label: 'Memories' },
    { icon: '📚', label: 'History' },
    { icon: '👥', label: 'Identity' },
    { icon: '🧠', label: 'Knowledge' },
  ]

  return (
    <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-50">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Main Heading */}
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight mb-6">
              When a language disappears,
              <span className="block text-saffron-600">more than words are lost.</span>
            </h2>
            <p className="text-lg text-navy-700 max-w-3xl mx-auto">
              A language is not just a system of communication. It carries centuries of human knowledge,
              experience, and cultural expression—all of which vanishes the moment the last native speaker
              passes away.
            </p>
          </motion.div>

          {/* What's Lost */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-navy-900 mb-8 text-center">
              What each disappearing language carries:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {aspects.map((aspect) => (
                <motion.div
                  key={aspect.label}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow"
                  whileHover={{ y: -4 }}
                  variants={itemVariants}
                >
                  <div className="text-4xl mb-3">{aspect.icon}</div>
                  <p className="font-semibold text-navy-900">{aspect.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* The Urgency */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
            <h3 className="text-2xl font-semibold text-navy-900 mb-6">The Challenge</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-saffron-600 mb-3">Oral Traditions</h4>
                <p className="text-navy-700 leading-relaxed">
                  Most endangered languages are passed down orally. There are no textbooks, no apps, no
                  digital records. Knowledge exists only in the voices of those who speak it.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-saffron-600 mb-3">Accessibility Gap</h4>
                <p className="text-navy-700 leading-relaxed">
                  Many of the people who know these languages best—elderly community members—may not be
                  comfortable using smartphones, typing, or learning complicated technology.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Statistics Placeholder */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <p className="text-4xl font-bold text-saffron-600 mb-2">[Data]</p>
              <p className="text-sm text-navy-600">
                languages disappear every year
                <br />
                <span className="text-xs italic">(To be verified)</span>
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <p className="text-4xl font-bold text-saffron-600 mb-2">[Data]</p>
              <p className="text-sm text-navy-600">
                of world's languages at risk of extinction
                <br />
                <span className="text-xs italic">(To be verified)</span>
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <p className="text-4xl font-bold text-saffron-600 mb-2">[Data]</p>
              <p className="text-sm text-navy-600">
                speakers lost as communities change
                <br />
                <span className="text-xs italic">(To be verified)</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
