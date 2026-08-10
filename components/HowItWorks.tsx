'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function HowItWorks() {
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

  const steps = [
    {
      number: '01',
      title: 'SPEAK',
      description: 'The user speaks naturally in their language. No typing. No complicated menus.',
      icon: '🗣️',
      color: 'from-saffron-500 to-saffron-600',
    },
    {
      number: '02',
      title: 'LISTEN',
      description: 'BhashaSetu captures the voice and analyzes the speech patterns.',
      icon: '👂',
      color: 'from-orange-500 to-orange-600',
    },
    {
      number: '03',
      title: 'TRANSCRIBE',
      description: 'Speech is converted into written text in the original language.',
      icon: '📝',
      color: 'from-amber-500 to-amber-600',
    },
    {
      number: '04',
      title: 'TRANSLATE',
      description: 'The story can be automatically translated into selected languages.',
      icon: '🌐',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      number: '05',
      title: 'PRESERVE',
      description: 'Original audio, transcription, and translations are securely stored.',
      icon: '💾',
      color: 'from-blue-500 to-blue-600',
    },
    {
      number: '06',
      title: 'SHARE',
      description: 'Knowledge becomes accessible to future generations and researchers.',
      icon: '🎓',
      color: 'from-teal-500 to-teal-600',
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  }

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
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
              How It <span className="text-saffron-600">Works</span>
            </h2>
            <p className="text-lg text-navy-700 max-w-3xl mx-auto">
              A six-step journey from voice to preserved knowledge. Simple. Respectful. Powerful.
            </p>
          </motion.div>

          {/* Timeline Steps */}
          <motion.div variants={itemVariants}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  className="relative"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Card */}
                  <div className="h-full bg-gradient-to-br from-white to-navy-50 rounded-2xl p-8 border border-navy-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Number Badge */}
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${step.color} text-white font-bold text-2xl mb-6`}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="text-5xl mb-4">{step.icon}</div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-navy-900 mb-3">{step.title}</h3>
                    <p className="text-navy-700 leading-relaxed">{step.description}</p>

                    {/* Progress indicator */}
                    <div className="mt-6 flex gap-1">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            i <= idx ? 'bg-saffron-500' : 'bg-navy-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Connecting Arrow (Desktop only) */}
                  {idx < steps.length - 1 && idx % 3 !== 2 && (
                    <motion.div
                      className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2 text-saffron-400"
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Benefit */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-navy-900 via-navy-800 to-saffron-600 rounded-2xl p-8 lg:p-12 text-white text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
            </div>
            <div className="relative">
              <p className="text-2xl lg:text-3xl font-bold mb-4">
                All in one system. All in one place.
              </p>
              <p className="text-base lg:text-lg text-navy-100 max-w-2xl mx-auto">
                No separate apps. No data scattered across platforms. One respectful, accessible interface
                that captures, preserves, and celebrates language and culture.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
