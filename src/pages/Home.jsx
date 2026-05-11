import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Bell, Search, ShoppingBag, ChevronRight, Zap, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Menu className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-secondary font-inter text-xs">Hello, Alex</p>
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-primary" />
              <h1 className="text-on-surface font-poppins font-semibold text-base">FreshMart - Central</h1>
            </div>
          </div>
        </div>
        <button className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
          <Bell size={20} className="text-on-surface" />
        </button>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* Active Session Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 mt-6 bg-primary p-8 rounded-[2rem] shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <span className="text-white/70 font-inter text-[10px] font-bold tracking-[0.2em] uppercase">Active Session</span>
              <h2 className="text-white font-poppins font-bold text-3xl mt-2">Ready to Scan</h2>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl">
              <Zap size={28} className="text-white" />
            </div>
          </div>
          <p className="text-white/90 font-inter mt-6 text-sm leading-relaxed max-w-[80%]">
            You are currently at FreshMart - Central. Start adding items to your cart by scanning their barcodes.
          </p>
          <Link to="/scanner" className="block w-full bg-white mt-8 py-4 rounded-2xl font-poppins font-bold text-center text-primary hover:bg-white/90 transition-colors shadow-lg">
            Open Scanner
          </Link>
        </motion.div>

        {/* Search Bar */}
        <div className="mx-6 mt-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
          <input 
            type="text" 
            placeholder="Search for products or stores..."
            className="w-full bg-white pl-12 pr-6 py-4 rounded-2xl shadow-sm border border-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/20 font-inter transition-all"
          />
        </div>

        {/* Nearby Stores */}
        <section className="mt-12">
          <div className="px-6 flex justify-between items-center mb-6">
            <h3 className="text-on-surface font-poppins font-bold text-xl">Nearby Stores</h3>
            <button className="text-primary font-inter font-semibold hover:underline text-sm">See All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide">
            <StoreCard name="FreshMart" distance="0.2 km" color="bg-primary/10" iconColor="text-primary" />
            <StoreCard name="Organic Oasis" distance="1.5 km" color="bg-secondary/10" iconColor="text-secondary" />
            <StoreCard name="Daily Grocer" distance="2.1 km" color="bg-primary-container/10" iconColor="text-primary-container" />
          </div>
        </section>

        {/* Flash Sale */}
        <section className="mx-6 mt-10">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-outline/5 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 bg-primary-container px-6 py-2 rounded-bl-2xl">
              <span className="text-white font-bold text-xs">20% OFF</span>
            </div>
            <p className="text-primary font-inter font-bold text-xs tracking-widest uppercase">Flash Sale</p>
            <h3 className="text-on-surface font-poppins font-bold text-2xl mt-2">Fresh Berries</h3>
            <p className="text-secondary font-inter mt-3 text-sm leading-relaxed">
              Get 20% off all seasonal berries today. Locally sourced and picked fresh this morning.
            </p>
            <button className="mt-6 flex items-center gap-2 text-primary font-inter font-bold group-hover:gap-3 transition-all">
              View Deal
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-outline/5 px-8 py-4 flex justify-around items-center z-30">
        <NavItem to="/" icon={<ShoppingBag size={24} />} label="Home" active />
        <NavItem to="/search" icon={<Search size={24} />} label="Search" />
        <NavItem to="/cart" icon={<ShoppingBag size={24} />} label="Cart" />
        <NavItem to="/profile" icon={<MapPin size={24} />} label="Profile" />
      </nav>
    </div>
  );
}

function StoreCard({ name, distance, color, iconColor }) {
  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      className="flex-shrink-0 w-44 bg-white p-5 rounded-[2rem] shadow-sm border border-outline/5 hover:border-primary/20 transition-all text-left"
    >
      <div className={`w-full aspect-square rounded-2xl mb-4 flex items-center justify-center ${color}`}>
        <ShoppingBag className={iconColor} size={32} />
      </div>
      <h4 className="text-on-surface font-poppins font-semibold text-sm">{name}</h4>
      <p className="text-secondary font-inter text-xs mt-1">{distance} away</p>
    </motion.button>
  );
}

function NavItem({ to, icon, label, active }) {
  return (
    <Link to={to} className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-secondary hover:text-on-surface'}`}>
      {icon}
      <span className={`text-[10px] font-inter font-semibold ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    </Link>
  );
}

