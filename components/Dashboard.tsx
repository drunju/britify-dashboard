
import React, { useState, useEffect } from 'react';
// Correct modular imports for signOut and User type
import { signOut, type User } from 'firebase/auth';
import { auth } from '../firebase';
import { getAIGreeting } from '../services/gemini';
import { 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  User as UserIcon, 
  Bell, 
  Search,
  Sparkles,
  TrendingUp,
  Calendar,
  Layers
} from 'lucide-react';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [greeting, setGreeting] = useState<string>('Welcome back!');
  const [loadingGreeting, setLoadingGreeting] = useState(true);

  useEffect(() => {
    const fetchGreeting = async () => {
      const name = user.displayName || user.email?.split('@')[0] || 'User';
      const aiGreeting = await getAIGreeting(name);
      setGreeting(aiGreeting);
      setLoadingGreeting(false);
    };

    fetchGreeting();
  }, [user]);

  const handleSignOut = () => {
    // Modular signOut function call
    signOut(auth);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="text-indigo-400 w-8 h-8" />
            Britify
          </h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
          <NavItem icon={<TrendingUp />} label="Analytics" />
          <NavItem icon={<Calendar />} label="Schedule" />
          <NavItem icon={<UserIcon />} label="Profile" />
          <NavItem icon={<Settings />} label="Settings" />
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800">{user.displayName || user.email}</p>
                <p className="text-xs text-slate-500">Premium Account</p>
              </div>
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  (user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome Banner */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <h1 className="text-4xl font-extrabold mb-4">Welcome back, {user.displayName || 'Guest'}!</h1>
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                  </div>
                  <p className="text-lg text-indigo-100 font-medium">
                    {loadingGreeting ? 'AI is composing your greeting...' : greeting}
                  </p>
                </div>
              </div>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Revenue" value="$24,500" change="+12.5%" />
              <StatCard label="Active Users" value="1,204" change="+3.2%" />
              <StatCard label="Conversion Rate" value="18.6%" change="-1.4%" />
            </div>

            {/* Content Mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${i % 2 === 0 ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                        {i % 2 === 0 ? <TrendingUp className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800">System Update {i}</p>
                        <p className="text-xs text-slate-500">Successfully completed 2 hours ago</p>
                      </div>
                      <p className="text-xs font-medium text-slate-400">Mar 15</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">System Health</h3>
                <div className="space-y-6">
                  <HealthBar label="Database" percentage={94} color="bg-emerald-500" />
                  <HealthBar label="Storage" percentage={68} color="bg-indigo-500" />
                  <HealthBar label="API Response" percentage={82} color="bg-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean }> = ({ icon, label, active }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800'}`}>
    <span className="w-5 h-5">{icon}</span>
    <span className="font-medium">{label}</span>
  </a>
);

const StatCard: React.FC<{ label: string, value: string, change: string }> = ({ label, value, change }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
    <p className="text-sm font-medium text-slate-500 mb-2">{label}</p>
    <div className="flex items-end justify-between">
      <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
        {change}
      </span>
    </div>
  </div>
);

const HealthBar: React.FC<{ label: string, percentage: number, color: string }> = ({ label, percentage, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span className="font-medium text-slate-700">{label}</span>
      <span className="text-slate-500">{percentage}%</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default Dashboard;
