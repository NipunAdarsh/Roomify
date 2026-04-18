import React, { useState } from 'react';
import { mockData } from '../data/mockData';
import { CheckCircle2, Receipt, X } from 'lucide-react';

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState(mockData.bookings);
  const [activeInvoice, setActiveInvoice] = useState<typeof mockData.bookings[0] | null>(null);
  const [invoiceComplete, setInvoiceComplete] = useState(false);

  // Mock calculation logic like invoiceController.js
  const handleCheckoutClick = (booking: typeof mockData.bookings[0]) => {
      setActiveInvoice(booking);
      setInvoiceComplete(false);
  };

  const processPayment = () => {
      if(!activeInvoice) return;
      
      // Update local state to mimic backend 'Completed'
      setBookings(prev => prev.map(b => 
          b.id === activeInvoice.id ? { ...b, status: 'Completed' } : b
      ));

      setInvoiceComplete(true);
      setTimeout(() => {
          setActiveInvoice(null);
          setInvoiceComplete(false);
      }, 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in relative h-full">
      
      {/* Invoice Modal Overlay */}
      {activeInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-tertiary/60 backdrop-blur-xl" onClick={() => !invoiceComplete && setActiveInvoice(null)}></div>
              
              <div className="relative bg-surface/90 backdrop-blur-3xl rounded-[32px] p-8 border border-white/20 shadow-2xl w-full max-w-md animate-fade-in-up flex flex-col">
                  {!invoiceComplete ? (
                      <>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-headline-sm text-primary flex items-center gap-2">
                                <Receipt className="w-6 h-6" />
                                Invoice Summary
                            </h3>
                            <button onClick={() => setActiveInvoice(null)} className="p-2 bg-surface-variant/50 hover:bg-surface-variant rounded-full text-on-surface-variant transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-8 text-on-surface">
                            <div className="flex justify-between border-b border-surface-variant/50 pb-2">
                                <span className="text-on-surface-variant">Booking ID</span>
                                <span className="font-bold">{activeInvoice.id}</span>
                            </div>
                            <div className="flex justify-between border-b border-surface-variant/50 pb-2">
                                <span className="text-on-surface-variant">Guest Name</span>
                                <span className="font-bold">{activeInvoice.guestName}</span>
                            </div>
                            <div className="flex justify-between border-b border-surface-variant/50 pb-2">
                                <span className="text-on-surface-variant">Room Charges</span>
                                <span className="font-bold text-secondary">${activeInvoice.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-b border-surface-variant/50 pb-2">
                                <span className="text-on-surface-variant">Restaurant Orders</span>
                                <span className="font-bold text-secondary">$350.00</span>
                            </div>
                            <div className="flex justify-between border-b border-secondary/20 pb-2 pt-4">
                                <span className="font-bold text-primary">Grand Total</span>
                                <span className="text-xl font-black text-secondary">${(activeInvoice.amount + 350).toLocaleString()}</span>
                            </div>
                        </div>

                        <button onClick={processPayment} className="w-full py-4 bg-primary text-on-primary rounded-full hover:bg-primary-container font-bold shadow-lg shadow-primary/20 transition-all">
                            Process Checkout
                        </button>
                      </>
                  ) : (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 shadow-xl shadow-secondary/30">
                              <CheckCircle2 className="w-10 h-10 text-on-secondary" />
                          </div>
                          <h2 className="text-headline-sm text-on-surface mb-2">Checkout Complete</h2>
                          <p className="text-body-lg text-on-surface-variant">Invoice generated. Room marked for Maintenance.</p>
                      </div>
                  )}
              </div>
          </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-primary font-headline leading-tight">Master Directory</h2>
          <p className="text-primary/60 font-medium">Manage and review all active reservations.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/60 backdrop-blur-3xl p-4 rounded-full border border-white/40 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">search</span>
          <input 
            className="w-full bg-white/40 border border-white/50 rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-secondary/20 placeholder:text-on-surface-variant/40 text-sm transition-all outline-none" 
            placeholder="Search by ID, Guest, or Room..." 
            type="text"
          />
        </div>
        <div className="h-8 w-px bg-primary/10 hidden md:block"></div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <button className="px-5 py-2 rounded-full border border-primary/20 text-primary font-bold hover:bg-white/40 transition-all flex items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            Any Dates
          </button>
          <button className="px-5 py-2 rounded-full border border-primary/20 text-primary font-bold hover:bg-white/40 transition-all flex items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">key</span>
            Room Type
          </button>
          <button className="px-5 py-2 rounded-full border border-primary/20 text-primary font-bold hover:bg-white/40 transition-all flex items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Status
          </button>
        </div>
      </div>

      {/* Bookings Table / Catalog */}
      <div className="bg-white/60 backdrop-blur-3xl rounded-[24px] border border-white/40 shadow-xl overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/40 border-b border-primary/10">
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest w-16">ID</th>
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Guest</th>
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Room</th>
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Dates</th>
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest text-right">Amount</th>
                <th className="py-4 px-6 text-sm font-bold text-primary/60 uppercase tracking-widest">Status / Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={booking.id} className={`hover:bg-white/40 transition-colors ${idx !== bookings.length - 1 ? 'border-b border-primary/5' : ''}`}>
                  <td className="py-4 px-6 font-semibold text-primary/60 text-sm">{booking.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={booking.avatar} alt={booking.guestName} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                      <span className="font-bold text-primary">{booking.guestName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-primary">{booking.roomName}</td>
                  <td className="py-4 px-6 text-primary/70">{booking.checkIn} - {booking.checkOut}</td>
                  <td className="py-4 px-6 font-black text-secondary text-right">${booking.amount.toLocaleString()}</td>
                  <td className="py-4 px-6 flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      booking.status === 'Confirmed' ? 'bg-secondary-container text-on-secondary-container' 
                      : booking.status === 'Completed' ? 'bg-surface-variant text-on-surface-variant border border-outline-variant/30'
                      : 'bg-white text-primary border border-primary/20'
                    }`}>
                      {booking.status}
                    </span>
                    {booking.status === 'Confirmed' && (
                        <button 
                         onClick={() => handleCheckoutClick(booking)}
                         className="px-4 py-1.5 bg-primary text-on-primary rounded-full text-xs font-bold hover:bg-primary-container transition-all shadow-sm"
                        >
                            Checkout (Invoice)
                        </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
