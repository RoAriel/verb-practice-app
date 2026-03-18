import { motion } from 'framer-motion';
import { Flame, Star, Target, BookOpen, Play } from 'lucide-react';

const ShareWelcome = ({ sharedStats, onPlay }) => {
    const { streak, bestStreak, accuracy, total } = sharedStats;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
            >
                {/* Card principal */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 shadow-2xl text-white mb-4">

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">
                            Verb Practice App
                        </div>
                        <div className="text-lg font-bold opacity-90">
                            ¡Alguien te desafió!
                        </div>
                    </div>

                    {/* Streak principal */}
                    <div className="text-center mb-6">
                        <div className="text-xs font-semibold uppercase tracking-widest opacity-65 mb-1">
                            Racha actual
                        </div>
                        <div className="text-8xl font-extrabold leading-none text-yellow-300">
                            {streak}
                        </div>
                        <div className="text-sm opacity-70 mt-1">
                            correctas seguidas
                        </div>
                    </div>

                    {/* Stats secundarias */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-white/10 rounded-2xl p-3 text-center">
                            <Star className="w-4 h-4 mx-auto mb-1 opacity-80" />
                            <div className="text-xl font-bold">{bestStreak}</div>
                            <div className="text-xs opacity-65 mt-0.5">Mejor racha</div>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-3 text-center">
                            <Target className="w-4 h-4 mx-auto mb-1 opacity-80" />
                            <div className="text-xl font-bold">{accuracy}%</div>
                            <div className="text-xs opacity-65 mt-0.5">Precisión</div>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-3 text-center">
                            <BookOpen className="w-4 h-4 mx-auto mb-1 opacity-80" />
                            <div className="text-xl font-bold">{total}</div>
                            <div className="text-xs opacity-65 mt-0.5">Verbos</div>
                        </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onPlay}
                        className="w-full bg-white text-indigo-700 font-bold text-lg py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all hover:bg-indigo-50"
                    >
                        <Play className="w-5 h-5" />
                        ¡Jugar ahora!
                    </motion.button>
                </div>

                {/* Subtexto */}
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    Practicá verbos en inglés y superá esta racha
                </p>
            </motion.div>
        </div>
    );
};

export default ShareWelcome;