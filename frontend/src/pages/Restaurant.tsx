import React, { useState } from 'react';
import { Utensils, Search, PlusCircle, Coffee, CheckCircle2, DollarSign } from 'lucide-react';
import { mockData } from '../data/mockData';

export default function Restaurant() {
  const [activeTab, setActiveTab] = useState<'NewOrder' | 'OrderHistory'>('NewOrder');
  const [formData, setFormData] = useState({
    tableNumber: '',
    totalAmount: '',
    bookingId: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const activeBookings = mockData.bookings.filter(b => b.status === "Confirmed");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mock Order Placed:", formData);
    setIsSuccess(true);
    setTimeout(() => {
        setIsSuccess(false);
        setFormData({ tableNumber: '', totalAmount: '', bookingId: '' });
    }, 3000);
  };

  return (
    <div className="p-8 pb-32 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-display-sm text-on-surface mb-2 flex items-center gap-3">
            <span className="p-3 bg-secondary-container text-on-secondary-container rounded-2xl">
              <Utensils className="w-8 h-8" />
            </span>
            Restaurant POS
          </h1>
          <p className="text-body-lg text-on-surface-variant">Sustainably sourced dining. Manage orders and room charges.</p>
        </div>

        {/* Tab Switcher (Floating Pill Style) */}
        <div className="flex bg-surface-variant/30 p-1 rounded-full border border-outline-variant/20 shadow-sm backdrop-blur-md">
           <button 
             onClick={() => setActiveTab('NewOrder')}
             className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'NewOrder' ? 'bg-surface text-secondary shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
           >
               New Order
           </button>
           <button 
             onClick={() => setActiveTab('OrderHistory')}
             className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'OrderHistory' ? 'bg-surface text-secondary shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
           >
               Order History
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Area based on Tab */}
        <div className="lg:col-span-2">
            {activeTab === 'NewOrder' && (
                <div className="bg-surface/60 backdrop-blur-3xl rounded-[32px] p-8 border border-outline-variant/20 shadow-xl relative overflow-hidden">
                    {isSuccess && (
                        <div className="absolute inset-0 z-20 bg-surface/90 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in rounded-[32px]">
                            <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                            <h2 className="text-headline-sm text-on-surface">Order Sent to Kitchen</h2>
                            <p className="text-body-md text-on-surface-variant">Table {formData.tableNumber} is being served.</p>
                        </div>
                    )}
                    
                    <h3 className="text-headline-sm text-primary mb-6">Create New Order</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="relative flex-1">
                                <label className="text-label-sm text-on-surface-variant mb-2 block ml-2">Table Number</label>
                                <div className="absolute top-10 left-4 pointer-events-none">
                                    <Coffee className="h-5 w-5 text-on-surface-variant" />
                                </div>
                                <input 
                                    required type="number" name="tableNumber" value={formData.tableNumber} onChange={handleInputChange}
                                    placeholder="e.g. 12"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                />
                            </div>
                            <div className="relative flex-1">
                                <label className="text-label-sm text-on-surface-variant mb-2 block ml-2">Total Amount ($)</label>
                                <div className="absolute top-10 left-4 pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-on-surface-variant" />
                                </div>
                                <input 
                                    required type="number" step="0.01" name="totalAmount" value={formData.totalAmount} onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="relative pt-2">
                            <label className="text-label-sm text-on-surface-variant mb-2 block ml-2">Charge to Room (Optional)</label>
                            <div className="absolute top-12 left-4 pointer-events-none">
                                <Search className="h-5 w-5 text-on-surface-variant" />
                            </div>
                            <select 
                                name="bookingId" value={formData.bookingId} onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-variant/50 border-none focus:ring-2 focus:ring-secondary/40 text-on-surface outline-none transition-all appearance-none"
                            >
                                <option value="">Walk-in Customer (Pay Now)</option>
                                {activeBookings.map(b => (
                                    <option key={b.id} value={b.id}>
                                        {b.roomName} — {b.guestName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="w-full mt-4 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-full hover:bg-primary-container transition-all shadow-lg shadow-primary/20 font-bold">
                            <PlusCircle className="w-5 h-5" />
                            Place Order
                        </button>
                    </form>
                </div>
            )}

            {activeTab === 'OrderHistory' && (
                <div className="bg-surface/60 backdrop-blur-3xl rounded-[32px] p-8 border border-outline-variant/20 shadow-xl overflow-x-auto">
                     <h3 className="text-headline-sm text-primary mb-6">Recent Orders</h3>
                     <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="text-label-sm text-on-surface-variant uppercase tracking-wider border-b border-surface-variant">
                            <th className="pb-4 font-bold pl-2">Order ID</th>
                            <th className="pb-4 font-bold">Table</th>
                            <th className="pb-4 font-bold">Amount</th>
                            <th className="pb-4 font-bold">Charged To</th>
                            <th className="pb-4 font-bold">Status</th>
                        </tr>
                        </thead>
                        <tbody className="text-body-md text-on-surface">
                        <tr className="border-b border-surface-variant/60 hover:bg-surface-container/30 transition-colors">
                            <td className="py-4 pl-2 font-semibold">ORD-1042</td>
                            <td className="py-4">Table 4</td>
                            <td className="py-4 font-bold text-secondary">$45.50</td>
                            <td className="py-4 text-on-surface-variant">Walk-in</td>
                            <td className="py-4"><span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-primary">Paid</span></td>
                        </tr>
                        <tr className="border-b border-surface-variant/60 hover:bg-surface-container/30 transition-colors">
                            <td className="py-4 pl-2 font-semibold">ORD-1043</td>
                            <td className="py-4">Table 12</td>
                            <td className="py-4 font-bold text-secondary">$120.00</td>
                            <td className="py-4 text-on-surface-variant">Michael Chang (The Mist)</td>
                            <td className="py-4"><span className="px-3 py-1 bg-secondary-container/50 rounded-full text-xs font-bold text-secondary">Room Charge</span></td>
                        </tr>
                        <tr className="border-b border-surface-variant/60 hover:bg-surface-container/30 transition-colors">
                            <td className="py-4 pl-2 font-semibold">ORD-1044</td>
                            <td className="py-4">Table 2</td>
                            <td className="py-4 font-bold text-secondary">$18.90</td>
                            <td className="py-4 text-on-surface-variant">Walk-in</td>
                            <td className="py-4"><span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-primary">Paid</span></td>
                        </tr>
                        </tbody>
                     </table>
                </div>
            )}
        </div>

        {/* Right Sidebar - Status */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface/40 backdrop-blur-md rounded-[24px] p-6 border border-outline-variant/20 shadow-sm relative overflow-hidden">
                 <div className="absolute inset-0 bg-secondary/5 mix-blend-overlay"></div>
                 <h3 className="text-label-md text-on-surface-variant uppercase tracking-wider mb-2 font-bold relative z-10">Today's Revenue</h3>
                 <p className="text-display-md text-primary font-light relative z-10">$1,452</p>
                 <p className="text-body-sm text-secondary font-bold relative z-10 flex items-center gap-1 mt-1">
                     +14% from yesterday
                 </p>
            </div>
            <div className="bg-surface/40 backdrop-blur-md rounded-[24px] p-6 border border-outline-variant/20 shadow-sm relative overflow-hidden">
                 <h3 className="text-label-md text-on-surface-variant uppercase tracking-wider mb-2 font-bold">Active Tables</h3>
                 <p className="text-display-md text-on-surface font-light">8 <span className="text-headline-sm text-on-surface-variant">/ 24</span></p>
            </div>
        </div>

      </div>
    </div>
  );
}
