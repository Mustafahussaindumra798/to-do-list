import { motion } from "framer-motion"
import { Check, PhoneCall } from "lucide-react"

const plans = [
  {
    name: "Strength Training",
    highlight: false,
    pricing: [
      { duration: "1 Month", price: "Rs. 2,500" },
      { duration: "3 Months", price: "Rs. 6,000" },
      { duration: "6 Months", price: "Rs. 9,000" },
      { duration: "1 Year", price: "Rs. 15,000" },
    ],
    features: ["Access to weight-training floor", "Free weights & machines", "Locker room access"],
  },
  {
    name: "Strength + Cardio",
    highlight: true,
    badge: "Most Popular",
    pricing: [
      { duration: "1 Month", price: "Rs. 4,500" },
      { duration: "3 Months", price: "Rs. 9,500" },
      { duration: "6 Months", price: "Rs. 16,000" },
      { duration: "1 Year", price: "Rs. 27,000" },
    ],
    features: ["Everything in Strength", "Full cardio area access", "Treadmills & ellipticals", "Priority guidance"],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Decorative BG element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-red font-bold tracking-wider uppercase text-sm mb-3"
          >
            Memberships
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading text-text-primary uppercase tracking-tight"
          >
            Invest In <span className="text-brand-red">Yourself</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 ${
                plan.highlight
                  ? "bg-bg-primary border-2 border-brand-red shadow-[0_0_40px_rgba(255,59,48,0.15)] md:-mt-4 md:mb-4 scale-100 md:scale-105 z-10"
                  : "bg-bg-primary border border-border-color shadow-lg"
              }`}
            >
              {plan.highlight && (
                <div className="bg-brand-red text-white text-center py-2 text-sm font-bold tracking-widest uppercase">
                  {plan.badge}
                </div>
              )}
              
              <div className="p-8 flex-grow flex flex-col">
                <h4 className="text-3xl font-heading uppercase text-text-primary mb-8 text-center">{plan.name}</h4>
                
                <div className="space-y-4 mb-8">
                  {plan.pricing.map((tier, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-border-color pb-3 last:border-0 last:pb-0">
                      <span className="text-text-secondary font-medium">{tier.duration}</span>
                      <span className="text-xl font-bold text-text-primary">{tier.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-8 flex-grow">
                  <p className="text-sm text-text-secondary font-medium mb-4 uppercase tracking-wider">Includes:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={18} className="text-brand-red shrink-0 mt-0.5" />
                        <span className="text-text-primary text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="tel:03365024131"
                  className={`flex items-center justify-center gap-2 w-full py-4 rounded-full font-bold text-lg transition-all ${
                    plan.highlight
                      ? "bg-brand-red text-white hover:bg-brand-red/90 hover:shadow-[0_0_15px_rgba(255,59,48,0.4)] hover:scale-[1.02]"
                      : "bg-bg-secondary border border-border-color text-text-primary hover:border-brand-red hover:text-brand-red"
                  }`}
                >
                  <PhoneCall size={20} />
                  Join Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-text-secondary italic">
            * Admission Fee: <strong className="text-text-primary font-semibold">Rs. 1,000</strong> (one-time, non-refundable and non-transferable)
          </p>
        </motion.div>
      </div>
    </section>
  )
}
