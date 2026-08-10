'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Speak',
    description: 'The user speaks naturally in their language.',
  },
  {
    number: '02',
    title: 'Listen',
    description: 'BhashaSetu captures the voice with high-fidelity audio.',
  },
  {
    number: '03',
    title: 'Transcribe',
    description: 'Speech is converted into written text in the original language.',
  },
  {
    number: '04',
    title: 'Translate',
    description: 'The story can be translated into selected languages.',
  },
  {
    number: '05',
    title: 'Preserve',
    description: 'The original audio, transcription and translations are securely stored.',
  },
  {
    number: '06',
    title: 'Share',
    description: 'Preserved knowledge becomes accessible to future generations and researchers.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
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
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-navy-700 max-w-3xl mx-auto">
              A seamless journey from voice to preservation.
            </p>
          </div>

          {/* Timeline */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative p-8 bg-white border border-navy-900/10 rounded-2xl h-full hover:shadow-medium transition-all hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="text-5xl font-bold text-saffron/20 group-hover:text-saffron/40 transition-colors mb-4">
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-navy-700 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connector Line (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-saffron/60 to-transparent" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
