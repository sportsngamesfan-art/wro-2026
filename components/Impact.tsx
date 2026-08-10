'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Impact() {
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

  const impactAreas = [
    {
      icon: '🏘️',
      title: 'Villages',
      description: 'Document local languages and oral traditions before they disappear.',
    },
    {
      icon: '👴',
      title: 'Elderly Communities',
      description: 'Give elders a simple, respectful way to preserve their lifetime of knowledge.',
    },
    {
      icon: '📚',
      title: 'Schools',
      description: 'Help students learn about local languages, cultures, and heritage.',
    },
    {
      icon: '🏛️',
      title: 'Museums',
      description: 'Create living archives of oral histories and cultural traditions.',
    },
    {
      icon: '🔬',
      title: 'Researchers',
      description: 'Provide structured linguistic and cultural data for academic study.',
    },
    {
      icon: '🎭',
      title: 'Cultural Organizations',
      description: 'Support long-term language preservation and community engagement.',
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
      id="impact"
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
              Real-World <span className="text-saffron-600">Impact</span>
            </h2>
            <p className="text-lg text-navy-700 max-w-3xl mx-auto">
              BhashaSetu isn't a technology looking for a problem. It's a solution designed around real
              communities and their genuine needs.
            </p>
          </motion.div>

          {/* Impact Cards */}
          <motion.div variants={itemVariants}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {impactAreas.map((area) => (
                <motion.div
                  key={area.title}
                  className="bg-gradient-to-br from-white to-navy-50 rounded-xl p-8 border border-navy-100 shadow-sm hover:shadow-lg transition-all"
                  whileHover={{ y: -4, scale: 1.02 }}
                  variants={itemVariants}
                >
                  <div className="text-5xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{area.title}</h3>
                  <p className="text-navy-700 leading-relaxed">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Principle */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-2xl p-8 lg:p-12 text-white text-center shadow-lg"
          >
            <p className="text-2xl lg:text-3xl font-bold">
              BhashaSetu Is Not For Us. It's For Them.
            </p>
            <p className="text-base lg:text-lg text-saffron-100 max-w-2xl mx-auto mt-6">
              Every feature, every design decision, every interaction is centered around the communities
              whose voices we want to preserve. Technology should serve people, not the other way around.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
