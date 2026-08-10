'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FutureVision() {
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

  const timeline = [
    {
      phase: 'Today',
      title: 'BhashaSetu Robot',
      description: 'A prototype that proves the concept is possible.',
    },
    {
      phase: 'Near Future',
      title: 'Smart Devices & Apps',
      description: 'More accessible forms that reach more communities.',
    },
    {
      phase: 'Future',
      title: 'Global Network',
      description: 'Millions of voices preserved. No language forgotten.',
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
      id="future"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-saffron-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

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
              A Future Where No Voice
              <span className="block text-saffron-600">Is Forgotten</span>
            </h2>
            <p className="text-lg text-navy-700 max-w-3xl mx-auto">
              Imagine a world where languages aren't lost. Where every culture's voice is preserved.
              Where future generations can hear their grandparents. That's the BhashaSetu vision.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants}>
            <div className="space-y-6 max-w-3xl mx-auto">
              {timeline.map((item, idx) => (
                <motion.div
                  key={item.phase}
                  className="relative"
                  variants={itemVariants}
                >
                  <div className="flex gap-6 items-start">
                    {/* Timeline dot */}
                    <motion.div
                      className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(232, 158, 76, 0.5)' }}
                    >
                      {idx + 1}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 bg-gradient-to-br from-saffron-50 to-orange-50 rounded-xl p-8 border border-saffron-200">
                      <p className="text-xs font-bold text-saffron-600 uppercase tracking-wide mb-2">
                        {item.phase}
                      </p>
                      <h3 className="text-2xl font-bold text-navy-900 mb-2">{item.title}</h3>
                      <p className="text-navy-700">{item.description}</p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {idx < timeline.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-20 bg-gradient-to-b from-saffron-400 to-saffron-200" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision Statement */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-12 lg:p-16 text-white shadow-2xl">
              <p className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                Every language carries a world.
              </p>
              <div className="h-1 w-24 bg-saffron-500 mx-auto mb-8 rounded-full" />
              <p className="text-lg lg:text-xl text-navy-100 max-w-2xl mx-auto leading-relaxed">
                BhashaSetu isn't just technology. It's a commitment to preserve human heritage, to respect
                elders, to celebrate diversity, and to ensure that no story is lost to time.
              </p>
              <p className="text-base text-saffron-300 mt-8 font-semibold">
                Before the last voice fades, we listen.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.button
              className="px-8 lg:px-12 py-4 lg:py-5 bg-saffron-500 hover:bg-saffron-600 text-white rounded-lg font-bold text-lg transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('team')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Meet the Team Behind BhashaSetu
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
