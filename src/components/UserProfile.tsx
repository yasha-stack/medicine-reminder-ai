import { motion } from "motion/react";
import { Bell, Edit, Heart, ShieldCheck, HeartPulse, User as UserIcon, CalendarDays, History, Sliders, Watch, PhoneCall, LogOut, ChevronRight } from "lucide-react";
import { User, Medication } from "../types";

interface UserProfileProps {
  user: User;
  medications: Medication[];
  onLogOut: () => void;
}

export default function UserProfile({ user, medications, onLogOut }: UserProfileProps) {
  const handleEditProfile = () => {
    alert("Profile editing is a premium feature! You are currently on the Medicare AI Premium Plan.");
  };

  const handleSettingClick = (setting: string) => {
    alert(`Setting menu: ${setting} under simulated clinical profile configurations.`);
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30] select-none pb-28">
      {/* Top Bar matching screenshot */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-100 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
            <img
              className="w-full h-full object-cover"
              src={user.avatarUrl}
              alt="User thumb"
            />
          </div>
          <span className="font-extrabold text-base text-blue-800">MediCare AI</span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-blue-600 transition-all">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 px-6 max-w-md mx-auto space-y-6">
        {/* Profile Hero section */}
        <section className="flex flex-col items-center text-center space-y-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-blue-600 to-emerald-400 shadow-md">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                <img
                  className="w-full h-full object-cover"
                  src={user.avatarUrl}
                  alt={user.name}
                />
              </div>
            </div>
            <button 
              onClick={handleEditProfile}
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-all active:scale-90"
            >
              <Edit size={14} />
            </button>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">{user.name}</h1>
            <p className="text-xs text-gray-400 font-medium">Premium Member &bull; ID: {user.memberId}</p>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl mb-1 flex items-center justify-center">
              <HeartPulse size={20} />
            </span>
            <span className="text-base font-extrabold text-blue-600 mt-1">98%</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Adherence</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl mb-1 flex items-center justify-center">
              <CalendarDays size={20} />
            </span>
            <span className="text-base font-extrabold text-emerald-600 mt-1">{medications.length}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Medications</span>
          </div>
        </section>

        {/* Settings List */}
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 divide-y divide-gray-50">
          {/* Personal Info */}
          <button 
            onClick={() => handleSettingClick("Personal Information")}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <UserIcon size={18} />
              </div>
              <span className="text-sm font-bold text-gray-700">Personal Information</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Health History */}
          <button 
            onClick={() => handleSettingClick("Health History")}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <History size={18} />
              </div>
              <span className="text-sm font-bold text-gray-700">Health History</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Notification Settings */}
          <button 
            onClick={() => handleSettingClick("Notification Settings")}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Sliders size={18} />
              </div>
              <span className="text-sm font-bold text-gray-700">Notification Settings</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Connected Devices */}
          <button 
            onClick={() => handleSettingClick("Connected Devices")}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Watch size={18} />
              </div>
              <span className="text-sm font-bold text-gray-700">Connected Devices</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Emergency Contacts */}
          <button 
            onClick={() => handleSettingClick("Emergency Contacts")}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <PhoneCall size={18} />
              </div>
              <span className="text-sm font-bold text-gray-700">Emergency Contacts</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
          </button>
        </section>

        {/* Log Out Button */}
        <button 
          onClick={onLogOut}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border-2 border-red-200 text-red-600 font-bold hover:bg-red-50/20 active:scale-95 transition-all duration-150"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </main>
    </div>
  );
}
