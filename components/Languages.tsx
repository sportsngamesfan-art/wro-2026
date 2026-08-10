'use client'

import { motion } from 'framer-motion'
import { Badge } from './Badge'

interface Language {
  name: string
  script: string
  nativeName: string
  status: 'current' | 'future'
}

const languages: Language[] = [
  { name: 'Sanskrit', script: 'संस्कृत', nativeName: 'Sanskrit', status: 'current' },
  { name: 'Tamil', script: 'தமிழ்', nativeName: 'Tamil', status: 'current' },
  { name: 'Marathi', script: 'मराठी', nativeName: 'Marathi', status: 'current' },
  { name: 'Odia', script: 'ଓଡିଆ', nativeName: 'Odia', status: 'current' },
  { name: 'Warli', script: 'Warli', nativeName: 'Warli', status: 'future' },
  { name: 'Kashmiri', script: 'کشمیری', nativeName: 'Kashmiri', status: 'future' },
]

export default function Languages() {
  const currentLanguages = languages.filter((l) => l.status === 'current')
  const futureLanguages = languages.filter((l) => l.status === 'future')

  return (
    <section
      id="languages"
      className="py-20 md:py-32 bg-gradient-to-br from-ivory via-cream to-white"
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
              Languages
            </h2>
            <p className="text-lg md:text-xl text-navy-700 max-w-3xl mx-auto">
              Starting with critically endangered languages, with plans to expand globally.
            </p>
          </div>

          {/* Currently Supported */}
          <div>
            <div className="mb-12">
              <Badge label="Currently Supported" />
              <p className="text-navy-900 font-semibold mt-4">
                These languages are being actively preserved through BhashaSetu.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {currentLanguages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gradient-to-br from-saffron/10 to-gold/10 border border-saffron/20 rounded-xl hover:shadow-soft transition-all"
                >
                  <div className="text-2xl md:text-3xl font-bold text-saffron mb-3">
                    {lang.script}
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">{lang.name}</h3>
                  <p className="text-sm text-navy-700">{lang.nativeName}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Future / Expansion */}
          <div className="border-t border-navy-900/10 pt-16">
            <div className="mb-12">
              <Badge label="Future Expansion" variant="secondary" />
              <p className="text-navy-900 font-semibold mt-4">
                Languages we plan to support as the project expands.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {futureLanguages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white border border-navy-900/10 rounded-xl opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="text-2xl md:text-3xl font-bold text-navy-700 mb-3">
                    {lang.script}
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">{lang.name}</h3>
                  <p className="text-sm text-navy-700">{lang.nativeName}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="p-6 bg-blue-50 border border-blue-100 rounded-lg"
          >
            <p className="text-sm text-navy-900">
              <span className="font-semibold">Note:</span> Language support depends on availability of trained speech recognition models, translation engines, and community partnerships. We are committed to expanding to more languages as technology and partnerships evolve.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
