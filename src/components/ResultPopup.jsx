import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

const ResultPopup = ({ show, isCorrect, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay con click para cerrar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className={`relative rounded-2xl shadow-2xl p-6 sm:p-8 ${
              isCorrect 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 border-2 border-green-300 dark:border-green-700'
                : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/40 dark:to-rose-900/40 border-2 border-red-300 dark:border-red-700'
            }`}>
              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/50 dark:hover:bg-black/20 transition-colors"
              >
                <X className={`w-5 h-5 ${
                  isCorrect 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-red-700 dark:text-red-300'
                }`} />
              </button>

              {/* Contenido */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-4"
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-20 h-20 sm:w-24 sm:h-24 text-green-500 dark:text-green-400 mx-auto" />
                  ) : (
                    <XCircle className="w-20 h-20 sm:w-24 sm:h-24 text-red-500 dark:text-red-400 mx-auto" />
                  )}
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-2xl sm:text-3xl font-bold mb-2 ${
                    isCorrect
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-red-800 dark:text-red-200'
                  }`}
                >
                  {isCorrect ? 'Perfect!' : 'Not Quite!'}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-base sm:text-lg ${
                    isCorrect
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}
                >
                  {isCorrect ? '🎉 Keep up the great work!' : '💪 Keep practising!'}
                </motion.p>

                {/* Indicador de auto-cierre */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.5 }}
                  className={`mt-4 text-xs ${
                    isCorrect
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  Auto-closing...
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResultPopup;