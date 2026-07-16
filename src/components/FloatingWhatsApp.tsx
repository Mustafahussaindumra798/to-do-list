import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function FloatingWhatsApp() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      href="https://wa.me/923365024131"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-bg-secondary border border-border-color text-text-primary px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
        Chat with us
      </span>
      
      {/* Ping effect */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></span>
    </motion.a>
  )
}
