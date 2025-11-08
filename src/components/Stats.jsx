import { motion } from 'framer-motion';
import { Trophy, Target, Flame, RotateCcw } from 'lucide-react';

const Stats = ({ stats, onReset }) => {
  const total = stats.correct + stats.incorrect;
  const accuracy = total > 0 ? Math.round((stats.correct / total) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Your Progress</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-200 font-medium transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </motion.button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Correctas */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl border-2 border-green-200 dark:border-green-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 dark:text-green-300 font-semibold text-sm">Correct</span>
            <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-4xl font-bold text-green-700 dark:text-green-300">{stats.correct}</p>
        </motion.div>

        {/* Incorrectas */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 p-6 rounded-xl border-2 border-red-200 dark:border-red-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-700 dark:text-red-300 font-semibold text-sm">Incorrect</span>
            <Target className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-4xl font-bold text-red-700 dark:text-red-300">{stats.incorrect}</p>
        </motion.div>

        {/* Racha */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-orange-700 dark:text-orange-300 font-semibold text-sm">Streak</span>
            <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <p className="text-4xl font-bold text-orange-700 dark:text-orange-300">{stats.streak}</p>
        </motion.div>

        {/* Precisión */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 p-6 rounded-xl border-2 border-indigo-200 dark:border-indigo-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-indigo-700 dark:text-indigo-300 font-semibold text-sm">Accuracy</span>
            <Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{accuracy}%</p>
        </motion.div>
      </div>

      {/* Barra de progreso */}
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
  );
};

export default Stats;