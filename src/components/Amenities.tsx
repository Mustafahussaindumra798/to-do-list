import { motion } from "framer-motion"
import { Bath, CreditCard, CarFront } from "lucide-react"

const amenities = [
  { icon: Bath, label: "Restroom Available" },
  { icon: CreditCard, label: "Debit & Credit Cards" },
  { icon: CarFront, label: "Free Parking Lot" },
]

export function Amenities() {
  return (
    <section className="py-12 bg-bg-secondary border-t border-border-color">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {amenities.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 bg-bg-primary border border-border-color px-6 py-3 rounded-full shadow-sm hover:border-brand-red/50 hover:shadow-md transition-all group"
              >
                <Icon size={20} className="text-text-secondary group-hover:text-brand-red transition-colors" />
                <span className="font-medium text-text-primary text-sm">{item.label}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
