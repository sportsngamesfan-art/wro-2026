'use client'

import { motion } from 'framer-motion'
import { Waveform } from './Waveform'

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
      id="home"
      className="min-h-screen bg-gradient-to-br from-ivory via-cream to-navy-900/5 overflow-hidden relative pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-navy-900"
              >
                Before the last voice fades,
                <span className="block gradient-text">we listen.</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-navy-700 leading-relaxed max-w-lg"
              >
                Thousands of languages carry stories, traditions and memories that exist only in the voices of the people who speak them. BhashaSetu uses technology to listen, preserve, translate and pass those voices forward.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href="#solution"
                className="px-8 py-4 bg-gradient-saffron text-white rounded-xl font-semibold hover-lift shadow-medium text-center transition-all"
              >
                Explore BhashaSetu
              </a>
              <a
                href="#how-it-works"
                className="px-8 py-4 border-2 border-navy-900 text-navy-900 rounded-xl font-semibold hover:bg-navy-900 hover:text-white transition-all text-center"
              >
                See How It Works
              </a>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full flex items-center justify-center"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Waveform />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
