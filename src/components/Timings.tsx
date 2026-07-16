import { motion } from "framer-motion"
import { Clock, Calendar, Moon } from "lucide-react"

export function Timings() {
  const schedule = [
    {
      slot: "Co-ed Training (Morning)",
      time: "6:00 AM – 10:00 AM",
      type: "coed",
    },
    {
      slot: "Ladies Only",
      time: "10:00 AM – 4:00 PM",
      type: "ladies",
      highlight: true,
    },
    {
      slot: "Co-ed Training (Evening)",
      time: "4:00 PM – 12:00 AM",
      type: "coed",
    },
    {
      slot: "Ramazan Special",
      time: "After Iftar till 1:00 AM",
      type: "special",
    },
  ]

  return (
    <section id="timings" className="py-24 bg-bg-primary border-t border-border-color">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-red font-bold tracking-wider uppercase text-sm mb-3"
          >
            Operating Hours
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading text-text-primary uppercase tracking-tight"
          >
            Train On <span className="text-brand-red">Your Time</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Schedule */}
          <div className="lg:col-span-2 space-y-4">
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border overflow-hidden transition-transform hover:-translate-y-1 ${
                  item.highlight 
                    ? "bg-brand-amber/10 border-brand-amber shadow-[0_0_20px_rgba(242,194,48,0.15)]" 
                    : "bg-bg-secondary border-border-color"
                }`}
              >
                {/* Decorative background glow for highlight */}
                {item.highlight && (
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-amber/20 blur-3xl rounded-full pointer-events-none"></div>
                )}
                
                <div className="flex items-center gap-4 mb-4 sm:mb-0 relative z-10">
                  <div className={`p-3 rounded-full ${item.highlight ? "bg-brand-amber text-bg-primary" : "bg-bg-primary text-text-primary"}`}>
                    {item.type === "special" ? <Moon size={24} /> : <Clock size={24} />}
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${item.highlight ? "text-brand-amber" : "text-text-primary"}`}>
                      {item.slot}
                    </h4>
                    {item.highlight && (
                      <span className="inline-block mt-1 text-xs font-bold uppercase tracking-wider text-text-primary bg-brand-amber/20 px-2 py-0.5 rounded border border-brand-amber/30">
                        Safe & Private
                      </span>
                    )}
                  </div>
                </div>
                
                <div className={`text-lg font-mono font-semibold relative z-10 ${item.highlight ? "text-text-primary" : "text-text-secondary"}`}>
                  {item.time}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Days Open Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-bg-secondary border border-border-color rounded-2xl p-8 flex flex-col justify-center h-full"
          >
            <div className="w-16 h-16 bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center mb-6">
              <Calendar size={32} />
            </div>
            <h4 className="text-2xl font-heading uppercase text-text-primary mb-6">Days Open</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-border-color pb-4">
                <span className="text-text-secondary font-medium">Monday – Saturday</span>
                <span className="text-text-primary font-bold">Open</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-text-secondary font-medium">Sunday</span>
                <span className="text-brand-red font-bold uppercase tracking-wider text-sm bg-brand-red/10 px-3 py-1 rounded-full">Closed</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
