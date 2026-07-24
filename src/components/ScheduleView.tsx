import { useState, useMemo } from "react";
import { Calendar, CheckCircle2, Circle, Clock, Pill } from "lucide-react";
import { Medication, DoseLog } from "../types";

interface ScheduleViewProps {
  medications: Medication[];
  logs: DoseLog[];
  onLogDose: (medicationId: string, status: 'taken' | 'pending' | 'later') => void;
  onSelectMedication: (medicationId: string) => void;
  onNavigate: (view: 'home' | 'schedule' | 'assistant' | 'profile' | 'add' | 'detail') => void;
}

export default function ScheduleView({
  medications,
  logs,
  onLogDose,
  onSelectMedication,
  onNavigate,
}: ScheduleViewProps) {
  const [selectedDay, setSelectedDay] = useState(14); // e.g. June 14

  const daysOfWeek = [
    { name: "Mon", date: 10 },
    { name: "Tue", date: 11 },
    { name: "Wed", date: 12 },
    { name: "Thu", date: 13 },
    { name: "Fri", date: 14, active: true },
    { name: "Sat", date: 15 },
    { name: "Sun", date: 16 },
  ];

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30] select-none pb-28">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-100 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar size={22} className="text-blue-600" />
          <h1 className="font-bold text-lg text-gray-900">Medication Schedule</h1>
        </div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">June 2024</span>
      </header>

      <main className="pt-20 px-6 max-w-md mx-auto space-y-6">
        {/* Calendar Day horizontal slider */}
        <section className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between">
            {daysOfWeek.map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDay(day.date)}
                className={`flex flex-col items-center p-2.5 w-11 rounded-xl transition-all ${
                  selectedDay === day.date
                    ? "bg-blue-600 text-white font-bold shadow-md"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider">{day.name}</span>
                <span className="text-sm mt-1">{day.date}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Medication count list */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-left">
            <div>
              <h3 className="text-base font-bold text-gray-900">Dose Schedule</h3>
              <p className="text-xs text-gray-400 mt-0.5">Showing scheduled plans for June {selectedDay}</p>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {medications.length} total
            </span>
          </div>

          <div className="space-y-3">
            {medications.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-200 text-center space-y-2">
                <Pill size={24} className="mx-auto text-gray-300" />
                <p className="text-sm text-gray-400 font-medium">No plans on this day.</p>
              </div>
            ) : (
              medications.map((med) => {
                const log = logs.find((l) => l.medicationId === med.id);
                const isTaken = log?.status === "taken";

                return (
                  <div
                    key={med.id}
                    onClick={() => {
                      onSelectMedication(med.id);
                      onNavigate("detail");
                    }}
                    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4 cursor-pointer hover:border-blue-200 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLogDose(med.id, isTaken ? "pending" : "taken");
                        }}
                        className={`transition-all ${isTaken ? "text-emerald-600" : "text-gray-300 hover:text-blue-500"}`}
                      >
                        {isTaken ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                      </button>
                      <div>
                        <h4 className={`text-sm font-bold text-gray-900 ${isTaken ? "line-through text-gray-400" : ""}`}>
                          {med.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                          <Clock size={12} />
                          <span>{med.reminderTime}</span>
                          <span>&bull;</span>
                          <span>{med.dosage}</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                      {med.instructions}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
