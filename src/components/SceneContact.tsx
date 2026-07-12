import React, { useState } from "react";
import { motion } from "motion/react";
import { sound } from "../utils/audio";
import { Send, CheckCircle2, AlertCircle, RefreshCw, SendHorizontal, Mail, MapPin, Linkedin, Github, Phone, Globe } from "lucide-react";

interface SceneContactProps {
  onSendMessage: () => void;
}

export default function SceneContact({ onSendMessage }: SceneContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [txState, setTxState] = useState<"IDLE" | "TRANSMITTING" | "SUCCESS" | "ERROR">("IDLE");
  const [statusLog, setStatusLog] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      sound.error();
      setTxState("ERROR");
      setStatusLog("Error: Mandatory parameters missing. Please define SENDER_NAME, SENDER_EMAIL, and payload message.");
      return;
    }

    sound.transmit();
    setTxState("TRANSMITTING");
    setStatusLog("ESTABLISHING SECURE GATEWAY CHANNEL...");

    // Stage 1
    setTimeout(() => {
      sound.click();
      setStatusLog("UPLINK COMPATIBLE. ENCRYPTING MESSAGE PACKETS...");
    }, 1000);

    // Stage 2
    setTimeout(() => {
      sound.transmit();
      setStatusLog("UPLINK SYNCHRONIZED. DISPATCHING CHRONICLE TRANSMISSION...");
    }, 2000);

    // Stage 3: Success
    setTimeout(() => {
      sound.achievement();
      setTxState("SUCCESS");
      setStatusLog("TRANSMISSION COMPLETED SUCCESSFULLY. CORE PERSISTENCE LOGGED.");
      onSendMessage(); // Unlock badge
    }, 3200);
  };

  const resetForm = () => {
    sound.click();
    setFormData({ name: "", email: "", message: "" });
    setTxState("IDLE");
    setStatusLog("");
  };

  return (
    <div className="relative min-h-screen pt-28 pb-32 flex flex-col justify-center px-4 overflow-hidden">
      {/* Immersive Space Portal Radial Core */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,78,120,0.18),rgba(2,6,23,0.95))] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,116,144,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,116,144,0.05)_1px,transparent_1px)] bg-[size:36px_36px] z-0 opacity-15" />

      {/* Rotating portal background pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-cyan-500/10 border-dashed animate-[spin_40s_linear_infinite] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border-2 border-cyan-500/5 border-dashed animate-[spin_20s_linear_infinite_reverse] pointer-events-none z-0" />

      <div className="relative max-w-6xl w-full mx-auto z-10 flex flex-col gap-6">
        
        {/* Stage Header */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/10 mb-2">
            <Send className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-cyan-400 tracking-wider font-semibold uppercase">LEVEL 5: PORTAL TERMINAL</span>
          </div>
          <h2 className="font-orbitron text-2xl md:text-3xl font-black text-white">THE TRANSMISSION PORTAL</h2>
          <p className="text-slate-400 font-sans text-sm max-w-xl">
            Transmit a direct communication payload across the ether to connect with me. Clear this final level to secure the final achievement check.
          </p>
        </div>

        {/* Dual Column: Core Portal UI & Social Connections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Social Details Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Contact Card */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex-1 flex flex-col justify-between">
              <div>
                <span className="font-orbitron text-xs text-yellow-500 font-bold block mb-4">ANCHOR LOCATION</span>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 block uppercase font-bold">Base Location</span>
                      <span className="text-xs text-slate-200">Buenavista, Zamboanga City, PH</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 block uppercase font-bold">Mail Address</span>
                      <span className="text-xs text-slate-200 truncate">oriasjunerey23@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 block uppercase font-bold">Secure Hotline</span>
                      <span className="text-xs text-slate-200">09622419220</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 block uppercase font-bold">Vercel Core Portal</span>
                      <a href="https://orias-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline">orias-dev.vercel.app</a>
                    </div>
                  </div>
                </div>x
              </div>

              {/* Social Portals */}
              <div className="mt-8 pt-4 border-t border-slate-900">
                <span className="font-orbitron text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-3.5">
                  EXTERNAL SECURE PORTALS
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://github.com/ReiRoko-jutsu"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="flex items-center gap-2 border border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-slate-700 p-2.5 rounded-xl text-slate-300 font-mono text-xs transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>GITHUB_NET</span>
                  </a>

                  <a
                    href="https://orias-dev.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="flex items-center gap-2 border border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-slate-700 p-2.5 rounded-xl text-slate-300 font-mono text-xs transition-all cursor-pointer"
                  >
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>PORTFOLIO_NET</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Glowing Graphic Portal ring indicator */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden h-44">
              <div className={`absolute w-24 h-24 rounded-full border-2 border-dashed border-cyan-500/25 ${txState === "TRANSMITTING" ? 'animate-spin border-cyan-400' : 'animate-[spin_20s_linear_infinite]'}`} />
              <div className={`absolute w-16 h-16 rounded-full border border-cyan-400/40 ${txState === "TRANSMITTING" ? 'scale-110 opacity-70' : ''} transition-all duration-300 flex items-center justify-center bg-cyan-950/10`} />
              
              <span className="relative font-orbitron font-black text-xs text-cyan-400 tracking-wider mt-1 text-center">
                {txState === "IDLE" ? "PORTAL_STANDBY" : txState === "TRANSMITTING" ? "LINK_ACTIVE" : txState === "SUCCESS" ? "UPLINK_SECURE" : "TERMINAL_ALERT"}
              </span>
            </div>

          </div>

          {/* Form Transmission Terminal */}
          <div className="lg:col-span-8 bg-slate-950/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md relative flex flex-col justify-between">
            {/* Corner Bracket Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-700" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-700" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-700" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-700" />

            {txState === "SUCCESS" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-orbitron text-xl font-bold text-white mb-2">UPLINK TRANSMITTED</h3>
                <p className="text-slate-400 font-sans text-xs max-w-sm mb-6 leading-relaxed">
                  Your communication dispatch was logged successfully. The achievement reward milestone has been secured!
                </p>
                
                <button
                  onClick={resetForm}
                  className="flex items-center gap-1.5 border border-slate-800 bg-slate-900/40 hover:bg-slate-900 text-slate-300 font-mono text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>TRANSMIT ANOTHER DISPATCH</span>
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleTransmit} className="space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <span className="font-orbitron text-xs text-cyan-400 font-bold block">DISPATCH MATRIX INPUTS</span>

                  {/* Sender Name */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                      SENDER_NAME:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Commander Shepard"
                      disabled={txState === "TRANSMITTING"}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-500/50 rounded-xl p-3 text-sm text-slate-200 outline-none transition-colors font-mono placeholder:text-slate-700"
                    />
                  </div>

                  {/* Sender Email */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                      SENDER_EMAIL:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. shepard@alliance.org"
                      disabled={txState === "TRANSMITTING"}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-500/50 rounded-xl p-3 text-sm text-slate-200 outline-none transition-colors font-mono placeholder:text-slate-700"
                    />
                  </div>

                  {/* Message Payload */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                      TRANSMISSION_PAYLOAD (MESSAGE):
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Draft your communication packet here..."
                      rows={4}
                      disabled={txState === "TRANSMITTING"}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-500/50 rounded-xl p-3 text-sm text-slate-200 outline-none transition-colors font-mono placeholder:text-slate-700 resize-none"
                    />
                  </div>
                </div>

                {/* Submitting Logs and Action */}
                <div className="mt-6 pt-4 border-t border-slate-900 space-y-3.5">
                  {statusLog && (
                    <div className={`flex items-start gap-2 p-3 rounded-xl font-mono text-xs ${txState === "ERROR" ? 'bg-red-950/10 border border-red-900/40 text-red-400' : 'bg-slate-950 border border-slate-900 text-slate-400'}`}>
                      {txState === "ERROR" ? (
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 animate-ping" />
                      )}
                      <span>{statusLog}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={txState === "TRANSMITTING"}
                    className={`w-full group relative flex items-center justify-center gap-2 font-orbitron font-bold text-xs p-3.5 rounded-xl transition-all duration-200 cursor-pointer clickable ${
                      txState === "TRANSMITTING"
                        ? "bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:scale-[1.01]"
                    }`}
                  >
                    <SendHorizontal className="w-4 h-4" />
                    <span>
                      {txState === "TRANSMITTING" ? "DISPATCHING CHRONICLE..." : "TRANSMIT DISPATCH GATEWAY (+100 XP)"}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
