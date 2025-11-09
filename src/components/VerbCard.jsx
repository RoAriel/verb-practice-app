import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { speak, stopSpeaking, isSpeechSupported } from '../utils/speech';

const VerbCard = ({ 
  verb, 
  userAnswer, 
  setUserAnswer, 
  showResult, 
  isCorrect, 
  onCheck, 
  onNext,
  autoSpeak 
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Auto-pronunciar cuando aparece un nuevo verbo
  useEffect(() => {
    if (autoSpeak && verb && !showResult) {
      const timer = setTimeout(() => {
        handleSpeak(verb.infinitive);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [verb?.infinitive, autoSpeak, showResult]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !showResult) {
      onCheck();
    }
  };

  const handleSpeak = async (text) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    try {
      await speak(text, { rate: 0.85 });
    } catch (error) {
      console.error('Speech error:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <motion.div
      key={verb.infinitive}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700 transition-colors"
    >
      {/* Header con verbo infinitivo */}
      <div className="text-center mb-6 sm:mb-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-block w-full"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg inline-block">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">Infinitive</span>
          </div>
          
          {/* Verbo con botón de pronunciación */}
          <div className="flex items-center justify-center gap-3 mt-3 sm:mt-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 break-words">
              {verb.infinitive}
            </h2>
            
            {/* Botón de pronunciación */}
            {isSpeechSupported() && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSpeak(verb.infinitive)}
                className={`p-2 sm:p-3 rounded-full transition-all ${
                  isSpeaking 
                    ? 'bg-indigo-600 text-white animate-pulse' 
                    : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50'
                }`}
                title="Pronunciar"
              >
                {isSpeaking ? (
                  <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </motion.button>
            )}
          </div>
          
          <p className="text-slate-500 dark:text-slate-400 mt-1 sm:mt-2 text-base sm:text-lg italic px-2">
            ({verb.translation})
          </p>
        </motion.div>
      </div>

      {/* Inputs */}
      <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              Past Simple
            </label>
            
            {/* Botón de pronunciación para Past Simple */}
            {isSpeechSupported() && showResult && (
              <button
                onClick={() => handleSpeak(verb.pastSimple)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <Volume2 className="w-3 h-3" />
                Listen
              </button>
            )}
          </div>
          
          <input
            type="text"
            value={userAnswer.pastSimple}
            onChange={(e) => setUserAnswer({ ...userAnswer, pastSimple: e.target.value })}
            onKeyPress={handleKeyPress}
            disabled={showResult}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 text-base sm:text-lg font-medium transition-all dark:bg-slate-700 dark:text-slate-100 ${
              showResult
                ? isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                : 'border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none'
            }`}
            placeholder="Type here..."
          />
          {showResult && !isCorrect && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 dark:text-green-400 font-semibold mt-2 text-sm sm:text-base"
            >
              ✓ Correct: {verb.pastSimple}
            </motion.p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              Past Participle
            </label>
            
            {/* Botón de pronunciación para Past Participle */}
            {isSpeechSupported() && showResult && (
              <button
                onClick={() => handleSpeak(verb.pastParticiple)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <Volume2 className="w-3 h-3" />
                Listen
              </button>
            )}
          </div>
          
          <input
            type="text"
            value={userAnswer.pastParticiple}
            onChange={(e) => setUserAnswer({ ...userAnswer, pastParticiple: e.target.value })}
            onKeyPress={handleKeyPress}
            disabled={showResult}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 text-base sm:text-lg font-medium transition-all dark:bg-slate-700 dark:text-slate-100 ${
              showResult
                ? isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                : 'border-slate-300 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none'
            }`}
            placeholder="Type here..."
          />
          {showResult && !isCorrect && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 dark:text-green-400 font-semibold mt-2 text-sm sm:text-base"
            >
              ✓ Correct: {verb.pastParticiple}
            </motion.p>
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 sm:gap-4">
        {!showResult ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCheck}
            disabled={!userAnswer.pastSimple || !userAnswer.pastParticiple}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            Next Verb <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        )}
      </div>

      {/* Feedback */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg text-center font-semibold text-sm sm:text-base ${
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