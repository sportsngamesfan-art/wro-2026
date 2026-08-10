'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-saffron-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-navy-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      </div>

      <motion.div
        className="max-w-5xl mx-auto text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-navy-900"
          variants={itemVariants}
        >
          Before the last voice fades,
          <span className="block text-saffron-600">we listen.</span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          className="text-lg sm:text-xl text-navy-700 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Thousands of languages carry stories, traditions and memories that exist only in the
          voices of the people who speak them. BhashaSetu uses technology to listen, preserve,
          translate and pass those voices forward.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-6"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-4 bg-navy-900 text-white rounded-lg font-semibold text-lg hover:bg-navy-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('bhashasetu')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explore BhashaSetu
          </motion.button>
          <motion.button
            className="px-8 py-4 border-2 border-navy-900 text-navy-900 rounded-lg font-semibold text-lg hover:bg-navy-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('how-it-works')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            See How It Works
          </motion.button>
        </motion.div>

        {/* Hero Visual - Audio Waveform Animation */}
        <motion.div
          className="pt-12 flex justify-center items-end gap-2 h-64"
          variants={itemVariants}
        >
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-saffron-500 to-saffron-300 rounded-full"
              animate={{
                height: [Math.random() * 100 + 20, Math.random() * 150 + 30, Math.random() * 100 + 20],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.05,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center pt-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
