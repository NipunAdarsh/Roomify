import React from 'react';
import { Link } from 'react-router-dom';

export const SignUp: React.FC = () => {
  return (
    <div className="font-body bg-background min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Layer (Layer 0) */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Cinematic wide shot of a misty emerald green forest" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHNcswclY1H1y9IuhHvhGvKhE1YUAxaOZwxgfVDSFOIlCndfc_fMmbS5_8y4iIzTmQywGRwA-OAQDIqF24REIUCJyRH92Id3iCm9rlebg_FZYppPwb1XOVvPvX25vbCmG91woGYxxEmLHJQc9A3lr4Dc78PODGnyp2Elh5L9Cj2ha12OqtKAth8aQfRiF9KeC9MAk9NouiaNe3XbiKGketCAQQ_X-JkXiNpt_csQwAjVMWYw5D11Rju3_xlhoWXv6RNMbgkcuWiGw"
        />
        <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75"></div>
      </div>

      {/* Top Navigation (Shell suppressed based on transactional rule, only showing Brand Anchor) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-surface-container-lowest">spa</span>
          <span className="font-headline font-bold text-lg tracking-tight text-surface-container-lowest">The Organic Concierge</span>
        </div>
      </nav>

      {/* Main Content Canvas (Layer 1 & 2) */}
      <main className="relative z-10 w-full max-w-[1200px] px-4 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
        
        {/* Hero Text Block (Asymmetric Layout) */}
        <div className="hidden md:flex flex-col max-w-md text-white">
          <h1 className="font-headline text-5xl font-extrabold leading-[1.1] mb-6">
            Join the Ecosystem
          </h1>
          <p className="font-body text-lg opacity-90 leading-relaxed">
            Experience the pinnacle of organic management. Start your journey with The Living Canvas and redefine luxury hospitality.
          </p>
        </div>

        {/* Sign Up Container (Layer 3) */}
        <section className="glass-panel w-full max-w-md p-10 lg:p-12 rounded-lg shadow-2xl">
          <div className="md:hidden text-center mb-8">
            <h1 className="font-headline text-3xl font-bold text-primary mb-2">Join the Ecosystem</h1>
            <p className="text-on-surface-variant">Start your journey with The Living Canvas.</p>
          </div>
          <header className="hidden md:block mb-8">
            <h2 className="font-headline text-2xl font-bold text-primary">Create Account</h2>
            <p className="text-on-surface-variant font-medium mt-1">Start your journey with The Living Canvas.</p>
          </header>

          <form className="space-y-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 transition-colors group-focus-within:text-secondary">person</span>
                <input 
                  className="w-full bg-surface-container-highest/50 border-none rounded-DEFAULT py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-secondary/20 focus:bg-surface-container-lowest transition-all outline-none" 
                  placeholder="Julian Thorne" 
                  type="text"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 transition-colors group-focus-within:text-secondary">mail</span>
                <input 
                  className="w-full bg-surface-container-highest/50 border-none rounded-DEFAULT py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-secondary/20 focus:bg-surface-container-lowest transition-all outline-none" 
                  placeholder="julian@concierge.com" 
                  type="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Password</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 transition-colors group-focus-within:text-secondary">lock</span>
                <input 
                  className="w-full bg-surface-container-highest/50 border-none rounded-DEFAULT py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-secondary/20 focus:bg-surface-container-lowest transition-all outline-none" 
                  placeholder="••••••••" 
                  type="password"
                />
              </div>
            </div>

            {/* Primary Action */}
            <button 
              className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold py-5 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all" 
              type="submit"
            >
              Create Account
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

            {/* Secondary Action */}
            <p className="text-center text-sm font-medium text-on-surface-variant">
              Already have an account? 
              <Link to="/login" className="text-secondary font-bold hover:underline underline-offset-4 ml-1">
                Log In
              </Link>
            </p>
          </form>

          {/* Recessed Info Block */}
          <div className="mt-10 pt-8 border-t border-outline-variant/15 flex justify-between items-center px-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary/60 uppercase tracking-tighter">
              <span className="material-symbols-outlined !text-sm">verified_user</span>
              Secure Access
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary/60 uppercase tracking-tighter">
              <span className="material-symbols-outlined !text-sm">public</span>
              Global Concierge
            </div>
          </div>

        </section>
      </main>

      {/* Footer (Shared Component Logic) */}
      <footer className="fixed bottom-0 w-full pb-8 flex flex-col items-center justify-center gap-4 px-8 text-center z-20">
        <div className="flex gap-6 text-[10px] font-medium uppercase tracking-widest text-surface-container-lowest/70">
          <a href="#" className="hover:text-surface-container-lowest transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-surface-container-lowest transition-colors">Terms of Service</a>
        </div>
        <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-surface-container-lowest/50">
          © 2024 The Organic Concierge. Grow Smart. Trade Fresh.
        </p>
      </footer>
    </div>
  );
};
