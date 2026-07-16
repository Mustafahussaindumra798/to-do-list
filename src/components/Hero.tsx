import { motion } from "framer-motion"
import { Star, MessageCircle, ArrowDown } from "lucide-react"
import { LazyImage } from "./LazyImage"

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center pt-20 overflow-hidden">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <LazyImage
          src="/images/hero_background.png"
          alt="Vital Fitness Gym Floor"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark to Red Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent"></div>
        <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply"></div>
        
        {/* Animated Heartbeat SVG Background Accent */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
           <svg className="w-[120%] h-auto max-h-full text-brand-red animate-pulse" viewBox="0 0 100 20" preserveAspectRatio="none">
             <polyline points="0,10 30,10 35,2 40,18 45,10 100,10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
           </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center mt-12 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-1.5 bg-bg-secondary/80 backdrop-blur border border-border-color px-4 py-1.5 rounded-full mb-8 shadow-lg"
        >
          <div className="flex text-brand-amber">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-text-primary ml-1">5.0 Rating</span>
          <span className="text-xs text-text-secondary mx-1">•</span>
          <span className="text-xs font-semibold text-text-primary">100+ Reviews</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading text-white uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl"
        >
          Train Hard. <br className="md:hidden" />
          <span className="text-brand-red">Get Vital.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium mb-10 drop-shadow-md"
        >
          Islamabad's premium strength and cardio training facility. 
          Built for serious results, with a dedicated Ladies-Only training window.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="https://wa.me/923365024131"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-brand-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-red/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,59,48,0.4)] transition-all"
          >
            <MessageCircle size={20} />
            WhatsApp / Call Now
          </a>
          <a
            href="#pricing"
            className="flex items-center justify-center gap-2 bg-bg-secondary/20 hover:bg-bg-secondary/40 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all"
          >
            View Pricing
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Stats Strip */}
      <div className="mt-auto relative z-10 bg-bg-primary/95 border-t border-border-color backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-border-color text-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="flex flex-col items-center pt-4 md:pt-0"
            >
              <span className="text-3xl md:text-4xl font-heading text-brand-red mb-1">5.0★</span>
              <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Google Rating</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="flex flex-col items-center pt-4 md:pt-0"
            >
              <span className="text-3xl md:text-4xl font-heading text-text-primary mb-1">100+</span>
              <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Happy Members</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
              className="flex flex-col items-center pt-4 md:pt-0"
            >
              <span className="text-3xl md:text-4xl font-heading text-text-primary mb-1">6<span className="text-xl">AM</span> - 12<span className="text-xl">AM</span></span>
              <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Mon - Sat</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
