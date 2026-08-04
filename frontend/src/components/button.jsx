import {motion} from 'framer-motion';
export  const Button = ({ children, variant = "primary", className = "", ...props }) => {
    const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-primary text-white hover:bg-opacity-90 shadow-[0_0_15px_rgba(108,99,255,0.5)] hover:shadow-[0_0_25px_rgba(108,99,255,0.7)]",
        secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10",
        outline:  "border border-primary text-primary hover:bg-primary/10",
    };
    return (
        <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseStyle} ${variants[variant]} ${className}`}
        {...props}
        >
            {children}
        </motion.button>
    );
}