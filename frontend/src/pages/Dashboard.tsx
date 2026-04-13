import React from 'react';
import { mockData } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const { metrics, rooms } = mockData;

  return (
    <>
      {/* Metrics Row: Asymmetrical Overlapping Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="relative group">
          <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/30 transition-all rounded-3xl"></div>
          <div className="relative bg-white/60 backdrop-blur-3xl p-8 rounded-lg border border-white/40 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-on-surface-variant/60 font-semibold text-sm uppercase tracking-wider">Occupancy Rate</span>
              <div className="p-2 bg-secondary/10 text-secondary rounded-full">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
            </div>
            <div className="text-5xl font-extrabold text-primary font-headline mb-1">{metrics.occupancy}%</div>
            <div className="flex items-center gap-2 text-secondary font-semibold text-sm">
              <span>+{metrics.occupancyTrend}%</span>
              <span className="text-on-surface-variant/40">vs last month</span>
            </div>
          </div>
        </div>

        <div className="relative group md:translate-y-4">
          <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/30 transition-all rounded-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-3xl p-8 rounded-lg border border-white/60 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-on-surface-variant/60 font-semibold text-sm uppercase tracking-wider">Today's Arrivals</span>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <span className="material-symbols-outlined">luggage</span>
              </div>
            </div>
            <div className="text-5xl font-extrabold text-primary font-headline mb-1">{metrics.arrivals}</div>
            <div className="flex items-center gap-2 text-on-surface-variant/40 font-semibold text-sm">
              <span>8 check-ins remaining</span>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-white/20 blur-xl group-hover:bg-white/30 transition-all rounded-3xl"></div>
          <div className="relative bg-white/60 backdrop-blur-3xl p-8 rounded-lg border border-white/40 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-on-surface-variant/60 font-semibold text-sm uppercase tracking-wider">Total Revenue</span>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <span className="material-symbols-outlined">payments</span>
              </div>
            </div>
            <div className="text-5xl font-extrabold text-primary font-headline mb-1">${metrics.revenue.toLocaleString()}</div>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <span>Peak performance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Room Status Widget Section */}
      <section className="mt-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-3xl font-extrabold text-primary font-headline leading-tight">Live Directory</h3>
            <p className="text-primary/60 font-medium">Real-time availability for the North Wing</p>
          </div>
          <div className="flex gap-2 bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/40">
            <button className="px-6 py-2 rounded-full bg-white text-primary font-bold shadow-sm transition-all">All</button>
            <button className="px-6 py-2 rounded-full text-primary/60 font-bold hover:bg-white/20 transition-all">Available</button>
            <button className="px-6 py-2 rounded-full text-primary/60 font-bold hover:bg-white/20 transition-all">Occupied</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {rooms.map((room, i) => (
            <div key={room.id} className={`group bg-white/40 backdrop-blur-3xl rounded-lg overflow-hidden border border-white/40 hover:bg-white/60 transition-all duration-500 shadow-lg hover:shadow-2xl ${i % 2 !== 0 ? 'xl:translate-y-8' : ''}`}>
              <div className="relative h-48 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={room.imageUrl} alt={room.name} />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${room.status === 'AVAILABLE' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                  {room.status}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-primary">{room.name}</h4>
                  <span className="text-lg font-black text-secondary">${room.price}</span>
                </div>
                <div className="flex items-center gap-3 text-primary/40 text-sm mb-6">
                  {room.amenities.map(amenity => (
                    <span key={amenity} className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check</span>
                      {amenity}
                    </span>
                  ))}
                </div>
                <button className="w-full py-3 rounded-2xl bg-white/60 border border-primary/10 text-primary font-bold hover:bg-primary hover:text-white transition-all group-hover:border-primary">
                  Book Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Freshness Sparkline Section */}
      <section className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-primary text-white p-10 rounded-lg relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold font-headline mb-4">Market Momentum</h3>
            <div className="flex items-end gap-1 h-32 mb-6">
              {[40, 60, 45, 80, 100, 90, 70, 85].map((h, idx) => (
                <div key={idx} className="flex-1 bg-secondary/30 rounded-full hover:bg-secondary transition-all" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <p className="text-white/60 font-medium">Booking momentum is 15% higher than average for this season.</p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-3xl p-8 rounded-lg border border-white/60 flex flex-col justify-center shadow-xl">
          <h4 className="text-on-surface-variant/40 font-bold uppercase tracking-widest text-xs mb-6 text-center">Guest Sentiment</h4>
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full border-[12px] border-emerald-50 relative flex items-center justify-center">
              <div className="absolute inset-0 border-[12px] border-secondary rounded-full clip-triangle"></div>
              <span className="text-3xl font-black text-primary">{metrics.rating}</span>
            </div>
          </div>
          <p className="text-primary/60 text-sm text-center font-medium">Based on {metrics.reviews.toLocaleString()} verified guest reviews from the last 30 days.</p>
        </div>
      </section>
    </>
  );
};
