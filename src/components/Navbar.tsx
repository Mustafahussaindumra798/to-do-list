import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Moon, Sun, Menu, X, PhoneCall } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Programs", href: "#programs" },
  { name: "Timings", href: "#timings" },
  { name: "Pricing", href: "#pricing" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { theme, setTheme } = useTheme()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-bg-primary/80 backdrop-blur-md py-3 border-border-color shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <svg
            className="w-8 h-8 text-brand-red group-hover:scale-110 transition-transform"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Kettlebell shape */}
            <path d="M12 22a8 8 0 0 0 8-8c0-3.5-2.5-6.5-6-7.5V4a2 2 0 0 0-4 0v2.5C6.5 7.5 4 10.5 4 14a8 8 0 0 0 8 8z" fill="currentColor" fillOpacity="0.1" />
            <path d="M8 6h8" />
            {/* Heartbeat pulse inside */}
            <path d="M7 15h2l2-4 3 8 2-4h1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="font-heading text-2xl tracking-wide uppercase">
            Vital Fitness <span className="text-brand-red">Gym</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-text-secondary hover:text-brand-red transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full rounded-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-l border-border-color pl-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-bg-secondary transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <a
              href="tel:03365024131"
              className="flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-brand-red/90 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,59,48,0.5)] transition-all"
            >
              <PhoneCall size={16} />
              Join Now
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-bg-secondary transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-text-primary p-1"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-bg-primary border-b border-border-color overflow-hidden"
        >
          <div className="px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-text-primary hover:text-brand-red transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:03365024131"
              className="mt-4 flex items-center justify-center gap-2 bg-brand-red text-white w-full py-3 rounded-full font-semibold text-lg hover:bg-brand-red/90 transition-colors"
            >
              <PhoneCall size={20} />
              Join Now
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
