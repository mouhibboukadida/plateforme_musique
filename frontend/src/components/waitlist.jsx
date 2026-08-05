import {useState} from "react";
import {motion} from "framer-motion";
import {button} from "./button";
import axios from "axios";
import {CheckCircle, AleretCircle, Loader2} from "lucide-react";

const [email, setEmail] = useState("");
const [status, setStatus] = useState("idle"); // idle, loading, success, error
const [message,setMessage]=useState("");

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call delay for visual feedback since we don't have a backend
    setTimeout(() => {
      // Mock successful response
      setStatus("success");
      setMessage("You're on the list! Keep an eye on your inbox.");
      setEmail("");
          }, 1500);
  };

  return (
    <section id='waitlist' className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
        <motion.div 
        initial={{opacity: 0, scale: 0.95}}
        
    </section>