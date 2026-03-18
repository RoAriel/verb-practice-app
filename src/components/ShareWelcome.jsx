import { motion } from 'framer-motion';
import { Star, Target, BookOpen, Play, ShieldAlert } from 'lucide-react';
import { signParams } from '../hooks/useVerbPractice';

const ShareWelcome = ({ sharedStats, onPlay }) => {
    const { streak, bestStreak, accuracy, total, from, sig } = sharedStats;

    // Verificar que el link no fue alterado
    const expectedSig = signParams(streak, bestStreak, accuracy, total, from);
    const isValid = sig === expectedSig;

    if (!isValid) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-sm text-center"
                >
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border-2 border-orange-200 dark:border-orange-700">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="mb-4"
                        >
                            <ShieldAlert className="w-16 h-16 text-orange-500 mx-auto" />
                        </motion.div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                            Este link fue alterado
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                            Los resultados de este desafío no son válidos. Pedile a tu amigo que comparta su racha de nuevo desde la app.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onPlay}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-2xl"
                        >
                            Jugar de todas formas
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
            >
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 shadow-2xl text-white mb-4">

                    <div className="text-center mb-6">
                        <div className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">
                            Verb Practice App
                        </div>
                        <div className="text-lg font-bold opacity-90">
                            {from
                                ? <><span className="text-yellow-300">{from}</span> te desafió 🔥</>
                                : '¡Alguien te desafió! 🔥'
                            }
                        </div>
                    </div>

                    {/* Número principal: mejor racha */}
                    <div className="text-center mb-6">
                        <div className="text-xs font-semibold uppercase tracking-widest opacity-65 mb-1">
                            Mejor racha
                        </div>
                        <div className="text-8xl font-extrabold leading-none text-yellow-300">
                            {bestStreak}
                        </div>
                        <div className="text-sm opacity-70 mt-1">
                            correctas seguidas
                        </div>
                    </div>

                    {/* Stats secundarias */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-white/10 rounded-2xl p-3 text-center">
                            <Star className="w-4 h-4 mx-auto mb-1 opacity-80" />
                            <div className="text-xl font-bold">{streak}</div>
                            <div className="text-xs opacity-65 mt-0.5">Racha actual</div>
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

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onPlay}
                        className="w-full bg-white text-indigo-700 font-bold text-lg py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all hover:bg-indigo-50"
                    >
                        <Play className="w-5 h-5" />
                        ¡Aceptar desafío!
                    </motion.button>
                </div>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    {from
                        ? `Superá la mejor racha de ${from} y compartí la tuya`
                        : 'Practicá verbos en inglés y superá esta racha'
                    }
                </p>
            </motion.div>
        </div>
    );
};

export default ShareWelcome;