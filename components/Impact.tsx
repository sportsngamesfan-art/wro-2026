'use client'

import { motion } from 'framer-motion'

const impactAreas = [
  {
    title: 'Villages',
    description: 'Document local languages and oral traditions before they disappear.',
    icon: '🏘️',
  },
  {
    title: 'Elderly Communities',
    description: 'Give elders a simple way to preserve their knowledge and stories.',
    icon: '👴',
  },
  {
    title: 'Schools',
    description: 'Help students learn about local languages and cultural heritage.',
    icon: '🎓',
  },
  {
    title: 'Museums',
    description: 'Preserve oral histories as part of cultural archives.',
    icon: '🏛️',
  },
  {
    title: 'Researchers',
    description: 'Create structured linguistic and cultural archives for study.',
    icon: '🔬',
  },
  {
    title: 'Cultural Organizations',
    description: 'Support long-term language preservation projects.',
    icon: '🎭',
  },
]

export default function Impact() {
  return (
    <section
      id="impact"
      className="py-20 md:py-32 bg-gradient-to-br from-cream via-white to-ivory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          <div className="space-y-6 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900">
              Real-World Impact
            </h2>
            <p className="text-lg md:text-xl text-navy-700 max-w-3xl mx-auto">
              How BhashaSetu serves communities and preserves cultural heritage.
            </p>
          </div>

          {/* Impact Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group p-8 bg-white border border-navy-900/10 rounded-2xl hover:shadow-medium hover:-translate-y-2 transition-all"
              >
                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {area.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-navy-900 mb-3">
                  {area.title}
                </h3>

                {/* Description */}
                <p className="text-navy-700 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
