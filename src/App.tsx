import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Calendar, Bot, User as UserIcon, Plus } from "lucide-react";

import { User, Medication, DoseLog } from "./types";
import SplashScreen from "./components/SplashScreen";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import AddMedicine from "./components/AddMedicine";
import MedicineDetails from "./components/MedicineDetails";
import AIHealthAssistant from "./components/AIHealthAssistant";
import UserProfile from "./components/UserProfile";
import ScheduleView from "./components/ScheduleView";

const PRE_SEEDED_MEDICATIONS: Medication[] = [
  {
    id: "med-1",
    name: "Vitamin D",
    dosage: "1 tablet",
    frequency: "Daily",
    reminderTime: "08:00 AM",
    instructions: "With food",
    remaining: 30,
    total: 30,
    refillReminder: false,
    refillThreshold: 5,
    category: "Vitamin",
    createdAt: new Date().toISOString()
  },
  {
    id: "med-2",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Daily",
    reminderTime: "10:00 AM",
    instructions: "Morning dose",
    remaining: 20,
    total: 30,
    refillReminder: true,
    refillThreshold: 5,
    category: "Cardiovascular",
    createdAt: new Date().toISOString()
  },
  {
    id: "med-3",
    name: "Omega-3",
    dosage: "1 capsule",
    frequency: "Daily",
    reminderTime: "01:30 PM",
    instructions: "After lunch",
    remaining: 30,
    total: 30,
    refillReminder: false,
    refillThreshold: 5,
    category: "Supplements",
    createdAt: new Date().toISOString()
  },
  {
    id: "med-4",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice Daily",
    reminderTime: "08:00 PM",
    instructions: "Take with food",
    remaining: 15,
    total: 30,
    refillReminder: true,
    refillThreshold: 5,
    category: "Anti-Diabetic",
    photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAk8BHUCIWNKqrEBRzXX2EPkoNqiEhzBcCTc4u1sLtAY9p1fwOpNW6pz8ipCMcp0vGc6FnDo0MHlO1jsH3a6G2f-idTJxGw39lSL8rMxECQsWh6gCCg_X2UfZ3RxJzL9O-NawrEI3fRXjgf3SGgvIbK2GynalmBArDeD0mepj6vjgDTr5dZZNpKsqb6H_bzS7wUQO29RXx8_7mchyDt2SEi_PLUY8Fp_CspkTcnWEDsCD1Cc00TUEqayg",
    createdAt: new Date().toISOString()
  }
];

// Pre-seed logs to match screenshot adherence of 75%
// Vitamin D is taken, Lisinopril is pending, Omega-3 is pending, Metformin (not yet 8:00 PM) is pending
const PRE_SEEDED_LOGS: DoseLog[] = [
  {
    id: "log-1",
    medicationId: "med-1",
    time: "08:00 AM",
    date: "2024-06-14",
    status: "taken",
    loggedAt: new Date().toISOString()
  }
];

export default function App() {
  const [view, setView] = useState<'splash' | 'auth' | 'home' | 'schedule' | 'assistant' | 'profile' | 'add' | 'detail'>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [medications, setMedications] = useState<Medication[]>(PRE_SEEDED_MEDICATIONS);
  const [logs, setLogs] = useState<DoseLog[]>(PRE_SEEDED_LOGS);
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null);

  // Load user or mock data from localStorage if available
  useEffect(() => {
    const savedUser = localStorage.getItem("medicare_user");
    const savedMeds = localStorage.getItem("medicare_medications");
    const savedLogs = localStorage.getItem("medicare_logs");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView('home');
    }
    if (savedMeds) {
      setMedications(JSON.parse(savedMeds));
    }
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleAuthSuccess = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("medicare_user", JSON.stringify(newUser));
    setView('home');
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("medicare_user");
    setView('auth');
  };

  const handleAddMedication = (newMed: Omit<Medication, 'id' | 'createdAt'>) => {
    const med: Medication = {
      ...newMed,
      id: "med-" + Date.now(),
      createdAt: new Date().toISOString()
    };
    const updated = [med, ...medications];
    setMedications(updated);
    localStorage.setItem("medicare_medications", JSON.stringify(updated));
  };

  const handleEditMedication = (updatedMed: Medication) => {
    const updated = medications.map(m => m.id === updatedMed.id ? updatedMed : m);
    setMedications(updated);
    localStorage.setItem("medicare_medications", JSON.stringify(updated));
  };

  const handleDeleteMedication = (id: string) => {
    const updated = medications.filter(m => m.id !== id);
    setMedications(updated);
    localStorage.setItem("medicare_medications", JSON.stringify(updated));
    // Remove logs too
    const updatedLogs = logs.filter(l => l.medicationId !== id);
    setLogs(updatedLogs);
    localStorage.setItem("medicare_logs", JSON.stringify(updatedLogs));
  };

  const handleLogDose = (medicationId: string, status: 'taken' | 'pending' | 'later') => {
    const existingLogIndex = logs.findIndex(l => l.medicationId === medicationId);
    let updatedLogs = [...logs];

    if (existingLogIndex >= 0) {
      if (status === 'pending') {
        // Delete log if resetting status to pending
        updatedLogs.splice(existingLogIndex, 1);
      } else {
        updatedLogs[existingLogIndex] = {
          ...updatedLogs[existingLogIndex],
          status,
          loggedAt: new Date().toISOString()
        };
      }
    } else {
      updatedLogs.push({
        id: "log-" + Date.now(),
        medicationId,
        time: medications.find(m => m.id === medicationId)?.reminderTime || "08:00 AM",
        date: "2024-06-14",
        status,
        loggedAt: new Date().toISOString()
      });
    }

    setLogs(updatedLogs);
    localStorage.setItem("medicare_logs", JSON.stringify(updatedLogs));

    // Update remaining medication count on taking a dose
    if (status === 'taken') {
      const med = medications.find(m => m.id === medicationId);
      if (med && med.remaining > 0) {
        handleEditMedication({
          ...med,
          remaining: med.remaining - 1
        });
      }
    }
  };

  const selectedMedication = medications.find(m => m.id === selectedMedicationId);

  // Render bottom nav bar on major tabs
  const showNav = ['home', 'schedule', 'assistant', 'profile'].includes(view);

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col relative select-none">
      <AnimatePresence mode="wait">
        {view === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <SplashScreen onEnter={() => setView(user ? 'home' : 'auth')} />
          </motion.div>
        )}

        {view === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <AuthPage onAuthSuccess={handleAuthSuccess} onBack={() => setView('splash')} />
          </motion.div>
        )}

        {view === 'home' && user && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <Dashboard 
              user={user} 
              medications={medications} 
              logs={logs}
              onLogDose={handleLogDose}
              onNavigate={setView}
              onSelectMedication={setSelectedMedicationId}
            />
          </motion.div>
        )}

        {view === 'schedule' && user && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <ScheduleView
              medications={medications}
              logs={logs}
              onLogDose={handleLogDose}
              onSelectMedication={setSelectedMedicationId}
              onNavigate={setView}
            />
          </motion.div>
        )}

        {view === 'assistant' && user && (
          <motion.div
            key="assistant"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <AIHealthAssistant medications={medications} />
          </motion.div>
        )}

        {view === 'profile' && user && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <UserProfile user={user} medications={medications} onLogOut={handleLogOut} />
          </motion.div>
        )}

        {view === 'add' && user && (
          <motion.div
            key="add"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <AddMedicine onAddMedication={handleAddMedication} onBack={() => setView('home')} />
          </motion.div>
        )}

        {view === 'detail' && user && selectedMedication && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            <MedicineDetails 
              medication={selectedMedication} 
              onEditMedication={handleEditMedication}
              onDeleteMedication={handleDeleteMedication}
              onBack={() => setView('home')}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Tab Navigation Bar - strictly visible on major tab screens as per Destination Rule */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe h-20 bg-white shadow-[0px_-4px_20px_rgba(0,0,0,0.03)] border-t border-gray-100">
          {/* Home */}
          <button
            onClick={() => setView('home')}
            className={`flex flex-col items-center justify-center w-16 py-1 rounded-full transition-all ${
              view === 'home'
                ? "text-blue-600 font-bold"
                : "text-gray-400 hover:text-blue-600"
            }`}
          >
            <Home size={22} className={view === 'home' ? "stroke-blue-600" : "stroke-gray-400"} />
            <span className="text-[10px] mt-1">Home</span>
          </button>

          {/* Schedule */}
          <button
            onClick={() => setView('schedule')}
            className={`flex flex-col items-center justify-center w-16 py-1 rounded-full transition-all ${
              view === 'schedule'
                ? "text-blue-600 font-bold"
                : "text-gray-400 hover:text-blue-600"
            }`}
          >
            <Calendar size={22} className={view === 'schedule' ? "stroke-blue-600" : "stroke-gray-400"} />
            <span className="text-[10px] mt-1">Schedule</span>
          </button>

          {/* Assistant */}
          <button
            onClick={() => setView('assistant')}
            className={`flex flex-col items-center justify-center w-16 py-1 rounded-full transition-all ${
              view === 'assistant'
                ? "text-blue-600 font-bold"
                : "text-gray-400 hover:text-blue-600"
            }`}
          >
            <Bot size={22} className={view === 'assistant' ? "stroke-blue-600" : "stroke-gray-400"} />
            <span className="text-[10px] mt-1">Assistant</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => setView('profile')}
            className={`flex flex-col items-center justify-center w-16 py-1 rounded-full transition-all ${
              view === 'profile'
                ? "text-blue-600 font-bold"
                : "text-gray-400 hover:text-blue-600"
            }`}
          >
            <UserIcon size={22} className={view === 'profile' ? "stroke-blue-600" : "stroke-gray-400"} />
            <span className="text-[10px] mt-1">Profile</span>
          </button>
        </nav>
      )}
    </div>
  );
}
