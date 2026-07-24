import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, ArrowRight, Shield, CheckCircle } from "lucide-react";
import { User as UserType } from "../types";

interface AuthPageProps {
  onAuthSuccess: (user: UserType) => void;
  onBack: () => void;
}

export default function AuthPage({ onAuthSuccess, onBack }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isSignUp && !agreeTerms) {
      setError("You must agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setLoading(true);

    // Mock Authentication delay
    setTimeout(() => {
      setLoading(false);
      const mockUser: UserType = {
        id: "usr-" + Math.random().toString(36).substring(2, 9),
        name: isSignUp ? name || "New User" : "John Doe",
        email: email,
        isPremium: true,
        avatarUrl: isSignUp 
          ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDPZTuyJ_nWOqVqfmqOOjqFx-PuvOQZJlUevHbE1RC-ESo0VYhCYpnMmOx4teKmoCQFmG-csoq2iJZOYJZMJ0n3Qw8SZt8lpaWzanF7bFr5osM0yt_TTIhg7XJt1E418A99ZyZckCWJcOzKp1XR8nWOV2pBw4wnO2MX1rEhvJ-CxZ8yOnlT2hrPxweO2TbzgrVXSib2n_qegPWRycZa8wPsJ2RXpAufrlgYCARJLSSHJVhwr-u9d5K1vA"
          : "https://lh3.googleusercontent.com/aida-public/AB6AXuBw1NA_YPAAYhHeNzEOW1GwejWMhPH1TLHt5mduKJVEhSrYGn9O3SUOlbRtVoowBWq3rrnaPTl6dACqYSux92_l7sBN0o5oFUMMLSG6Sym_BoXXmkMM1vhITceMfx9dNnX7wY2B-C7RRFYhUxHsjjm3e1viu8HUuYIZZf6sP0wMa1RHN4OWATaoioQk9txmasWeHlRzd1BgAYcOz6VoqEyC6mN50e_iwdEh_-qCn6TOoAcbxKVU4Dqa7Q",
        memberId: "8829-XJ"
      };
      onAuthSuccess(mockUser);
    }, 1200);
  };

  const handleSocialAuth = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const mockUser: UserType = {
        id: "usr-social",
        name: "John Doe",
        email: "john.doe@gmail.com",
        isPremium: true,
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPZTuyJ_nWOqVqfmqOOjqFx-PuvOQZJlUevHbE1RC-ESo0VYhCYpnMmOx4teKmoCQFmG-csoq2iJZOYJZMJ0n3Qw8SZt8lpaWzanF7bFr5osM0yt_TTIhg7XJt1E418A99ZyZckCWJcOzKp1XR8nWOV2pBw4wnO2MX1rEhvJ-CxZ8yOnlT2hrPxweO2TbzgrVXSib2n_qegPWRycZa8wPsJ2RXpAufrlgYCARJLSSHJVhwr-u9d5K1vA",
        memberId: "8829-XJ"
      };
      onAuthSuccess(mockUser);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col justify-between relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-emerald-600/10 blur-[100px] -z-10" />

      {/* Header */}
      <header className="h-16 px-6 flex items-center justify-between z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-blue-600 rounded-lg text-white">
            <Shield size={20} />
          </span>
          <span className="font-bold text-lg text-blue-800 tracking-tight">MediCare AI</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-gray-500 font-medium hover:text-blue-600 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 z-10">
        <div className="w-full max-w-md">
          {/* Hero Branding Illustration for Login */}
          <AnimatePresence mode="wait">
            {!isSignUp && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-44 mb-6 rounded-2xl overflow-hidden bg-blue-100/50 border border-blue-200/40 relative flex items-center justify-center p-4 shadow-sm"
              >
                <img 
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBom1aLGqvRJNidd4kIvDjO_wTzT1tzS5IoF7xzkwSUCHlowkkQCxDnkgewqHZ_4UAUQv11b1P3ggEUYimzU42sXM71fPZeUNnyf-7OCj-_bWVmlITl0UZLWpYtNb8HdHEhBxfjPVXa1BJVtNbY07vdFxulwbibKOF3GylHDyijZ_lm_izG7wATsw1sRc_Jhi9EKCP9PNLE8m7-YKaNV0YADbGPlvCTg6Ujgm2Lex578M2OHxmXrC7OIQ"
                  alt="Clinical AI support vector visual illustration"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {isSignUp ? "Join Us" : "Welcome Back"}
            </h1>
            <p className="text-sm text-gray-500 mt-1.5 px-4 leading-relaxed">
              {isSignUp 
                ? "Start your journey towards intelligent health management and empathetic care today."
                : "Precision health management powered by intelligent care."}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <AnimatePresence initial={false}>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1.5"
                  >
                    <label className="text-xs font-semibold text-gray-500 block ml-1" htmlFor="full_name">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <User size={18} />
                      </span>
                      <input 
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm transition-all outline-none"
                        id="full_name"
                        placeholder="John Doe"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 block ml-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </span>
                  <input 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm transition-all outline-none"
                    id="email"
                    placeholder="yourname@healthcare.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-semibold text-gray-500" htmlFor="password">
                    Password
                  </label>
                  {!isSignUp && (
                    <button 
                      type="button"
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => alert("Password reset link has been simulated & sent to your email!")}
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input 
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm transition-all outline-none"
                    id="password"
                    placeholder="Min. 8 characters"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Sign Up terms checkbox */}
              {isSignUp && (
                <div className="flex items-start gap-3 py-1">
                  <input 
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-200 transition-all cursor-pointer"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <label htmlFor="terms" className="text-xs text-gray-500 leading-normal cursor-pointer select-none">
                    I agree to the <span className="text-blue-600 hover:underline">Terms of Service</span> and <span className="text-blue-600 hover:underline">Privacy Policy</span>.
                  </label>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:bg-emerald-300"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  <>
                    <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400 font-semibold tracking-wider text-[10px]">
                  Or {isSignUp ? "sign up" : "continue"} with
                </span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleSocialAuth("Google")}
                className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 hover:border-blue-200 rounded-xl text-sm font-medium hover:bg-blue-50/20 text-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button 
                onClick={() => handleSocialAuth("Facebook")}
                className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 hover:border-blue-200 rounded-xl text-sm font-medium hover:bg-blue-50/20 text-gray-700 transition-colors"
              >
                <span className="font-semibold text-blue-600 text-sm">f</span>
                Facebook
              </button>
            </div>
          </div>

          {/* Switch state prompt */}
          <p className="text-center mt-6 text-sm text-gray-500">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 font-bold hover:underline"
            >
              {isSignUp ? "Log In" : "Create an Account"}
            </button>
          </p>
        </div>
      </main>

      {/* Security Footer */}
      <footer className="py-6 text-center border-t border-gray-100 bg-white/50">
        <div className="flex items-center justify-center gap-4 text-gray-400 font-medium">
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle size={14} className="text-emerald-500" />
            HIPAA Compliant
          </div>
          <div className="w-px h-3 bg-gray-200" />
          <div className="flex items-center gap-1 text-xs">
            <Shield size={14} className="text-blue-500" />
            AES-256 Encryption
          </div>
        </div>
      </footer>
    </div>
  );
}
