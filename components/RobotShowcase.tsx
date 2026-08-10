'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function RobotShowcase() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState('microphone')

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

  const components = {
    microphone: {
      name: 'Microphone',
      description: 'High-sensitivity audio capture for clear voice recording in various environments.',
      position: 'top-16 left-10',
    },
    camera: {
      name: 'Camera',
      description: 'Visual interaction and documentation of the recording session.',
      position: 'top-20 right-10',
    },
    processor: {
      name: 'Raspberry Pi 5',
      description: 'Central computing platform handling speech recognition and language processing.',
      position: 'bottom-20 left-1/2 -translate-x-1/2',
    },
    speaker: {
      name: 'Speaker',
      description: 'Enables voice interaction and playback of translations.',
      position: 'bottom-16 right-10',
    },
    display: {
      name: '7" Touchscreen Display',
      description: 'Simple visual interface for user interaction. (Prototype)',
      position: 'top-1/2 right-4 -translate-y-1/2',
    },
    sensors: {
      name: 'Sensors',
      description: 'Ultrasonic sensors for navigation and obstacle detection.',
      position: 'bottom-16 left-10',
    },
  }

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
      id="bhashasetu"
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
              Meet <span className="text-saffron-600">BhashaSetu</span>
            </h2>
            <p className="text-lg text-navy-700 max-w-3xl mx-auto">
              An intelligent robotic platform designed to interact respectfully with community members
              and preserve their voices and stories.
            </p>
          </motion.div>

          {/* Robot Interactive Display */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative bg-white rounded-2xl border-2 border-navy-100 p-8 lg:p-16 aspect-square max-w-2xl mx-auto shadow-lg">
              {/* Placeholder Robot */}
              <div className="absolute inset-0 flex items-center justify-center text-navy-200">
                <div className="text-center">
                  <div className="text-8xl mb-4">🤖</div>
                  <p className="text-navy-400 font-semibold">BhashaSetu Robot Platform</p>
                  <p className="text-sm text-navy-300 mt-2">(Visual Placeholder - To be updated with prototype images)</p>
                </div>
              </div>

              {/* Interactive Component Labels */}
              {Object.entries(components).map(([key, data]) => (
                <motion.button
                  key={key}
                  className={`absolute w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    selectedComponent === key
                      ? 'bg-saffron-500 border-saffron-600 ring-4 ring-saffron-200'
                      : 'bg-navy-200 border-navy-400 hover:bg-navy-300'
                  }`}
                  style={{ ...(data.position as any) }}
                  onClick={() => setSelectedComponent(key)}
                  aria-label={data.name}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs font-bold text-white flex items-center justify-center w-full h-full">
                    {key[0].toUpperCase()}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Component Details */}
            <motion.div
              key={selectedComponent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 p-8 bg-gradient-to-r from-navy-50 to-saffron-50 rounded-xl border border-navy-100"
            >
              <h3 className="text-2xl font-bold text-navy-900 mb-2">
                {components[selectedComponent as keyof typeof components].name}
              </h3>
              <p className="text-navy-700 text-lg leading-relaxed">
                {components[selectedComponent as keyof typeof components].description}
              </p>
            </motion.div>
          </motion.div>

          {/* Hardware Components Grid */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center">Hardware Architecture</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Raspberry Pi 5', specs: '8GB RAM, Quad-core processor' },
                { name: 'Microphone Array', specs: 'High-sensitivity audio capture' },
                { name: 'Camera Module', specs: 'Visual documentation' },
                { name: '7" Touchscreen', specs: 'Simple tactile interface (Prototype)' },
                { name: 'Speakers', specs: 'Audio feedback and playback' },
                { name: 'Sensors', specs: '3× HC-SR04, 1× VL53L0X, 1× MPU-6050' },
              ].map((component) => (
                <motion.div
                  key={component.name}
                  className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm hover:shadow-lg transition-shadow"
                  whileHover={{ y: -4 }}
                  variants={itemVariants}
                >
                  <h4 className="font-semibold text-navy-900 mb-2">{component.name}</h4>
                  <p className="text-sm text-navy-600">{component.specs}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
