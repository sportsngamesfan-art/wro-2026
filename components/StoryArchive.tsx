'use client'

import { motion } from 'framer-motion'
import { Play, Check } from 'lucide-react'

export default function StoryArchive() {
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
          <div className="space-y-6 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              The Story Archive
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              BhashaSetu preserves more than translated text. Every story is preserved in its entirety.
            </p>
          </div>

          {/* Archive Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm space-y-8">
              {/* Header */}
              <div className="text-center pb-8 border-b border-white/10">
                <h3 className="text-2xl md:text-3xl font-bold">Sample Story Archive</h3>
                <p className="text-gray-400 text-sm mt-2">Placeholder data - will be populated with real stories</p>
              </div>

              {/* Archive Content */}
              <div className="space-y-6">
                {/* Speaker */}
                <div>
                  <p className="text-sm uppercase tracking-widest text-saffron/80 mb-2">
                    Speaker
                  </p>
                  <p className="text-lg">Community Elder</p>
                </div>

                {/* Language */}
                <div>
                  <p className="text-sm uppercase tracking-widest text-saffron/80 mb-2">
                    Language
                  </p>
                  <p className="text-lg">[Language Name]</p>
                </div>

                {/* Original Voice */}
                <div>
                  <p className="text-sm uppercase tracking-widest text-saffron/80 mb-2">
                    Original Voice
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-saffron/20 border border-saffron/40 rounded-lg hover:bg-saffron/30 transition-all">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Play Recording</span>
                    </button>
                    <span className="text-sm text-gray-400">[Duration: 2:34]</span>
                  </div>
                </div>

                {/* Transcription */}
                <div>
                  <p className="text-sm uppercase tracking-widest text-saffron/80 mb-2">
                    Transcription
                  </p>
                  <p className="text-gray-300 leading-relaxed italic">
                    [Original text in native language...]
                  </p>
                </div>

                {/* Translation */}
                <div>
                  <p className="text-sm uppercase tracking-widest text-saffron/80 mb-2">
                    Translation
                  </p>
                  <p className="text-gray-300 leading-relaxed italic">
                    [Translated text in selected language...]
                  </p>
                </div>

                {/* Preservation Status */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-sm uppercase tracking-widest text-saffron/80 mb-4">
                    Preserved
                  </p>
                  <div className="space-y-3">
                    {['Audio', 'Text', 'Translation'].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-saffron" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Insight */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Each story is a complete record—preserving not just the translation, but the original voice, the rhythm of speech, the emotions in the tone. <span className="text-saffron font-semibold">The authentic human experience remains intact.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
