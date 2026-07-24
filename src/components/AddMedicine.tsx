import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Save, Sparkles, Upload, Clock, Info, Check, Image as ImageIcon } from "lucide-react";
import { Medication } from "../types";

interface AddMedicineProps {
  onAddMedication: (medication: Omit<Medication, 'id' | 'createdAt'>) => void;
  onBack: () => void;
}

export default function AddMedicine({ onAddMedication, onBack }: AddMedicineProps) {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [reminderTime, setReminderTime] = useState("08:00");
  const [instructions, setInstructions] = useState("Take with food");
  const [total, setTotal] = useState(30);
  const [refillReminder, setRefillReminder] = useState(true);
  const [refillThreshold, setRefillThreshold] = useState(5);
  const [category, setCategory] = useState("Cardiovascular");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [photoName, setPhotoName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage) {
      alert("Please fill in the Medicine Name and Dosage.");
      return;
    }

    setSaving(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      onAddMedication({
        name,
        dosage,
        frequency,
        reminderTime,
        instructions,
        remaining: total,
        total,
        refillReminder,
        refillThreshold,
        category,
        photoUrl: photoName ? "https://lh3.googleusercontent.com/aida-public/AB6AXuAk8BHUCIWNKqrEBRzXX2EPkoNqiEhzBcCTc4u1sLtAY9p1fwOpNW6pz8ipCMcp0vGc6FnDo0MHlO1jsH3a6G2f-idTJxGw39lSL8rMxECQsWh6gCCg_X2UfZ3RxJzL9O-NawrEI3fRXjgf3SGgvIbK2GynalmBArDeD0mepj6vjgDTr5dZZNpKsqb6H_bzS7wUQO29RXx8_7mchyDt2SEi_PLUY8Fp_CspkTcnWEDsCD1Cc00TUEqayg" : undefined
      });

      setTimeout(() => {
        onBack();
      }, 500);
    }, 1200);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30] select-none pb-28">
      {/* Top Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-100 h-16 px-6 flex justify-between items-center">
        <button 
          onClick={onBack}
          aria-label="Go back" 
          className="w-10 h-10 flex items-center justify-center rounded-full text-blue-600 hover:bg-gray-100 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-lg text-gray-900">Add Medicine</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Main Content Form */}
      <main className="pt-20 px-6 max-w-md mx-auto">
        <div className="space-y-6">
          {/* Hero Illustration / Visual Guide matching screenshot */}
          <div className="relative overflow-hidden rounded-2xl h-44 bg-blue-50 border border-blue-100 flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqTG-ujJznZ3Moklfe2fXPYnuefRPfetJRkj04tMpVPpwL-mV0v3KT-1ij2L-7HJhK4xd5tBb3Oj6AL_Off7ZhZ3I-gA1lCyvPfB9IkZc0LrKY2qcYTnqCZkihlKc3A0MdLXM7mP6Jkiuib8Uh2ybPe0aCkGXe2rk9NYOvzWF2f25ZxVGu-maGOSnrmJR6I9tOi-d5Fyq4I9zWvLpyuUYU6OetP14VFPtCrFVSZHbOsKHFefy8KnjfVQ')` }} />
            <div className="z-10 text-center space-y-1">
              <span className="p-2.5 bg-blue-100 text-blue-600 rounded-xl inline-block mb-1.5 shadow-sm">
                <Sparkles size={24} className="animate-pulse" />
              </span>
              <p className="font-bold text-sm text-blue-900">Add Medication</p>
              <p className="text-xs text-blue-700/80 max-w-[260px] mx-auto">Keep your medication schedule accurate with AI assistance.</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Medicine Name Section */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 block ml-1" htmlFor="medicine_name">
                Medicine Name
              </label>
              <input 
                className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                id="medicine_name" 
                placeholder="e.g. Lisinopril" 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Dosage & Frequency Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 block ml-1" htmlFor="dosage">
                  Dosage
                </label>
                <select 
                  className="w-full h-14 px-3 rounded-xl border border-gray-200 bg-white text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none cursor-pointer"
                  id="dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  required
                >
                  <option value="">Select Dose</option>
                  <option value="5mg">5 mg</option>
                  <option value="10mg">10 mg</option>
                  <option value="20mg">20 mg</option>
                  <option value="50mg">50 mg</option>
                  <option value="100mg">100 mg</option>
                  <option value="500mg">500 mg</option>
                  <option value="1 capsule">1 Capsule</option>
                  <option value="1 tablet">1 Tablet</option>
                  <option value="2 tablets">2 Tablets</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 block ml-1" htmlFor="frequency">
                  Frequency
                </label>
                <select 
                  className="w-full h-14 px-3 rounded-xl border border-gray-200 bg-white text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none cursor-pointer"
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <option value="Daily">Daily</option>
                  <option value="Twice Daily">Twice Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="As Needed">As Needed</option>
                </select>
              </div>
            </div>

            {/* Time Picker & Instructions Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 block ml-1" htmlFor="reminder_time">
                  Reminder Time
                </label>
                <div className="relative">
                  <input 
                    className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    id="reminder_time"
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Clock size={18} />
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 block ml-1" htmlFor="category">
                  Category
                </label>
                <select 
                  className="w-full h-14 px-3 rounded-xl border border-gray-200 bg-white text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none cursor-pointer"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Vitamin">Vitamin</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Anti-Diabetic">Anti-Diabetic</option>
                  <option value="Analgesic">Analgesic</option>
                  <option value="Supplements">Supplements</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 block ml-1" htmlFor="instructions">
                  Instructions
                </label>
                <select 
                  className="w-full h-14 px-3 rounded-xl border border-gray-200 bg-white text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none cursor-pointer"
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                >
                  <option value="Take with food">Take with food</option>
                  <option value="Before breakfast">Before breakfast</option>
                  <option value="After lunch">After lunch</option>
                  <option value="Before bed">Before bed</option>
                  <option value="On empty stomach">On empty stomach</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 block ml-1" htmlFor="total_stock">
                  Total Stock Count
                </label>
                <input 
                  className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-base text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  id="total_stock"
                  type="number"
                  min="1"
                  value={total}
                  onChange={(e) => setTotal(parseInt(e.target.value) || 30)}
                />
              </div>
            </div>

            {/* Upload Photo Section */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-gray-500 block ml-1">Identification Photo (Optional)</p>
              <div 
                onClick={handleFileUploadClick}
                className={`w-full min-h-[120px] rounded-2xl border-2 border-dashed bg-white flex flex-col items-center justify-center p-4 cursor-pointer transition-all ${
                  photoName ? "border-emerald-500 bg-emerald-50/10" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/5"
                }`}
              >
                {photoName ? (
                  <>
                    <span className="p-2 bg-emerald-100 text-emerald-600 rounded-full mb-1.5">
                      <Check size={20} />
                    </span>
                    <p className="text-xs font-bold text-gray-800">{photoName}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Click to change photo</p>
                  </>
                ) : (
                  <>
                    <span className="p-2 bg-blue-50 text-blue-600 rounded-full mb-1.5">
                      <Upload size={20} />
                    </span>
                    <p className="text-xs font-bold text-gray-800">Upload Photo of pill or bottle</p>
                    <p className="text-[10px] text-gray-400 text-center mt-1">Helps the AI identify your medication</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Guidance Note */}
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100/50 flex items-start gap-3 text-left">
              <Info className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
              <p className="text-xs text-blue-800/80 leading-normal">
                MediCare AI will send you a notification 15 minutes before your scheduled dose time.
              </p>
            </div>

            {/* Bottom Action Area */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={saving || saved}
                className="w-full h-14 bg-blue-600 text-white hover:bg-blue-700 active:scale-95 text-base font-bold rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving Medication...
                  </span>
                ) : saved ? (
                  <>
                    <Check size={20} />
                    <span>Saved Successfully</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Save Medication</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
