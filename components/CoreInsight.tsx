'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

export default function CoreInsight() {
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
    { number: '01', text: 'Person speaks naturally', icon: '🗣️' },
    { number: '02', text: 'BhashaSetu listens', icon: '👂' },
    { number: '03', text: 'Speech is transcribed', icon: '📝' },
    { number: '04', text: 'Language is translated', icon: '🌐' },
    { number: '05', text: 'Story is preserved', icon: '💾' },
    { number: '06', text: 'Knowledge is shared', icon: '🎓' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
    <section id="core" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Core Insight */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight mb-6">
              Don't make the elder
              <span className="block text-saffron-600">learn the technology.</span>
              <span className="block text-navy-900">Make the technology</span>
              <span className="block text-saffron-600">reach the elder.</span>
            </h2>
            <p className="text-lg text-navy-700 max-w-3xl mx-auto mt-8">
              BhashaSetu is designed around one principle: accessibility. A person should simply be
              able to speak. The technology handles everything else.
            </p>
          </motion.div>

          {/* Process Flow */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-navy-900 mb-12 text-center">The BhashaSetu Process</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  className="relative"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-gradient-to-br from-navy-50 to-saffron-50 rounded-xl p-8 border border-navy-100 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-3">{step.icon}</div>
                    <p className="text-sm font-semibold text-saffron-600 uppercase tracking-wide mb-2">
                      Step {step.number}
                    </p>
                    <p className="text-lg font-semibold text-navy-900">{step.text}</p>
                  </div>

                  {/* Arrow */}
                  {idx < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:flex absolute -right-8 top-1/2 transform -translate-y-1/2 text-saffron-400"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Insight */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-8 lg:p-12 text-white text-center"
          >
            <p className="text-lg lg:text-xl font-semibold mb-4">The Technology Should Adapt to People</p>
            <p className="text-base lg:text-lg text-navy-100">
              A smartphone assumes users can read menus, navigate apps, type, and understand complex interfaces.
              BhashaSetu requires something simpler: the ability to speak. The technology handles the rest.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
