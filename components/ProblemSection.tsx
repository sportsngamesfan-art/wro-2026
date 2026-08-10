'use client'

import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'

export default function ProblemSection() {
  const ref = useInView()

  const problems = [
    'Stories',
    'Traditions',
    'Memories',
    'History',
    'Identity',
    'Knowledge',
    'Culture',
  ]

  return (
    <section
      id="problem"
      className="py-20 md:py-32 bg-navy-900 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              When a language disappears, more than words are lost.
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
              Every language is a repository of knowledge, culture, and identity. A language carries thousands of years of human experience—ways of thinking, expressing emotions, and understanding the world that cannot be fully translated into another language.
            </p>
          </div>

          {/* What's Lost */}
          <div>
            <p className="text-sm uppercase tracking-widest text-saffron mb-8">
              When a language disappears, we lose:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {problems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur text-center hover:bg-white/10 transition-all"
                >
                  <p className="font-semibold text-lg">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Challenge */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">The Challenge</h3>
            <p className="text-lg leading-relaxed text-gray-300 mb-6">
              Many languages are primarily passed down orally, existing mainly in the voices of living speakers—often elderly community members who may not be comfortable using smartphones or complicated digital tools.
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              <span className="text-saffron font-semibold">The race is against time.</span> We have a limited window to capture these voices before they fade forever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
