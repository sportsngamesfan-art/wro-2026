'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Technology() {
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

  const hardware = [
    { name: 'Raspberry Pi 5', desc: '8GB RAM, quad-core processor' },
    { name: 'Microphone Array', desc: 'High-sensitivity audio capture' },
    { name: 'Camera Module', desc: 'Visual documentation' },
    { name: '7" Touchscreen', desc: 'Simple tactile interface' },
    { name: 'Speakers', desc: 'Audio feedback' },
    { name: 'Sensors', desc: '3× HC-SR04, VL53L0X, MPU-6050' },
  ]

  const software = [
    { name: 'Speech Recognition', desc: 'Convert voice to text' },
    { name: 'Language Processing', desc: 'Understand context and meaning' },
    { name: 'Translation Engine', desc: 'Translate between languages' },
    { name: 'Audio Processing', desc: 'Enhance and preserve voice quality' },
    { name: 'Story Database', desc: 'Secure data storage' },
    { name: 'Mobile Integration', desc: 'Connect with users and researchers' },
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
      id="technology"
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
              The Technology <span className="text-saffron-600">Behind BhashaSetu</span>
            </h2>
            <p className="text-lg text-navy-700 max-w-3xl mx-auto">
              A carefully engineered system combining cutting-edge AI, robust hardware, and thoughtful design
              to make language preservation accessible and scalable.
            </p>
          </motion.div>

          {/* Hardware Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center">Hardware Stack</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hardware.map((item) => (
                <motion.div
                  key={item.name}
                  className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm hover:shadow-lg transition-shadow"
                  whileHover={{ y: -4 }}
                  variants={itemVariants}
                >
                  <div className="text-3xl mb-3">⚙️</div>
                  <h4 className="font-bold text-navy-900 mb-2">{item.name}</h4>
                  <p className="text-sm text-navy-700">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Software Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center">Software & AI</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {software.map((item) => (
                <motion.div
                  key={item.name}
                  className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm hover:shadow-lg transition-shadow"
                  whileHover={{ y: -4 }}
                  variants={itemVariants}
                >
                  <div className="text-3xl mb-3">🧠</div>
                  <h4 className="font-bold text-navy-900 mb-2">{item.name}</h4>
                  <p className="text-sm text-navy-700">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Architecture Diagram */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 lg:p-12 border border-navy-100 shadow-sm">
            <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center">System Architecture</h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                { layer: 'User', desc: 'Community member speaks their story' },
                { layer: 'Input', desc: 'Microphone captures voice' },
                { layer: 'Processing', desc: 'Raspberry Pi runs speech recognition & translation' },
                { layer: 'Storage', desc: 'Audio, text, and translations stored securely' },
                { layer: 'Access', desc: 'Researchers and communities access the archive' },
              ].map((item) => (
                <motion.div
                  key={item.layer}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-navy-50 to-saffron-50 rounded-lg border border-navy-100"
                  whileHover={{ x: 8 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-saffron-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {item.layer[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{item.layer}</p>
                    <p className="text-sm text-navy-700">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Not Just Translation? */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-8 lg:p-12 text-white"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Just Translation Isn't Enough</h3>
                <p className="text-navy-100 leading-relaxed mb-4">
                  Translation captures the words, but not the culture. BhashaSetu preserves the voice, the accent,
                  the emotion, and the context—everything that makes a language truly alive.
                </p>
                <p className="text-navy-100 leading-relaxed">
                  We're not building a robot that translates like Google Translate. We're building a cultural
                  bridge that respects language as a living expression of human heritage.
                </p>
              </div>
              <div className="space-y-3">
                <div className="bg-navy-700/50 rounded-lg p-4">
                  <p className="font-semibold text-saffron-300 mb-1">What Gets Preserved</p>
                  <p className="text-sm text-navy-100">✓ Original voice and accent</p>
                  <p className="text-sm text-navy-100">✓ Emotional expression</p>
                  <p className="text-sm text-navy-100">✓ Cultural context</p>
                  <p className="text-sm text-navy-100">✓ Linguistic nuances</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
