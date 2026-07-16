import { motion } from "framer-motion"
import { Star, ExternalLink, Quote } from "lucide-react"

const reviews = [
  {
    name: "Owais Kiaiani",
    time: "4 months ago",
    text: "Best GYM ever. Neat and clean gym and owner is very polite and a good guider.",
  },
  {
    name: "Samia Manzoor",
    time: "4 months ago",
    text: "The equipment is top-tier and the vibe inside the gym is motivating. Highly recommend for anyone serious about results.",
  },
  {
    name: "Muhammad Shams Ul Haq",
    time: "3 months ago",
    badge: "Local Guide",
    text: "A new gym has opened. Their equipment is good and the trainers are also good.",
  },
  {
    name: "Farzana Shaheen",
    time: "4 months ago",
    text: "Fantastic gym. Highly experienced and very polite owner. Neat and clean, safe environment for not only males but also for females under one roof. Highly recommended.",
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-bg-primary overflow-hidden border-t border-border-color">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-red font-bold tracking-wider uppercase text-sm mb-3"
            >
              Testimonials
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-heading text-text-primary uppercase tracking-tight mb-6"
            >
              Word On The <span className="text-brand-red">Street</span>
            </motion.h3>
            
            {/* Google Rating Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 bg-bg-secondary border border-border-color p-4 rounded-xl inline-flex shadow-sm"
            >
              <div className="flex flex-col items-center justify-center bg-bg-primary w-14 h-14 rounded-lg border border-border-color">
                <span className="text-xl font-bold text-text-primary">5.0</span>
              </div>
              <div>
                <div className="flex text-brand-amber mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary font-medium">
                  Rated <strong className="text-text-primary">5.0</strong> by <strong className="text-text-primary">100+</strong> members on Google
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <a 
              href="https://www.google.com/search?q=Vital+Fitness+Gym+Islamabad" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-brand-red font-semibold hover:text-brand-red/80 transition-colors"
            >
              See all reviews on Google
              <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-bg-secondary border border-border-color p-8 rounded-2xl relative group hover:border-brand-red/30 transition-colors"
            >
              <Quote className="absolute top-6 right-6 text-border-color w-12 h-12 rotate-180 transition-colors group-hover:text-brand-red/10" />
              
              <div className="flex text-brand-amber mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-lg text-text-primary mb-6 leading-relaxed relative z-10">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bg-primary border border-border-color flex items-center justify-center text-text-primary font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-text-primary">{review.name}</h4>
                    {review.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-bg-primary border border-border-color text-text-secondary px-2 py-0.5 rounded">
                        {review.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-text-secondary">{review.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
