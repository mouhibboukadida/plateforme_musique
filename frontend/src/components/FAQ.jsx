import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ChevronDown} from "lucide-react";

const faqs=[
    {
        question: "When will the platform launch?",
        answer: "We are currently in private beta and plan to roll out public access in early 2025. Joining the waitlist ensures you get priority access as soon as we open up more spots."
    },
    {
        question:  "Is joining free?",
        answer: "Yes! Joining the waitlist is 100% free. Early adopters will also receive exclusive perks and discounted pricing when the platform officially launches."
    },
    {
        question: "Can I leave the waitlist?",
        answer: "Of course. You can unsubscribe from our emails at any time, which will automatically remove you from the waitlist."
    },
    {
        question: "Will there be AI features?",
        answer:  "Yes, we are integrating cutting-edge AI tools designed specifically for music production, including stem separation, intelligent EQ suggestions, and mastering assistants."
    }
];

const[openIndex, setOpenIndex] = useState(null);
return (
    <section id="faq" className="py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className=" text-gray-400">Have questions? We've got answers. If you can't find what you're looking for, feel free to reach out to our support team.</p>
            </div>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="glass-panel rounded-2xl overflow-hidden">
                        <button
                            className="w-full flex justify-between items-center p-6 text-left"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            aria-expanded={openIndex === index}
                        >
                            <span className="font-medium text-lg">{faq.question}</span>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-primary" : ''}
                                `}
                            />
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}>
                                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">{faq.answer}</div>
                                    </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    </section>
);