'use client'

import { motion } from 'framer-motion'

const hardware = [
  'Raspberry Pi 5 (8GB)',
  'Microphone (Audio Capture)',
  'Camera (Vision Module)',
  'Speaker (Audio Output)',
  'Touchscreen Display',
  'Ultrasonic Sensors (Navigation)',
  'ToF Sensor (Distance Detection)',
  'IMU Sensor (Motion Tracking)',
]

const software = [
  'Speech Recognition (ASR)',
  'Language Processing',
  'Translation Engine',
  'Text-to-Speech (TTS)',
  'Audio Storage & Archival',
  'Story Database & Management',
  'Voice Activity Detection (VAD)',
  'Python 3.11 Base System',
]

export default function Technology() {
  return (
    <section
      id="technology"
      className="py-20 md:py-32 bg-navy-900 text-white"
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Technology Stack
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Built on proven, accessible, and open-source technologies.
            </p>
          </div>

          {/* Two Column Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Hardware */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold mb-2">Hardware</h3>
                <div className="h-1 w-20 gradient-saffron rounded-full" />
              </div>

              <div className="space-y-4">
                {hardware.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <div className="text-saffron text-xl mt-1">→</div>
                    <span className="leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Software */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold mb-2">Software & AI</h3>
                <div className="h-1 w-20 gradient-saffron rounded-full" />
              </div>

              <div className="space-y-4">
                {software.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <div className="text-saffron text-xl mt-1">→</div>
                    <span className="leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 bg-gradient-to-br from-saffron/10 to-gold/10 border border-saffron/20 rounded-2xl text-center"
          >
            <p className="text-lg md:text-xl leading-relaxed">
              We chose technologies that are <span className="text-saffron font-semibold">accessible, scalable, and open</span>—ensuring that language preservation remains available to communities everywhere, not locked behind expensive proprietary systems.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
