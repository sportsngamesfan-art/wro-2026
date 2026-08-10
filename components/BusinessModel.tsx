'use client'

import { motion } from 'framer-motion'
import { Badge } from './Badge'

const deploymentModels = [
  {
    title: 'BhashaSetu Robot',
    description: 'The complete robotic platform for communities.',
    use_cases: ['Villages', 'Cultural centres', 'Museums', 'Schools', 'Old-age homes'],
    icon: '🤖',
  },
  {
    title: 'Smart Device',
    description: 'An affordable voice-first device for homes and communities.',
    use_cases: ['Affordable home deployment', 'Community centers', 'Easy installation'],
    icon: '🔊',
  },
  {
    title: 'Mobile App',
    description: 'For people who already have smartphones.',
    use_cases: ['Individual users', 'Remote recording', 'Mobile accessibility'],
    icon: '📱',
  },
  {
    title: 'Research Platform',
    description: 'For linguists, researchers, and cultural organizations.',
    use_cases: ['Data analysis', 'Linguistic research', 'Archive management'],
    icon: '🔬',
  },
]

export default function BusinessModel() {
  return (
    <section className="py-20 md:py-32 bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              From Robot to Every Home
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
              The technology doesn't have to remain a physical robot. As the project evolves, BhashaSetu can scale through multiple deployment models to reach more communities.
            </p>
          </div>

          {/* Deployment Models */}
          <div className="grid md:grid-cols-2 gap-8">
            {deploymentModels.map((model, i) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
              >
                {/* Icon */}
                <div className="text-5xl mb-4">{model.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2">{model.title}</h3>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {model.description}
                </p>

                {/* Use Cases */}
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-widest text-saffron/80 mb-3">
                    For:
                  </p>
                  <ul className="space-y-2">
                    {model.use_cases.map((use_case) => (
                      <li key={use_case} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-saffron mt-1">•</span>
                        {use_case}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Core Principle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 bg-gradient-to-br from-saffron/10 to-gold/10 border border-saffron/20 rounded-2xl text-center"
          >
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              The ultimate goal: Make language preservation <span className="text-saffron font-semibold">affordable, accessible and scalable.</span>
            </p>
            <p className="text-gray-400 text-sm">
              By diversifying deployment methods, we ensure that communities worldwide can participate in preserving their languages, regardless of their economic situation or technological infrastructure.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
