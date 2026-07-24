import { motion } from "motion/react";
import { Activity, ShieldCheck, HeartPulse, FileText, Stethoscope } from "lucide-react";

interface SplashScreenProps {
  onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  return (
    <div className="relative min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col items-center justify-between overflow-hidden p-6 select-none">
      {/* Ambient Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-md w-full text-center">
        {/* Animated Icon Container */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Decorative Pulse Rings */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 0.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute w-24 h-24 bg-blue-600/20 rounded-full"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0.4 }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.1, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeInOut" }}
            className="absolute w-32 h-32 bg-blue-600/10 rounded-full"
          />
          
          {/* Core Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-20 h-20 bg-blue-600 text-white flex items-center justify-center rounded-2xl shadow-lg ring-4 ring-white/50 z-20 cursor-pointer"
            onClick={onEnter}
          >
            <HeartPulse size={44} className="animate-pulse" />
          </motion.div>
        </div>

        {/* Brand Identity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold tracking-tight text-blue-800">
            MediCare AI
          </h1>
          <p className="text-base text-gray-500 max-w-[280px] mx-auto leading-relaxed">
            Your AI-Powered Health Companion.
          </p>
        </motion.div>

        {/* System Status / Loading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 w-48 flex flex-col items-center"
        >
          <div className="h-1 w-full bg-blue-100 rounded-full overflow-hidden relative">
            <motion.div
              animate={{ left: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="h-full bg-blue-600 w-1/2 rounded-full absolute"
            />
          </div>
          <span className="inline-block mt-4 text-[11px] font-semibold text-gray-400 tracking-widest uppercase">
            Synchronizing Secure Data
          </span>
        </motion.div>

        {/* Enter Button overlay */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onEnter}
          className="mt-12 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full text-sm shadow-md active:scale-95 transition-all"
        >
          Get Started
        </motion.button>

        {/* Decorative bento indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 grid grid-cols-2 gap-4"
        >
          <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-center gap-2">
            <ShieldCheck size={18} className="text-blue-600" />
            <div className="h-1.5 w-12 bg-blue-200 rounded-full" />
          </div>
          <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-center gap-2">
            <Activity size={18} className="text-emerald-600" />
            <div className="h-1.5 w-12 bg-blue-200 rounded-full" />
          </div>
        </motion.div>
      </main>

      {/* Footer Branding */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="w-full text-center py-4 z-10"
      >
        <div className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">TRUSTED BY</span>
          <div className="flex gap-4 text-gray-500">
            <FileText size={20} />
            <Stethoscope size={20} />
            <ShieldCheck size={20} />
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-400 font-medium">
          Secure Encryption Active • HIPAA Compliant
        </p>
      </motion.footer>
    </div>
  );
}
