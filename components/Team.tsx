'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Team() {
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

  const team = [
    { name: 'Ayansh Agarwal', role: 'Lead Developer' },
    { name: 'Riaan Laiwala', role: 'Hardware & Systems' },
    { name: 'Siddharth Thawani', role: 'AI & Algorithms' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
      id="team"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-navy-50"
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
              Meet <span className="text-saffron-600">Heritage Hackers</span>
            </h2>
            <div className="space-y-2">
              <p className="text-lg text-navy-700">Jamnabai Narsee School, Mumbai</p>
              <p className="text-sm text-saffron-600 font-semibold">WRO Future Innovators 2026 - Junior Category</p>
            </div>
          </motion.div>

          {/* Team Members */}
          <motion.div variants={itemVariants}>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                  whileHover={{ y: -8 }}
                  variants={itemVariants}
                >
                  {/* Photo Placeholder */}
                  <div className="w-full aspect-square bg-gradient-to-br from-navy-100 to-saffron-100 flex items-center justify-center text-navy-400 text-6xl">
                    👤
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-navy-900 mb-1">{member.name}</h3>
                    <p className="text-saffron-600 font-semibold">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* School & Context */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 lg:p-12 border border-navy-100 text-center"
          >
            <h3 className="text-2xl font-bold text-navy-900 mb-4">About Heritage Hackers</h3>
            <p className="text-lg text-navy-700 max-w-3xl mx-auto leading-relaxed">
              A team of three passionate students from Jamnabai Narsee School, Mumbai, competing in the WRO
              (World Robot Olympiad) Future Innovators category. Our mission: to build technology that preserves
              human heritage and respects cultural diversity.
            </p>
          </motion.div>

          {/* Recognition Section */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-navy-600 uppercase tracking-wide font-semibold mb-4">
              Competition Information
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-6 border border-navy-100 shadow-sm">
                <p className="text-xs text-saffron-600 font-bold uppercase tracking-wide mb-2">
                  Competition
                </p>
                <p className="text-lg font-semibold text-navy-900">WRO 2026</p>
                <p className="text-sm text-navy-600 mt-1">Future Innovators - Junior</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-navy-100 shadow-sm">
                <p className="text-xs text-saffron-600 font-bold uppercase tracking-wide mb-2">
                  Institution
                </p>
                <p className="text-lg font-semibold text-navy-900">Jamnabai Narsee School</p>
                <p className="text-sm text-navy-600 mt-1">Mumbai, India</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
