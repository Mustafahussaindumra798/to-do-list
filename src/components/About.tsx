import { motion } from "framer-motion"
import { LazyImage } from "./LazyImage"

export function About() {
  return (
    <section id="about" className="py-24 bg-bg-primary overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
              <div className="absolute inset-0 bg-brand-red/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply"></div>
              <LazyImage 
                src="/images/about_gym_interior.png" 
                alt="Vital Fitness Gym Interior" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-bg-secondary rounded-2xl border border-border-color shadow-lg -z-10 hidden md:block"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-red/10 rounded-full blur-2xl -z-10 hidden md:block"></div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <h2 className="text-brand-red font-bold tracking-wider uppercase text-sm mb-3">About Us</h2>
            <h3 className="text-4xl md:text-5xl font-heading text-text-primary mb-6 leading-tight">
              A Serious Environment <br />
              For <span className="text-brand-red">Real Results</span>
            </h3>
            
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              Vital Fitness Gym is a premium strength-and-cardio training facility located on Lehtrar Road, Punjgran, Islamabad. We are known for our impeccably clean, well-equipped training floor and highly experienced guidance. 
            </p>
            <p className="text-lg text-text-secondary leading-relaxed mb-10">
              With a dedicated <strong className="text-brand-amber font-semibold">Ladies-Only training window</strong>, we provide a safe, respectful, and highly motivating environment for both men and women to achieve their fitness goals under one roof.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-16 h-1 bg-brand-red rounded-full"></div>
              <span className="font-heading text-xl tracking-wider text-text-primary uppercase">Welcome to the Club</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
