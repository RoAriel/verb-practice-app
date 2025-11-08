import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, List } from 'lucide-react';
import { regularVerbs, irregularVerbs } from '../data/verbs';

const VerbTables = ({ show, onClose }) => {
  if (!show) return null;

  // Ordenar verbos alfabéticamente
  const sortedIrregular = [...irregularVerbs].sort((a, b) => 
    a.infinitive.localeCompare(b.infinitive)
  );
  
  const sortedRegular = [...regularVerbs].sort((a, b) => 
    a.infinitive.localeCompare(b.infinitive)
  );

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 sm:inset-8 md:inset-16 z-50 flex items-center justify-center"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full h-full flex flex-col overflow-hidden border-2 border-slate-200 dark:border-slate-700">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 sm:p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Verb Reference
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
                {/* Irregular Verbs */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <List className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                      Irregular Verbs
                    </h3>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({sortedIrregular.length} verbs)
                    </span>
                  </div>
                  
                  <div className="overflow-x-auto rounded-lg border-2 border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left">
                      <thead className="bg-purple-50 dark:bg-purple-900/20 border-b-2 border-purple-200 dark:border-purple-700">
                        <tr>
                          <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-300">
                            Infinitive
                          </th>
                          <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-300">
                            Past Simple
                          </th>
                          <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-300">
                            Past Participle
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {sortedIrregular.map((verb, index) => (
                          <motion.tr
                            key={verb.infinitive}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className="hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors"
                          >
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100">
                              {verb.infinitive}
                            </td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                              {verb.pastSimple}
                            </td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                              {verb.pastParticiple}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Regular Verbs */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <List className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                      Regular Verbs
                    </h3>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({sortedRegular.length} verbs)
                    </span>
                  </div>
                  
                  <div className="overflow-x-auto rounded-lg border-2 border-slate-200 dark:border-slate-700">
                    <table className="w-full text-left">
                      <thead className="bg-green-50 dark:bg-green-900/20 border-b-2 border-green-200 dark:border-green-700">
                        <tr>
                          <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-green-900 dark:text-green-300">
                            Infinitive
                          </th>
                          <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-green-900 dark:text-green-300">
                            Past Form
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {sortedRegular.map((verb, index) => (
                          <motion.tr
                            key={verb.infinitive}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className="hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors"
                          >
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100">
                              {verb.infinitive}
                            </td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                              {verb.pastSimple}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VerbTables;