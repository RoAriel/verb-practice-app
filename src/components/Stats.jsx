import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, Flame, RotateCcw, AlertTriangle, X, Star, Share2, Check } from 'lucide-react';

const Stats = ({ stats, onReset, onShare }) => {
  const total = stats.correct + stats.incorrect;
  const accuracy = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
  const [showConfirm, setShowConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConfirmReset = () => {
    onReset();
    setShowConfirm(false);
  };

  const handleShare = async () => {
    const url = onShare();
    const text = `🔥 ¡Llevo ${stats.streak} verbos seguidos en Verb Practice App!\n✨ Mejor racha: ${stats.bestStreak ?? 0} · 🎯 Precisión: ${accuracy}% · 📖 Verbos: ${total}\n¿Podés superarme?`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Verb Practice App', text, url });
        return;
      } catch {
        // usuario canceló o error, caer al fallback
      }
    }

    // Fallback: copiar al portapapeles
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard no disponible, ignorar
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Your Progress</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Botón Share — solo visible si hay algo que compartir */}
            {total > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Compartir</span>
                  </>
                )}
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-200 font-medium transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 sm:p-6 rounded-xl border-2 border-green-200 dark:border-green-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-700 dark:text-green-300 font-semibold text-sm">Correct</span>
              <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{stats.correct}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 p-4 sm:p-6 rounded-xl border-2 border-red-200 dark:border-red-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-700 dark:text-red-300 font-semibold text-sm">Incorrect</span>
              <Target className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-4xl font-bold text-red-700 dark:text-red-300">{stats.incorrect}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-4 sm:p-6 rounded-xl border-2 border-orange-200 dark:border-orange-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-orange-700 dark:text-orange-300 font-semibold text-sm">Streak</span>
              <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-4xl font-bold text-orange-700 dark:text-orange-300">{stats.streak}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 p-4 sm:p-6 rounded-xl border-2 border-yellow-200 dark:border-yellow-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-yellow-700 dark:text-yellow-300 font-semibold text-sm">Best</span>
              <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <p className="text-4xl font-bold text-yellow-700 dark:text-yellow-300">{stats.bestStreak ?? 0}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 p-4 sm:p-6 rounded-xl border-2 border-indigo-200 dark:border-indigo-700 transition-colors col-span-2 md:col-span-1"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-indigo-700 dark:text-indigo-300 font-semibold text-sm">Accuracy</span>
              <Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{accuracy}%</p>
          </motion.div>
        </div>

        {total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
              <span>Progress</span>
              <span>{total} verbs practiced</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${accuracy}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal de confirmación reset */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirm(false)}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-700 w-full max-w-sm"
            >
              <button
                onClick={() => setShowConfirm(false)}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-4"
                >
                  <AlertTriangle className="w-16 h-16 text-orange-500 dark:text-orange-400 mx-auto" />
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                  Reset progress?
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mb-6">
                  All your stats will be lost. This cannot be undone.
                </p>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirmReset}
                    className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg transition-all"
                  >
                    Reset
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Stats;