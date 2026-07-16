import { motion } from "framer-motion"
import { MapPin, Phone, MessageCircle, Clock, Navigation } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-bg-primary overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-red font-bold tracking-wider uppercase text-sm mb-3"
          >
            Visit Us
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading text-text-primary uppercase tracking-tight"
          >
            Find Your <span className="text-brand-red">Strength</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-bg-secondary border border-border-color p-8 rounded-2xl shadow-sm">
              <h4 className="text-2xl font-heading uppercase text-text-primary mb-6">Get In Touch</h4>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-bg-primary border border-border-color rounded-full flex items-center justify-center text-brand-red shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-text-primary mb-1">Location</h5>
                    <p className="text-text-secondary leading-relaxed">
                      Lehtrar Road, Punjgran Stop,<br />
                      Punjgran, Islamabad, 64000,<br />
                      Pakistan
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-bg-primary border border-border-color rounded-full flex items-center justify-center text-brand-red shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-text-primary mb-1">Phone / WhatsApp</h5>
                    <p className="text-text-secondary">0336-5024131</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-bg-primary border border-border-color rounded-full flex items-center justify-center text-brand-red shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-text-primary mb-1">Hours</h5>
                    <p className="text-text-secondary">Mon-Sat: 6:00 AM – 12:00 AM<br/>Sun: Closed</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="tel:03365024131"
                  className="flex items-center justify-center gap-2 bg-bg-primary border border-border-color text-text-primary hover:border-brand-red hover:text-brand-red py-3 rounded-full font-bold transition-colors"
                >
                  <Phone size={18} />
                  Call Now
                </a>
                <a
                  href="https://wa.me/923365024131"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a] py-3 rounded-full font-bold transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full min-h-[400px] bg-bg-secondary border border-border-color rounded-2xl overflow-hidden relative group"
          >
            {/* Embedded Google Map Placeholder - using an iframe for the real map */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.9868770285994!2d73.2081734!3d33.6834161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa3b4e4e9f781%3A0xc68297b6697086ba!2sPunjgran%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1716124581787!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(0.5) contrast(1.2)" }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Vital Fitness Gym Location Map"
              className="absolute inset-0 transition-all duration-500 group-hover:filter-none"
            ></iframe>

            <div className="absolute bottom-6 left-6 right-6">
              <a
                href="https://maps.google.com/?q=Vital+Fitness+Gym+Punjgran+Islamabad"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-red text-white py-3 rounded-xl font-bold shadow-lg hover:bg-brand-red/90 transition-colors w-full sm:w-auto sm:px-6"
              >
                <Navigation size={18} />
                Get Directions
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
