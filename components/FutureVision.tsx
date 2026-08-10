'use client'

import { motion } from 'framer-motion'

const visionSteps = [
  { step: 'ROBOT', emoji: '🤖' },
  { step: 'SMART DEVICE', emoji: '🔊' },
  { step: 'MOBILE APP', emoji: '📱' },
  { step: 'GLOBAL NETWORK', emoji: '🌍' },
]

export default function FutureVision() {
  return (
    <section
      id="future"
      className="py-20 md:py-32 bg-gradient-to-br from-navy-900 to-navy-800 text-white relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-saffron/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          {/* Main Vision */}
          <div className="space-y-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
            >
              A future where no voice is forgotten.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              The long-term vision is to help communities preserve languages before knowledge disappears. By creating multiple pathways for technology to reach people, BhashaSetu can scale globally.
            </motion.p>
          </div>

          {/* Progression */}
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
              {visionSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="text-6xl md:text-7xl mb-4">{item.emoji}</div>
                  <p className="text-xl md:text-2xl font-bold text-center">{item.step}</p>

                  {/* Arrow */}
                  {index < visionSteps.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="hidden md:block text-3xl text-saffron/60 mt-4 md:absolute md:left-[calc(50%+2rem)] md:top-12"
                    >
                      ↓
                    </motion.div>
                  )}
                  {index < visionSteps.length - 1 && (
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="md:hidden text-2xl text-saffron/60 mt-3"
                    >
                      ↓
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center space-y-8 pt-12 border-t border-white/10"
          >
            <div className="space-y-4">
              <p className="text-3xl md:text-4xl font-bold leading-tight">
                Every language carries a world.
              </p>
              <p className="text-xl md:text-2xl text-gray-400">
                Every story shapes the future.
              </p>
            </div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <a
                href="#team"
                className="px-8 py-4 bg-gradient-saffron text-white rounded-xl font-semibold hover-lift shadow-medium transition-all inline-block"
              >
                Meet the Team
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
