import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        const trimmed = name.trim();
        if (!trimmed) return;
        localStorage.setItem('verbPracticeUserName', trimmed);
        onComplete(trimmed);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="text-6xl mb-6"
                >
                    🎯
                </motion.div>

                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2">
                    Verb Practice App
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm sm:text-base">
                    Practicá verbos en inglés y desafiá a tus amigos
                </p>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
                        ¿Cómo te llamás?
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Lo usaremos cuando compartas tu racha
                    </p>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        maxLength={30}
                        placeholder="Tu nombre..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 text-base font-medium focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-all mb-4"
                    />

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={!name.trim()}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        ¡Empezar a practicar!
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </div>

                <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
                    Podés cambiarlo después desde Settings
                </p>
            </motion.div>
        </div>
    );
};

export default Onboarding;