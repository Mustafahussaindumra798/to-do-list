

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-primary pt-16 pb-8 border-t border-border-color">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <svg
                className="w-8 h-8 text-brand-red"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22a8 8 0 0 0 8-8c0-3.5-2.5-6.5-6-7.5V4a2 2 0 0 0-4 0v2.5C6.5 7.5 4 10.5 4 14a8 8 0 0 0 8 8z" fill="currentColor" fillOpacity="0.1" />
                <path d="M8 6h8" />
                <path d="M7 15h2l2-4 3 8 2-4h1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="font-heading text-2xl tracking-wide uppercase text-text-primary">
                Vital Fitness <span className="text-brand-red">Gym</span>
              </span>
            </a>
            <p className="text-text-secondary mb-6 max-w-sm">
              The ultimate strength and cardio training facility in Islamabad. Rated 5.0★ by 100+ serious lifters.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-bg-secondary border border-border-color flex items-center justify-center text-text-secondary hover:text-brand-red hover:border-brand-red transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-bg-secondary border border-border-color flex items-center justify-center text-text-secondary hover:text-brand-red hover:border-brand-red transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-text-primary uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-text-secondary hover:text-brand-red transition-colors">About Us</a></li>
              <li><a href="#programs" className="text-text-secondary hover:text-brand-red transition-colors">Programs</a></li>
              <li><a href="#timings" className="text-text-secondary hover:text-brand-red transition-colors">Timings</a></li>
              <li><a href="#pricing" className="text-text-secondary hover:text-brand-red transition-colors">Pricing</a></li>
              <li><a href="#reviews" className="text-text-secondary hover:text-brand-red transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-text-primary uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-3 text-text-secondary">
              <li>Lehtrar Road, Punjgran Stop</li>
              <li>Islamabad, 64000, Pakistan</li>
              <li className="pt-2">
                <a href="tel:03365024131" className="text-brand-red font-bold hover:underline">0336-5024131</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-color pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm">
            &copy; {currentYear} Vital Fitness Gym. All rights reserved.
          </p>
          <p className="text-text-secondary text-xs italic">
            * Admission fee non-refundable and non-transferable.
          </p>
        </div>
      </div>
    </footer>
  )
}
