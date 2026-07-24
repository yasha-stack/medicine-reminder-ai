import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bell, Plus, Mic, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { ChatMessage, Medication } from "../types";

interface AIHealthAssistantProps {
  medications: Medication[];
}

export default function AIHealthAssistant({ medications }: AIHealthAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "assistant",
      text: "Good morning! I noticed your prescription for Vitamin D is running low. Based on your current dosage, you have about 4 days left. Would you like me to set a refill reminder for your Vitamin D or contact your pharmacy directly?",
      timestamp: "10:24 AM",
    },
    {
      id: "msg-2",
      sender: "user",
      text: "Yes, please set a refill reminder for tomorrow morning at 9:00 AM. Also, can you check if my insurance covers the new brand?",
      timestamp: "10:25 AM",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: "msg-user-" + Date.now(),
      sender: "user",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          medicationContext: medications,
        }),
      });

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: "msg-ai-" + Date.now(),
        sender: "assistant",
        text: data.reply || "I didn't receive a reply from my server. Please try again in a few moments.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Assistant chat error:", err);
      const errorMessage: ChatMessage = {
        id: "msg-error-" + Date.now(),
        sender: "assistant",
        text: "I ran into a server communication error. Please ensure the Express backend is running and that your GEMINI_API_KEY is configured in the Secrets menu if you are using production modes.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-[#0b1c30] select-none pb-36">
      {/* Top Bar matching screenshot */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-100 h-16 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1l8y3Kld44Fkn9n3QjE0WQeSVUewfpz_MTKv8-UcFC4bb6EYPHnt2kf4SCv2qA8wxbdDZeFUJ_ticVVENJMi2K328mWBXJ3G6mAak9bfBVR-nAge3NUKRcg9rulLYCBztZSVjuiSRrf5ejwy3rfz9WtHVPXx-HNnUrwFoHs88PgEO9kSEuVvKfUyvBHBYOgcKEIm96HLfOO5ab3IqmcjmY0heST_QwzdDRQRK4KuzQy4kiOZ5uvICCA"
              alt="Clinical advisor assistant avatar"
            />
          </div>
          <h1 className="font-extrabold text-base text-blue-800">AI Health Assistant</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-blue-600 transition-all">
          <Bell size={20} />
        </button>
      </header>

      {/* Chat Messages Log */}
      <main className="pt-20 px-6 max-w-md mx-auto flex flex-col justify-end space-y-4">
        {/* Date Indicator Bubble */}
        <div className="flex justify-center my-2">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-wider border border-blue-100">
            Today
          </span>
        </div>

        {/* Message Thread */}
        <div className="space-y-4">
          {messages.map((msg) => {
            const isAI = msg.sender === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${isAI ? "items-start text-left" : "items-end text-right self-end ml-auto"}`}
              >
                {/* Meta details */}
                <div className={`flex items-center gap-1.5 mb-1 px-1 text-[10px] font-extrabold uppercase tracking-wider ${isAI ? "text-blue-600" : "text-gray-400"}`}>
                  <span>{isAI ? "MediCare AI" : "You"}</span>
                  <span className="text-[8px] font-normal text-gray-300">&bull;</span>
                  <span className="text-[9px] font-medium text-gray-400">{msg.timestamp}</span>
                </div>
                
                {/* Message bubble */}
                <div
                  className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    isAI
                      ? "bg-white text-gray-800 border border-gray-100 rounded-tl-sm"
                      : "bg-blue-600 text-white rounded-tr-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {/* Thinking Indicator */}
          {loading && (
            <div className="flex items-center gap-2 max-w-[80%] pt-2 self-start text-left">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest animate-pulse flex items-center gap-1">
                <Sparkles size={12} className="animate-spin" />
                AI is analyzing clinical context...
              </span>
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Floating Action / Input Bar exactly matching screenshot */}
      <div className="fixed bottom-20 left-0 w-full px-6 pb-4 bg-transparent z-30">
        <form 
          onSubmit={handleSend}
          className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-2 flex items-center gap-1"
        >
          <button 
            type="button"
            onClick={() => alert("Simulation: You can add health files or lab results as attachments!")}
            className="w-11 h-11 flex items-center justify-center rounded-full text-blue-600 hover:bg-gray-50 transition-all flex-shrink-0"
          >
            <Plus size={20} />
          </button>
          
          <input 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-900 py-2 px-2 outline-none" 
            placeholder="Ask about medications, side effects..." 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button 
            type="button"
            onClick={() => alert("Simulation: Speak now... Listening for medication query!")}
            className="w-11 h-11 flex items-center justify-center rounded-full text-blue-600 hover:bg-gray-50 transition-all flex-shrink-0"
          >
            <Mic size={20} />
          </button>

          <button 
            type="submit"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95 transition-all flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
