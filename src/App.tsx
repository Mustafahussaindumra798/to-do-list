import { ThemeProvider } from "./components/ThemeProvider"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { Programs } from "./components/Programs"
import { Timings } from "./components/Timings"
import { Pricing } from "./components/Pricing"
import { Reviews } from "./components/Reviews"
import { Amenities } from "./components/Amenities"
import { FAQ } from "./components/FAQ"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { FloatingWhatsApp } from "./components/FloatingWhatsApp"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vital-fitness-theme">
      <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-brand-red/30 selection:text-brand-red">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Programs />
          <Timings />
          <Pricing />
          <Reviews />
          <Amenities />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </ThemeProvider>
  )
}

export default App
