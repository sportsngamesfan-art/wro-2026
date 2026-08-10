'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Component {
  id: string
  name: string
  description: string
  icon: string
}

const components: Component[] = [
  {
    id: 'microphone',
    name: 'Microphone',
    description: 'Captures spoken stories with high fidelity audio recording.',
    icon: '🎤',
  },
  {
    id: 'camera',
    name: 'Camera',
    description: 'Helps with interaction, context awareness, and documentation.',
    icon: '📷',
  },
  {
    id: 'raspberry-pi',
    name: 'Raspberry Pi 5',
    description: 'The central computing platform running speech processing and translation.',
    icon: '🖥️',
  },
  {
    id: 'speaker',
    name: 'Speaker',
    description: 'Allows BhashaSetu to communicate and play back audio for verification.',
    icon: '🔊',
  },
  {
    id: 'display',
    name: 'Touchscreen Display',
    description: 'Provides intuitive visual feedback and interaction interface.',
    icon: '📱',
  },
  {
    id: 'sensors',
    name: 'Sensors',
    description: 'Navigate intelligently and understand surroundings (ultrasonic, ToF, IMU).',
    icon: '📡',
  },
]

export default function RobotShowcase() {
  const [selectedComponent, setSelectedComponent] = useState<string>('microphone')

  return (
    <section
      id="solution"
      className="py-20 md:py-32 bg-navy-900 text-white overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          <div className="space-y-6 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Meet BhashaSetu
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              A purpose-built robotic platform designed to interact respectfully with people and collect spoken stories in their own languages.
            </p>
            <div className="inline-block px-4 py-2 bg-saffron/20 border border-saffron/40 rounded-lg text-sm font-semibold text-saffron">
              Prototype
            </div>
          </div>

          {/* Main Robot Showcase */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Visual Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-96 md:h-full flex items-center justify-center"
            >
              <div className="absolute w-full h-full bg-gradient-to-br from-saffron/10 to-transparent rounded-3xl" />
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-9xl md:text-[12rem]"
              >
                🤖
              </motion.div>
            </motion.div>

            {/* Components Grid */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {components.map((component) => (
                  <motion.button
                    key={component.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedComponent(component.id)}
                    className={`p-4 rounded-lg transition-all ${
                      selectedComponent === component.id
                        ? 'bg-gradient-saffron text-white'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-2xl mb-2">{component.icon}</div>
                    <p className="text-sm font-semibold">{component.name}</p>
                  </motion.button>
                ))}
              </div>

              {/* Selected Component Details */}
              <motion.div
                key={selectedComponent}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur"
              >
                <p className="text-gray-300 leading-relaxed">
                  {components.find((c) => c.id === selectedComponent)?.description}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
