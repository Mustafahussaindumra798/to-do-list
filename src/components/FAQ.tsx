import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "Do you offer personal training?",
    answer: "Yes, we offer hands-on, experienced coaching and guidance from our expert owner to ensure you maintain perfect form and achieve consistent progress.",
  },
  {
    question: "Are the Ladies-Only sessions completely private?",
    answer: "Absolutely. From 10:00 AM to 4:00 PM daily, the gym floor is dedicated exclusively to women, providing a safe, respectful, and comfortable environment for female members.",
  },
  {
    question: "Is the admission fee required for all plans?",
    answer: "Yes, there is a one-time admission fee of Rs. 1,000 when you first join. It is non-refundable and non-transferable, ensuring your active membership profile in our system.",
  },
  {
    question: "What kind of equipment is available on the floor?",
    answer: "We have a comprehensive strength training floor equipped with premium squat racks, barbells, free weights, and plate-loaded machines, alongside a dedicated cardio section featuring treadmills and ellipticals.",
  },
]

function AccordionItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-border-color last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className={cn(
          "text-lg font-bold transition-colors duration-200",
          isOpen ? "text-brand-red" : "text-text-primary group-hover:text-brand-red"
        )}>
          {question}
        </span>
        <div className={cn(
          "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ml-4",
          isOpen ? "border-brand-red bg-brand-red text-white rotate-180" : "border-border-color text-text-secondary bg-bg-secondary group-hover:border-brand-red group-hover:text-brand-red"
        )}>
          <ChevronDown size={18} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-text-secondary text-lg leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-bg-secondary relative border-t border-border-color">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-red font-bold tracking-wider uppercase text-sm mb-3"
          >
            Got Questions?
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading text-text-primary uppercase tracking-tight"
          >
            Frequently Asked <span className="text-brand-red">Questions</span>
          </motion.h3>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-bg-primary border border-border-color rounded-2xl shadow-sm px-6 sm:px-10"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
