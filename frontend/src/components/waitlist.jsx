import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import axios from "axios";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setMessage("You're on the list! Keep an eye on your inbox.");
      setEmail("");
       }, 1500);
  };

  return (
    <section id="waitlist" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-panel p-10 md:p-16 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative blur */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/20 blur-[100px] pointer-events-none"></div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">Secure Your Spot</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Spots for the early beta are limited. Join the waitlist today to guarantee your access when we launch.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto flex flex-col gap-4">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={status === "loading" || status === "success"}
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
              />
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              disabled={status === "loading" || status === "success"}
              className="w-full py-4 text-lg"
            >
              {status === "loading" ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Join Waitlist"
              )}
            </Button>

            {/* Status Messages */}
            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-accent mt-4 bg-accent/10 py-3 rounded-full border border-accent/20"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{message}</span>
              </motion.div>
            )}
            
            {status === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-red-400 mt-4 bg-red-400/10 py-3 rounded-full border border-red-400/20"
              >
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{message}</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};
