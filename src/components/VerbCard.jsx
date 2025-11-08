import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const VerbCard = ({ verb, userAnswer, setUserAnswer, showResult, isCorrect, onCheck, onNext }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !showResult) {
      onCheck();
    }
  };

  return (
    <motion.div
      key={verb.infinitive}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 transition-colors"
    >
      {/* Header con verbo infinitivo */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-block"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg">
            <span className="text-sm font-semibold uppercase tracking-wide">Infinitive</span>
          </div>
          <h2 className="text-5xl font-bold text-slate-800 dark:text-slate-100 mt-4">{verb.infinitive}</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg italic">({verb.translation})</p>
        </motion.div>
      </div>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Past Simple
          </label>
          <input
            type="text"
            value={userAnswer.pastSimple}
            onChange={(e) => setUserAnswer({ ...userAnswer, pastSimple: e.target.value })}
            onKeyPress={handleKeyPress}
            disabled={showResult}
            className={`w-full px-4 py-3 rounded-lg border-2 text-lg font-medium transition-all dark:bg-slate-700 dark:text-slate-100 ${
              showResult
                ? isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                : 'border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none'
            }`}
            placeholder="Type the past simple form..."
          />
          {showResult && !isCorrect && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 dark:text-green-400 font-semibold mt-2"
            >
              ✓ Correct: {verb.pastSimple}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Past Participle
          </label>
          <input
            type="text"
            value={userAnswer.pastParticiple}
            onChange={(e) => setUserAnswer({ ...userAnswer, pastParticiple: e.target.value })}
            onKeyPress={handleKeyPress}
            disabled={showResult}
            className={`w-full px-4 py-3 rounded-lg border-2 text-lg font-medium transition-all dark:bg-slate-700 dark:text-slate-100 ${
              showResult
                ? isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                : 'border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none'
            }`}
            placeholder="Type the past participle form..."
          />
          {showResult && !isCorrect && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 dark:text-green-400 font-semibold mt-2"
            >
              ✓ Correct: {verb.pastParticiple}
            </motion.p>
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4">
        {!showResult ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCheck}
            disabled={!userAnswer.pastSimple || !userAnswer.pastParticiple}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            Next Verb <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Feedback */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-lg text-center font-semibold ${
            isCorrect
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
          }`}
        >
          {isCorrect ? '🎉 Perfect! Keep going!' : '💪 Keep practising!'}
        </motion.div>
      )}
    </motion.div>
  );
};

export default VerbCard;