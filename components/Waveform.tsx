'use client'

import { motion } from 'framer-motion'

export function Waveform() {
  const bars = Array.from({ length: 40 }, (_, i) => i)

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.05,
        repeatDelay: 0.5,
      },
    },
  }

  const barVariants = {
    animate: {
      scaleY: [0.3, Math.random() * 0.7 + 0.3, 0.3],
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  }

  return (
    <div className="flex items-center justify-center gap-1 h-full">
      {/* Center Circle */}
      <div className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full gradient-saffron opacity-20 blur-xl" />
      <motion.div className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-saffron to-gold opacity-40 blur-md" />

      {/* Waveform Bars */}
      <motion.div
        className="flex items-center justify-center gap-1 h-64"
        variants={containerVariants}
        animate="animate"
      >
        {bars.map((i) => (
          <motion.div
            key={i}
            variants={barVariants}
            className="w-2 md:w-3 rounded-full origin-center"
            style={{
              background: `linear-gradient(135deg, #d4a574, #a87e3f)`,
              height: '100px',
              opacity: 0.6 + (i / bars.length) * 0.4,
            }}
          />
        ))}
      </motion.div>

      {/* Outer Ring Animation */}
      <motion.div
        className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full border-2 border-saffron/20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  )
}
