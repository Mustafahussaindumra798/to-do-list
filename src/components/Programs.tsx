import { motion } from "framer-motion"
import { Dumbbell, Activity, ShieldCheck, Users } from "lucide-react"

const programs = [
  {
    title: "Strength Training",
    description: "Full weight-training floor equipped with premium racks, barbells, and machines for serious lifters.",
    icon: Dumbbell,
  },
  {
    title: "Strength + Cardio",
    description: "The ultimate combined training package. Build muscle and improve endurance with top-tier cardio equipment.",
    icon: Activity,
  },
  {
    title: "Ladies-Only Sessions",
    description: "A dedicated women's training window from 10 AM to 4 PM daily, providing a safe, private, and comfortable environment.",
    icon: ShieldCheck,
    highlight: true,
  },
  {
    title: "Personal Guidance",
    description: "Hands-on, experienced coaching from our expert owner to ensure perfect form and consistent progress.",
    icon: Users,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

export function Programs() {
  return (
    <section id="programs" className="py-24 bg-bg-secondary relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-brand-red font-bold tracking-wider uppercase text-sm mb-3">What We Offer</h2>
            <h3 className="text-4xl md:text-5xl font-heading text-text-primary uppercase tracking-tight">
              Built For <span className="text-brand-red">Excellence</span>
            </h3>
            <p className="mt-4 text-lg text-text-secondary">
              We provide the tools, environment, and guidance you need to unlock your ultimate potential.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  program.highlight 
                  ? "bg-bg-primary border-brand-amber shadow-[0_0_15px_rgba(242,194,48,0.1)] hover:shadow-[0_0_25px_rgba(242,194,48,0.2)]" 
                  : "bg-bg-primary border-border-color hover:border-brand-red/50"
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  program.highlight ? "bg-brand-amber/20 text-brand-amber" : "bg-bg-secondary text-brand-red group-hover:bg-brand-red group-hover:text-white"
                }`}>
                  <Icon size={28} strokeWidth={2} />
                </div>
                
                <h4 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-red transition-colors">
                  {program.title}
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {program.description}
                </p>

                {program.highlight && (
                  <div className="absolute top-0 right-8 transform -translate-y-1/2">
                    <span className="bg-brand-amber text-bg-primary text-xs font-bold uppercase py-1 px-3 rounded-full shadow-md">
                      Special Feature
                    </span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
