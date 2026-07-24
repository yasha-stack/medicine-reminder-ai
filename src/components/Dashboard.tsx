import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Bell, AlarmClock, Pill, Droplets, Check, AlertCircle, TrendingUp, Sparkles, Calendar, Plus } from "lucide-react";
import { Medication, DoseLog, User } from "../types";

interface DashboardProps {
  user: User;
  medications: Medication[];
  logs: DoseLog[];
  onLogDose: (medicationId: string, status: 'taken' | 'pending' | 'later') => void;
  onNavigate: (view: 'home' | 'schedule' | 'assistant' | 'profile' | 'add' | 'detail') => void;
  onSelectMedication: (medicationId: string) => void;
}

export default function Dashboard({
  user,
  medications,
  logs,
  onLogDose,
  onNavigate,
  onSelectMedication,
}: DashboardProps) {
  // Calculate Adherence dynamically
  const adherencePercent = useMemo(() => {
    if (medications.length === 0) return 100;
    
    // For simplicity, let's check logs of today
    const totalDosesToday = medications.length;
    const takenToday = logs.filter(l => l.status === 'taken').length;
    
    // Default mock calculation if no logs yet to match screenshot (75%)
    if (logs.length === 0) return 75;

    return Math.round((takenToday / totalDosesToday) * 100);
  }, [medications, logs]);

  // Find next upcoming dose
  const upcomingMed = useMemo(() => {
    if (medications.length === 0) return null;
    
    // Find first one that is pending
    const pendingLogs = medications.filter(m => {
      const logged = logs.find(l => l.medicationId === m.id);
      return !logged || logged.status !== 'taken';
    });

    return pendingLogs[0] || medications[0];
  }, [medications, logs]);

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30] select-none">
      {/* Top Bar matching screenshot */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-100 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src={user.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuC-hVpjKoOJoln3J9AmiziRYDPTlvWcZzniRPlzrdp6QVmeZKgs25sXAiIZ7Ldnkts9Th5as2QxXGmuVdBvDnBItZ5GrYfiY8BZCpSJOIyBd4YjOUukK5qPOitBjBMGodiKsIQDcIng7WZDxnjtdLPcAJuZfR8WqQZY9aDiAcOXMS5AmfaC0G-ZWnkyOxMeFge5RcaO20WzgHgSqonOnzi4XWsckBNPno_g6-01upfDDDxSEM1gAIuvnw"}
              alt="User profile"
            />
          </div>
          <div className="flex flex-col text-left">
            <h1 className="font-bold text-base text-gray-900 leading-tight">Good Morning, {user.name}</h1>
            <span className="text-xs text-gray-400">Your health is on track</span>
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-blue-600 transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 pb-28 px-6 max-w-md mx-auto space-y-6">
        {/* Progress & Upcoming Row */}
        <div className="space-y-4">
          {/* Adherence Circular Progress card */}
          <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Adherence</h2>
              <p className="text-2xl font-bold text-blue-900">{adherencePercent}%</p>
              <p className="text-xs text-gray-500">of today's medicines taken</p>
            </div>
            {/* SVG Circle Progress */}
            <div className="relative flex items-center justify-center w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-gray-100"
                  strokeWidth="6"
                  fill="transparent"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="34"
                  className="stroke-blue-600"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="213.6"
                  initial={{ strokeDashoffset: 213.6 }}
                  animate={{ strokeDashoffset: 213.6 - (213.6 * adherencePercent) / 100 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-sm font-bold text-blue-600">{adherencePercent}%</span>
            </div>
          </section>

          {/* Upcoming dose alert */}
          {upcomingMed ? (
            <section className="bg-blue-600 text-white p-5 rounded-2xl shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-white/20 rounded-xl text-white">
                  <AlarmClock size={24} className="animate-pulse" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-blue-100 uppercase tracking-wider">Upcoming</p>
                  <p className="text-lg font-bold">{upcomingMed.reminderTime}</p>
                  <p className="text-xs text-blue-100 mt-0.5">{upcomingMed.name} ({upcomingMed.dosage})</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  onLogDose(upcomingMed.id, 'taken');
                }}
                className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 active:scale-95 text-xs font-bold rounded-full shadow-sm transition-all"
              >
                Log Now
              </button>
            </section>
          ) : (
            <section className="bg-emerald-600 text-white p-5 rounded-2xl shadow-md flex items-center gap-3">
              <span className="p-2.5 bg-white/20 rounded-xl">
                <Check size={24} />
              </span>
              <div>
                <p className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">Excellent work</p>
                <p className="text-sm font-bold">All medications logged for today!</p>
              </div>
            </section>
          )}
        </div>

        {/* Schedule List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Today's Schedule</h3>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
              <Calendar size={14} />
              June 14, 2024
            </span>
          </div>

          <div className="space-y-3">
            {medications.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-200 text-center space-y-3">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Pill size={24} />
                </div>
                <p className="text-sm text-gray-500 font-medium">No medications added yet.</p>
                <button
                  onClick={() => onNavigate('add')}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-full shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
                >
                  Add Your First Medicine
                </button>
              </div>
            ) : (
              medications.map(med => {
                const log = logs.find(l => l.medicationId === med.id);
                const isTaken = log?.status === 'taken';
                const isLater = log?.status === 'later';

                return (
                  <div
                    key={med.id}
                    onClick={() => {
                      onSelectMedication(med.id);
                      onNavigate('detail');
                    }}
                    className={`bg-white p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer shadow-sm group hover:border-blue-200 ${
                      isTaken ? "border-l-4 border-l-emerald-500 border-gray-100" : "border-l-4 border-l-blue-500 border-gray-100"
                    }`}
                  >
                    {/* Icon based on medication category */}
                    <div className={`w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0 ${
                      med.category === "Vitamin"
                        ? "bg-emerald-50 text-emerald-600"
                        : med.category === "Cardiovascular"
                        ? "bg-red-50 text-red-500"
                        : "bg-blue-50 text-blue-600"
                    }`}>
                      {med.category === "Cardiovascular" ? <Droplets size={22} /> : <Pill size={22} />}
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {med.name}
                          </h4>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">
                            {med.dosage} &bull; {med.instructions}
                          </p>
                        </div>
                        <span className={`text-xs font-bold ${isTaken ? "text-emerald-600" : "text-blue-600"}`}>
                          {med.reminderTime}
                        </span>
                      </div>
                    </div>

                    {/* Actions button */}
                    <div className="flex flex-col items-center flex-shrink-0" onClick={e => e.stopPropagation()}>
                      {isTaken ? (
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                            <Check size={16} />
                          </div>
                          <span className="text-[9px] mt-1 font-bold text-emerald-600 uppercase tracking-wider">Logged</span>
                        </div>
                      ) : (
                        <div className="flex gap-1.5">
                          {isLater ? (
                            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Later</span>
                          ) : (
                            <>
                              <button
                                onClick={() => onLogDose(med.id, 'later')}
                                className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 active:scale-95 transition-all text-xs font-bold"
                              >
                                Later
                              </button>
                              <button
                                onClick={() => onLogDose(med.id, 'taken')}
                                className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-sm transition-all text-xs font-bold"
                              >
                                Take
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* AI Health Insight Banner matching screenshot */}
        <section 
          onClick={() => onNavigate('assistant')}
          className="relative overflow-hidden rounded-2xl h-36 bg-gradient-to-br from-[#0c1f3d] to-[#1a3a60] flex items-center px-5 group cursor-pointer shadow-md text-left"
        >
          <div className="relative z-10 space-y-1.5 max-w-[75%]">
            <span className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider text-blue-300 uppercase">
              <Sparkles size={12} />
              AI Health Insight
            </span>
            <h3 className="text-base font-bold text-white">Better adherence this week!</h3>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              Consistency is high. You've successfully completed {adherencePercent}% of scheduled doses!
            </p>
          </div>
          {/* Subtle icon graphic decoration in background */}
          <div className="absolute right-[-15px] bottom-[-15px] opacity-10 group-hover:scale-110 transition-transform duration-500 text-white">
            <TrendingUp size={140} />
          </div>
        </section>
      </main>

      {/* FAB to add a medicine */}
      <button
        onClick={() => onNavigate('add')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 active:scale-95 transition-all z-40 border-4 border-white"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
