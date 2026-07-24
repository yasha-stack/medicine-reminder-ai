import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Share2, Pill, Clock, Utensils, Archive, Bell, Edit, Trash2, Check } from "lucide-react";
import { Medication } from "../types";

interface MedicineDetailsProps {
  medication: Medication;
  onEditMedication: (updated: Medication) => void;
  onDeleteMedication: (id: string) => void;
  onBack: () => void;
}

export default function MedicineDetails({
  medication,
  onEditMedication,
  onDeleteMedication,
  onBack,
}: MedicineDetailsProps) {
  const [notify, setNotify] = useState(medication.refillReminder);
  const [editingStock, setEditingStock] = useState(false);
  const [tempStock, setTempStock] = useState(medication.remaining);

  const percentLeft = Math.round((medication.remaining / medication.total) * 100);

  const handleToggleNotify = () => {
    const updatedNotify = !notify;
    setNotify(updatedNotify);
    onEditMedication({
      ...medication,
      refillReminder: updatedNotify,
    });
  };

  const handleUpdateStock = () => {
    onEditMedication({
      ...medication,
      remaining: tempStock,
    });
    setEditingStock(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${medication.name}?`)) {
      onDeleteMedication(medication.id);
      onBack();
    }
  };

  const handleShare = () => {
    alert(`Medicare AI sharing details: ${medication.name} (${medication.dosage}), scheduled ${medication.reminderTime} ${medication.frequency}.`);
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30] select-none pb-28">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-100 h-16 px-6 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all text-blue-600"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-lg text-blue-800">MediCare AI</h1>
        <button 
          onClick={handleShare}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-all"
        >
          <Share2 size={20} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 px-6 max-w-md mx-auto space-y-6 text-center">
        {/* Medicine Identity Section */}
        <section className="flex flex-col items-center">
          <div className="w-full h-52 rounded-2xl overflow-hidden shadow-sm bg-white relative mb-4 border border-gray-100 flex items-center justify-center p-6">
            <img 
              className="w-full h-full object-contain p-4"
              src={medication.photoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuAk8BHUCIWNKqrEBRzXX2EPkoNqiEhzBcCTc4u1sLtAY9p1fwOpNW6pz8ipCMcp0vGc6FnDo0MHlO1jsH3a6G2f-idTJxGw39lSL8rMxECQsWh6gCCg_X2UfZ3RxJzL9O-NawrEI3fRXjgf3SGgvIbK2GynalmBArDeD0mepj6vjgDTr5dZZNpKsqb6H_bzS7wUQO29RXx8_7mchyDt2SEi_PLUY8Fp_CspkTcnWEDsCD1Cc00TUEqayg"}
              alt={`${medication.name} pill photograph`}
            />
            <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-emerald-200">
              {medication.remaining > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {medication.name}
            </h2>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {medication.category || "General Medication"}
            </p>
          </div>
        </section>

        {/* Dosage & Frequency Quick Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <span className="p-2.5 bg-blue-50 text-blue-600 rounded-xl mb-2">
              <Pill size={22} />
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dosage</span>
            <span className="text-base font-extrabold text-gray-800 mt-0.5">{medication.dosage}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <span className="p-2.5 bg-blue-50 text-blue-600 rounded-xl mb-2">
              <Clock size={22} />
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Frequency</span>
            <span className="text-base font-extrabold text-gray-800 mt-0.5">{medication.frequency}</span>
          </div>
        </section>

        {/* Detailed Info List Card */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left divide-y divide-gray-50">
          {/* Instructions */}
          <div className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Utensils size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Instructions</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{medication.instructions}</p>
            </div>
          </div>

          {/* Remaining progress bar */}
          <div className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Archive size={18} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-1.5">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Remaining</p>
                  {editingStock ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input 
                        type="number"
                        className="w-16 h-8 px-2 border border-gray-300 rounded text-xs font-bold"
                        value={tempStock}
                        onChange={(e) => setTempStock(parseInt(e.target.value) || 0)}
                      />
                      <button 
                        onClick={handleUpdateStock}
                        className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-gray-800 mt-0.5">
                      {medication.remaining}/{medication.total} pills
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${percentLeft <= 20 ? "text-red-500" : "text-blue-600"}`}>
                    {percentLeft}% left
                  </span>
                  {!editingStock && (
                    <button 
                      onClick={() => setEditingStock(true)}
                      className="text-xs text-blue-600 hover:underline font-bold"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${percentLeft <= 20 ? "bg-red-500" : "bg-blue-600"}`}
                  style={{ width: `${percentLeft}%` }}
                />
              </div>
            </div>
          </div>

          {/* Refill toggle reminder */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Bell size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Refill Reminder</p>
                <p className="text-sm font-bold text-gray-800 mt-0.5">Notify at {medication.refillThreshold} pills left</p>
              </div>
            </div>
            {/* Custom slider checkbox switch matching design */}
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input 
                checked={notify} 
                onChange={handleToggleNotify}
                className="sr-only peer" 
                type="checkbox"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-col gap-3">
          <button 
            onClick={() => {
              const newName = prompt("Enter new medicine name:", medication.name);
              if (newName) {
                onEditMedication({
                  ...medication,
                  name: newName,
                });
              }
            }}
            className="w-full h-14 bg-blue-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Edit size={18} />
            Edit Medication Name
          </button>
          <button 
            onClick={handleDelete}
            className="w-full h-14 bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </section>
      </main>
    </div>
  );
}
