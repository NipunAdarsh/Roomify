import React, { useState } from 'react';
import { ArrowRight, User, Phone, Mail, Calendar, Home, CheckCircle2 } from 'lucide-react';
import { mockData } from '../data/mockData';

export default function NewBooking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    roomId: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const availableRooms = mockData.rooms.filter(r => r.status === 'AVAILABLE');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mock Check-In Complete:", formData);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in relative overflow-hidden rounded-3xl" style={{ minHeight: '80vh' }}>
        {/* Immersive Background */}
        <div className="absolute inset-0 z-0">
            <img 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2074" 
            alt="Misty Forest" 
            className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 p-12 rounded-3xl bg-surface/60 backdrop-blur-3xl border border-outline-variant/15 shadow-[0_32px_64px_-12px_rgba(0,54,8,0.2)] flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-on-primary-fixed" />
            </div>
            <h2 className="text-display-sm text-on-surface mb-2">Guest Checked In</h2>
            <p className="text-body-lg text-on-surface-variant mb-8">
                {formData.name} is confirmed for {availableRooms.find(r => r.id === formData.roomId)?.name || 'a room'}.
            </p>
            <button 
                onClick={() => { setIsSuccess(false); setStep(1); setFormData({name:'', phone:'', email:'', checkIn:'', checkOut:'', roomId:''}); }}
                className="px-8 py-3 rounded-full bg-secondary text-on-secondary font-semibold hover:bg-secondary-container hover:text-on-secondary-container transition-all"
            >
                Start New Booking
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden rounded-3xl animate-fade-in flex" style={{ minHeight: '80vh' }}>
      {/* Layer 0: Immersive Background Canvas */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2074" 
          alt="Lush Forest" 
          className="w-full h-full object-cover opacity-90"
        />
        {/* Subtle verdant overlay */}
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </div>

      {/* Layer 1: Main Glassmorphic Container (Asymmetric Layout) */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full h-full p-4 lg:p-12 gap-8">
        
        {/* Left Column: Context / Staging */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <div className="bg-surface/40 backdrop-blur-xl p-8 rounded-3xl border border-outline-variant/20 shadow-xl">
              <h1 className="text-display-md text-on-surface mb-4 leading-tight">
                New Guest<br />Arrival
              </h1>
              <p className="text-body-lg text-on-surface-variant">
                Seamlessly check in guests and allocate rooms in a single transaction. Let the ecosystem handle the details.
              </p>

              {/* Progress Indicator */}
              <div className="mt-8 flex items-center gap-4">
                  <div className={`h-2 rounded-full transition-all duration-500 flex-1 ${step >= 1 ? 'bg-primary' : 'bg-surface-variant/50'}`} />
                  <div className={`h-2 rounded-full transition-all duration-500 flex-1 ${step >= 2 ? 'bg-primary' : 'bg-surface-variant/50'}`} />
              </div>
              <p className="mt-2 text-label-sm uppercase tracking-wider text-on-surface font-bold">
                  Step {step} of 2
              </p>
          </div>
        </div>

        {/* Right Column: The Wizard Form */}
        <div className="flex-1 flex flex-col justify-center">
            <div className="bg-surface/70 backdrop-blur-3xl rounded-[32px] p-8 lg:p-10 shadow-[0_32px_64px_-12px_rgba(0,54,8,0.15)] border border-surface-container-lowest/30">
                <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit} className="space-y-6">
                    
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-headline-sm text-primary mb-6">Guest Directory</h3>
                            
                            {/* Inputs - Floating Label Style but simplified for direct implementation */}
                            <div className="space-y-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-on-surface-variant" />
                                    </div>
                                    <input 
                                        required type="text" name="name" value={formData.name} onChange={handleInputChange}
                                        placeholder="Full Name"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-on-surface-variant" />
                                    </div>
                                    <input 
                                        required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                        placeholder="Phone Number"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-on-surface-variant" />
                                    </div>
                                    <input 
                                        required type="email" name="email" value={formData.email} onChange={handleInputChange}
                                        placeholder="Email Address"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full flex items-center justify-between px-8 py-4 bg-primary text-on-primary rounded-full hover:bg-primary-container transition-all group mt-8 shadow-lg shadow-primary/20">
                                <span className="font-semibold tracking-wide">Continue to Stay Details</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-headline-sm text-primary mb-6">Stay Parameters</h3>
                            
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <div className="absolute top-1/2 -translate-y-1/2 left-4 pointer-events-none">
                                            <Calendar className="h-5 w-5 text-on-surface-variant" />
                                        </div>
                                        <input 
                                            required type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                        />
                                        <label className="text-label-sm text-on-surface-variant ml-4 mt-1 block">Check-in</label>
                                    </div>
                                    <div className="relative flex-1">
                                        <div className="absolute top-1/2 -translate-y-1/2 left-4 pointer-events-none">
                                            <Calendar className="h-5 w-5 text-on-surface-variant" />
                                        </div>
                                        <input 
                                            required type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                        />
                                        <label className="text-label-sm text-on-surface-variant ml-4 mt-1 block">Check-out</label>
                                    </div>
                                </div>

                                <div className="relative mt-6">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Home className="h-5 w-5 text-on-surface-variant" />
                                    </div>
                                    <select 
                                        required name="roomId" value={formData.roomId} onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface outline-none transition-all appearance-none"
                                    >
                                        <option value="" disabled>Select Available Room...</option>
                                        {availableRooms.map(room => (
                                            <option key={room.id} value={room.id}>
                                                {room.name} — ${room.price}/night
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button type="button" onClick={handleBack} className="w-1/3 py-4 rounded-full border border-outline-variant text-on-surface-variant font-semibold hover:bg-surface-variant/50 transition-all">
                                    Back
                                </button>
                                <button type="submit" className="w-2/3 flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-on-secondary rounded-full hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-lg shadow-secondary/20">
                                    <span className="font-semibold tracking-wide">Finalize Check In</span>
                                    <CheckCircle2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </div>

      </div>
    </div>
  );
}
