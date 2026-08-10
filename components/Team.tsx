'use client'

import { motion } from 'framer-motion'

const teamMembers = [
  {
    name: 'Ayansh Agarwal',
    role: 'Team Member',
    placeholder: 'Photo',
  },
  {
    name: 'Riaan Laiwala',
    role: 'Team Member',
    placeholder: 'Photo',
  },
  {
    name: 'Siddharth Thawani',
    role: 'Team Member',
    placeholder: 'Photo',
  },
]

export default function Team() {
  return (
    <section
      id="team"
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
              Meet Heritage Hackers
            </h2>
            <div className="space-y-2">
              <p className="text-lg md:text-xl text-navy-700 font-semibold">
                Jamnabai Narsee School, Mumbai
              </p>
              <p className="text-navy-600">
                WRO Future Innovators 2026 — Junior Category
              </p>
            </div>
          </div>

          {/* Team Members */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                {/* Photo Placeholder */}
                <div className="mb-6 aspect-square bg-gradient-to-br from-saffron/20 to-gold/20 border-2 border-saffron/30 rounded-2xl flex items-center justify-center overflow-hidden relative group-hover:border-saffron/60 transition-all">
                  <div className="text-center">
                    <div className="text-5xl mb-2">👤</div>
                    <p className="text-sm text-navy-700 font-medium">{member.placeholder}</p>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-navy-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-navy-700 font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* School Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center p-8 md:p-12 bg-gradient-to-br from-saffron/5 to-gold/5 border border-saffron/10 rounded-2xl"
          >
            <p className="text-navy-900 leading-relaxed max-w-2xl mx-auto">
              Built by three students from <span className="font-semibold">Jamnabai Narsee School</span> in Mumbai, BhashaSetu represents the power of young innovators driven by a mission to preserve human culture and heritage.
            </p>
          </motion.div>

          {/* Badges */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="px-6 py-3 bg-navy-900 text-white rounded-full font-semibold text-sm"
            >
              🏫 Jamnabai Narsee School
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="px-6 py-3 bg-gradient-saffron text-white rounded-full font-semibold text-sm"
            >
              🤖 WRO Future Innovators 2026
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="px-6 py-3 bg-earth-brown text-white rounded-full font-semibold text-sm"
            >
              📍 Mumbai, India
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
