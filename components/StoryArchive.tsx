'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function StoryArchive() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.3 })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="story-archive"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-navy-50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 mb-6">
              The <span className="text-saffron-600">Story Archive</span>
            </h2>
            <p className="text-lg text-navy-700 max-w-3xl mx-auto">
              BhashaSetu doesn't just translate. It preserves. Every recording is more than text—it's a
              complete record of voice, language, culture, and time.
            </p>
          </motion.div>

          {/* Story Archive Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-navy-100"
            whileHover={{ scale: 1.02 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy-900 to-navy-800 px-8 py-6 text-white">
              <h3 className="text-xl font-bold">STORY ARCHIVE</h3>
              <p className="text-sm text-navy-200 mt-1">Sample preserved story record</p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Column */}
              <div className="p-8 border-b md:border-b-0 md:border-r border-navy-100 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-saffron-600 uppercase tracking-wide mb-2">
                    Speaker Information
                  </p>
                  <p className="text-2xl font-bold text-navy-900">Community Elder</p>
                  <p className="text-sm text-navy-600 mt-1">Age: [Data]</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-saffron-600 uppercase tracking-wide mb-2">
                    Language
                  </p>
                  <p className="text-2xl font-bold text-navy-900">Sanskrit</p>
                  <p className="text-sm text-navy-600 mt-1">Native script: Devanagari</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-saffron-600 uppercase tracking-wide mb-2">
                    Date Recorded
                  </p>
                  <p className="text-lg font-semibold text-navy-900">[Date]</p>
                  <p className="text-sm text-navy-600 mt-1">Duration: [Length]</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-saffron-600 uppercase tracking-wide mb-2">
                    Preserved Elements
                  </p>
                  <div className="space-y-2">
                    {['✓ Original Audio', '✓ Original Transcription', '✓ Translations', '✓ Metadata'].map(
                      (item) => (
                        <p key={item} className="text-navy-700 font-medium">
                          {item}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="p-8 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-saffron-600 uppercase tracking-wide mb-2">
                    Original Audio
                  </p>
                  <div className="bg-navy-50 rounded-lg p-4 flex items-center gap-3">
                    <button className="flex-shrink-0 w-10 h-10 bg-saffron-500 hover:bg-saffron-600 text-white rounded-full flex items-center justify-center transition-colors">
                      ▶
                    </button>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-navy-900">Voice Recording</p>
                      <p className="text-xs text-navy-600">[Duration] min</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-saffron-600 uppercase tracking-wide mb-2">
                    Original Transcription
                  </p>
                  <p className="text-sm text-navy-700 leading-relaxed italic font-medium">
                    "[Original text in native language]"
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-saffron-600 uppercase tracking-wide mb-2">
                    Translation (English)
                  </p>
                  <p className="text-sm text-navy-700 leading-relaxed">
                    "[English translation of the story]"
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-saffron-600 uppercase tracking-wide mb-2">
                    Available Translations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['English', 'Hindi', 'Marathi'].map((lang) => (
                      <span key={lang} className="px-3 py-1 bg-saffron-100 text-saffron-700 text-xs font-semibold rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What Makes This Important */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-8 border border-navy-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🔊</div>
              <h3 className="font-bold text-navy-900 mb-2">Voice Preserved</h3>
              <p className="text-sm text-navy-700">
                The original audio is never lost. Future generations can hear the actual voice of their ancestors.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-navy-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-navy-900 mb-2">Language Documented</h3>
              <p className="text-sm text-navy-700">
                Transcriptions in the native language create linguistic records for researchers and linguists.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-navy-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-bold text-navy-900 mb-2">Knowledge Shared</h3>
              <p className="text-sm text-navy-700">
                Translations make the story accessible to communities worldwide, breaking language barriers.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
