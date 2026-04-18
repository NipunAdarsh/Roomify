import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, DollarSign, Search, CheckCircle2, Music } from 'lucide-react';
import { mockData } from '../data/mockData';

export default function PartyHalls() {
  const [formData, setFormData] = useState({
    bookingId: '',
    eventDate: '',
    timeSlot: '',
    flatFee: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const activeBookings = mockData.bookings.filter(b => b.status === "Confirmed" || b.status === "Pending");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mock Hall Booking Placed:", formData);
    setIsSuccess(true);
    setTimeout(() => {
        setIsSuccess(false);
        setFormData({ bookingId: '', eventDate: '', timeSlot: '', flatFee: '' });
    }, 3000);
  };

  return (
    <div className="p-8 pb-32 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-display-sm text-on-surface mb-2 flex items-center gap-3">
            <span className="p-3 bg-secondary-container text-on-secondary-container rounded-2xl">
              <Music className="w-8 h-8" />
            </span>
            Party Halls
          </h1>
          <p className="text-body-lg text-on-surface-variant">Manage venue reservations for weddings, corporate events, and parties.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Col: Booking Form */}
        <div className="xl:col-span-1">
            <div className="bg-surface/60 backdrop-blur-3xl rounded-[32px] p-8 border border-outline-variant/20 shadow-xl relative overflow-hidden">
                {isSuccess && (
                    <div className="absolute inset-0 z-20 bg-surface/90 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in rounded-[32px]">
                        <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                        <h2 className="text-headline-sm text-on-surface text-center">Hall Booked!</h2>
                        <p className="text-body-md text-on-surface-variant text-center px-4">Event on {formData.eventDate} has been confirmed.</p>
                    </div>
                )}
                
                <h3 className="text-headline-sm text-primary mb-6">Reserve a Hall</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="text-label-sm text-on-surface-variant mb-2 block ml-2">Associated Guest Booking</label>
                            <div className="absolute top-10 left-4 pointer-events-none">
                                <Search className="h-5 w-5 text-on-surface-variant" />
                            </div>
                            <select 
                                required name="bookingId" value={formData.bookingId} onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface outline-none transition-all appearance-none"
                            >
                                <option value="" disabled>Select active booking...</option>
                                {activeBookings.map(b => (
                                    <option key={b.id} value={b.id}>
                                        {b.guestName} ({b.roomName})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <label className="text-label-sm text-on-surface-variant mb-2 block ml-2">Event Date</label>
                            <div className="absolute top-10 left-4 pointer-events-none">
                                <CalendarIcon className="h-5 w-5 text-on-surface-variant" />
                            </div>
                            <input 
                                required type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface outline-none transition-all"
                            />
                        </div>

                        <div className="relative">
                            <label className="text-label-sm text-on-surface-variant mb-2 block ml-2">Time Slot</label>
                            <div className="absolute top-10 left-4 pointer-events-none">
                                <Clock className="h-5 w-5 text-on-surface-variant" />
                            </div>
                            <select 
                                required name="timeSlot" value={formData.timeSlot} onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface outline-none transition-all appearance-none"
                            >
                                <option value="" disabled>Select a slot...</option>
                                <option value="Morning (9 AM - 2 PM)">Morning (9 AM - 2 PM)</option>
                                <option value="Afternoon (3 PM - 8 PM)">Afternoon (3 PM - 8 PM)</option>
                                <option value="Evening (9 PM - 2 AM)">Evening (9 PM - 2 AM)</option>
                                <option value="Full Day (9 AM - 11 PM)">Full Day (9 AM - 11 PM)</option>
                            </select>
                        </div>

                        <div className="relative">
                            <label className="text-label-sm text-on-surface-variant mb-2 block ml-2">Flat Fee Agreement ($)</label>
                            <div className="absolute top-10 left-4 pointer-events-none">
                                <DollarSign className="h-5 w-5 text-on-surface-variant" />
                            </div>
                            <input 
                                required type="number" step="100" name="flatFee" value={formData.flatFee} onChange={handleInputChange}
                                placeholder="500.00"
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full mt-4 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-full hover:bg-primary-container transition-all shadow-lg shadow-primary/20 font-bold">
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>

        {/* Right Col: Calendar / List View */}
        <div className="xl:col-span-2">
            <div className="bg-surface/60 backdrop-blur-3xl rounded-[32px] p-8 border border-outline-variant/20 shadow-xl overflow-x-auto h-full">
                 <h3 className="text-headline-sm text-primary mb-6">Upcoming Events</h3>
                 <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="text-label-sm text-on-surface-variant uppercase tracking-wider border-b border-surface-variant">
                        <th className="pb-4 font-bold pl-2">Event Date</th>
                        <th className="pb-4 font-bold">Time Slot</th>
                        <th className="pb-4 font-bold">Client / Guest</th>
                        <th className="pb-4 font-bold">Fee</th>
                        <th className="pb-4 font-bold">Status</th>
                    </tr>
                    </thead>
                    <tbody className="text-body-md text-on-surface">
                    <tr className="border-b border-surface-variant/60 hover:bg-surface-container/30 transition-colors">
                        <td className="py-4 pl-2 font-semibold">Nov 15, 2026</td>
                        <td className="py-4 text-on-surface-variant">Morning (9 AM - 2 PM)</td>
                        <td className="py-4">Michael Chang</td>
                        <td className="py-4 font-bold text-secondary">$350.00</td>
                        <td className="py-4"><span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-primary">Confirmed</span></td>
                    </tr>
                    <tr className="border-b border-surface-variant/60 hover:bg-surface-container/30 transition-colors">
                        <td className="py-4 pl-2 font-semibold">Dec 10, 2026</td>
                        <td className="py-4 text-on-surface-variant">Evening (9 PM - 2 AM)</td>
                        <td className="py-4">Emma Woodhouse</td>
                        <td className="py-4 font-bold text-secondary">$800.00</td>
                        <td className="py-4"><span className="px-3 py-1 bg-secondary-container/50 rounded-full text-xs font-bold text-secondary">Confirmed</span></td>
                    </tr>
                    <tr className="border-b border-surface-variant/60 hover:bg-surface-container/30 transition-colors">
                        <td className="py-4 pl-2 font-semibold">Dec 31, 2026</td>
                        <td className="py-4 text-on-surface-variant">Full Day (9 AM - 11 PM)</td>
                        <td className="py-4">Sarah Jenkins</td>
                        <td className="py-4 font-bold text-secondary">$1,500.00</td>
                        <td className="py-4"><span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-primary">Confirmed</span></td>
                    </tr>
                    </tbody>
                 </table>
                 
                 <div className="mt-8 p-6 bg-secondary/10 rounded-[24px] border border-secondary/20 flex items-start gap-4">
                     <div className="p-3 bg-secondary rounded-full text-on-secondary shrink-0">
                         <CalendarIcon className="w-6 h-6" />
                     </div>
                     <div>
                         <h4 className="text-body-lg text-primary font-bold">Holiday Season Approaching</h4>
                         <p className="text-body-md text-on-surface-variant mt-1">December is 80% booked for evening slots. Consider adjusting flat fees for the remaining availability.</p>
                     </div>
                 </div>
            </div>
        </div>

      </div>
    </div>
  );
}
