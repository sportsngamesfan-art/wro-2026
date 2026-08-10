'use client'

import { motion } from 'framer-motion'

const steps = [
  { label: 'PERSON SPEAKS', icon: '🗣️' },
  { label: 'BHASHASETU LISTENS', icon: '👂' },
  { label: 'SPEECH IS TRANSCRIBED', icon: '📝' },
  { label: 'LANGUAGE IS TRANSLATED', icon: '🌍' },
  { label: 'STORY IS PRESERVED', icon: '💾' },
]

export default function CoreInsight() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-ivory via-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          {/* Main Message */}
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight">
              Don't make the elder learn the technology.
            </h2>
            <p className="text-lg md:text-xl text-navy-700 max-w-3xl mx-auto leading-relaxed">
              Make the technology reach the elder.
            </p>
            <p className="text-base md:text-lg text-navy-600 max-w-2xl mx-auto">
              BhashaSetu is designed around accessibility. A person should simply be able to speak. The technology handles the complicated parts.
            </p>
          </div>

          {/* Process Flow */}
          <div className="relative py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              {steps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center flex-1"
                >
                  <div className="text-5xl md:text-6xl mb-4">{step.icon}</div>
                  <p className="text-sm md:text-base font-semibold text-navy-900 text-center leading-tight">
                    {step.label}
                  </p>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-[calc(50%+3rem)] top-12 text-2xl text-saffron/40 -rotate-45">
                      ↓
                    </div>
                  )}
                  {index < steps.length - 1 && (
                    <div className="md:hidden mt-4 text-xl text-saffron/40">
                      ↓
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Insight */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 bg-gradient-to-br from-saffron/10 to-gold/10 border border-saffron/20 rounded-2xl text-center"
          >
            <p className="text-lg md:text-2xl font-semibold text-navy-900">
              The technology should adapt to people—not the other way around.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
