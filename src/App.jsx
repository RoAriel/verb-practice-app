import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { regularVerbs, irregularVerbs } from './data/verbs';
import Settings from './components/Settings';
import VerbCard from './components/VerbCard';
import Stats from './components/Stats';
import ThemeToggle from './components/ThemeToggle';
import ResultPopup from './components/ResultPopup';
import VerbTables from './components/VerbTables';
import { BookOpen } from 'lucide-react';

// MEJORA: formas alternativas aceptadas para verbos con variantes válidas
const ALTERNATE_FORMS = {
  learn: { pastSimple: ['learned', 'learnt'], pastParticiple: ['learned', 'learnt'] },
  burn: { pastSimple: ['burned', 'burnt'], pastParticiple: ['burned', 'burnt'] },
  dream: { pastSimple: ['dreamed', 'dreamt'], pastParticiple: ['dreamed', 'dreamt'] },
  spell: { pastSimple: ['spelled', 'spelt'], pastParticiple: ['spelled', 'spelt'] },
  spill: { pastSimple: ['spilled', 'spilt'], pastParticiple: ['spilled', 'spilt'] },
  smell: { pastSimple: ['smelled', 'smelt'], pastParticiple: ['smelled', 'smelt'] },
  kneel: { pastSimple: ['kneeled', 'knelt'], pastParticiple: ['kneeled', 'knelt'] },
  leap: { pastSimple: ['leaped', 'leapt'], pastParticiple: ['leaped', 'leapt'] },
};

const isAnswerCorrect = (userInput, verb, field) => {
  const input = userInput.toLowerCase().trim();
  const canonical = verb[field].toLowerCase();
  if (input === canonical) return true;
  const alts = ALTERNATE_FORMS[verb.infinitive]?.[field];
  return alts ? alts.map(a => a.toLowerCase()).includes(input) : false;
};

function App() {
  const [settings, setSettings] = useState({
    difficulty: 'easy',
    mode: 'both',
    autoSpeak: false
  });

  const [currentVerb, setCurrentVerb] = useState(null);
  const [userAnswer, setUserAnswer] = useState({ pastSimple: '', pastParticiple: '' });
  const [showResult, setShowResult] = useState(false);
  // MEJORA: resultado por campo independiente
  const [fieldResults, setFieldResults] = useState({ pastSimple: null, pastParticiple: null });
  const [isCorrect, setIsCorrect] = useState(false);
  // MEJORA: bestStreak histórico junto a las stats
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, streak: 0, bestStreak: 0 });
  const [usedVerbs, setUsedVerbs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showTables, setShowTables] = useState(false);

  const popupTimerRef = useRef(null);

  // Cargar stats desde localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('verbPracticeStats');
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      // compatibilidad con versiones anteriores sin bestStreak
      setStats({ bestStreak: 0, ...parsed });
    }
  }, []);

  // Guardar stats en localStorage
  useEffect(() => {
    localStorage.setItem('verbPracticeStats', JSON.stringify(stats));
  }, [stats]);

  // MEJORA: persistir sesión actual (verbo + respuesta en progreso)
  useEffect(() => {
    const savedSession = localStorage.getItem('verbPracticeSession');
    if (savedSession) {
      try {
        const { verb, usedVerbs: savedUsed } = JSON.parse(savedSession);
        if (verb) {
          setCurrentVerb(verb);
          setUsedVerbs(savedUsed || []);
          return;
        }
      } catch {
        // sesión corrupta, ignorar
      }
    }
  }, []);

  useEffect(() => {
    if (currentVerb) {
      localStorage.setItem('verbPracticeSession', JSON.stringify({
        verb: currentVerb,
        usedVerbs,
      }));
    }
  }, [currentVerb, usedVerbs]);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, []);

  const getAvailableVerbs = useCallback(() => {
    let verbs = [];
    if (settings.mode === 'regular') {
      verbs = regularVerbs;
    } else if (settings.mode === 'irregular') {
      verbs = irregularVerbs;
    } else {
      verbs = [...regularVerbs, ...irregularVerbs];
    }
    return verbs.filter(v => v.difficulty === settings.difficulty);
  }, [settings]);

  const selectNewVerb = useCallback(() => {
    const available = getAvailableVerbs();

    if (available.length === 0) {
      setCurrentVerb(null);
      setUsedVerbs([]);
      setUserAnswer({ pastSimple: '', pastParticiple: '' });
      setFieldResults({ pastSimple: null, pastParticiple: null });
      setShowResult(false);
      setShowPopup(false);
      return;
    }

    setUsedVerbs(prev => {
      const unused = available.filter(v => !prev.includes(v.infinitive));
      if (unused.length === 0) {
        const newVerb = available[Math.floor(Math.random() * available.length)];
        setCurrentVerb(newVerb);
        return [newVerb.infinitive];
      } else {
        const newVerb = unused[Math.floor(Math.random() * unused.length)];
        setCurrentVerb(newVerb);
        return [...prev, newVerb.infinitive];
      }
    });

    setUserAnswer({ pastSimple: '', pastParticiple: '' });
    setFieldResults({ pastSimple: null, pastParticiple: null });
    setShowResult(false);
    setShowPopup(false);
  }, [getAvailableVerbs]);

  // Inicializar primer verbo solo si no se cargó sesión
  useEffect(() => {
    const savedSession = localStorage.getItem('verbPracticeSession');
    if (!savedSession) {
      selectNewVerb();
    }
  }, []);

  // Reiniciar cuando cambian settings
  useEffect(() => {
    selectNewVerb();
    localStorage.removeItem('verbPracticeSession');
  }, [settings]);

  const checkAnswer = () => {
    if (!currentVerb || !userAnswer.pastSimple || !userAnswer.pastParticiple) return;

    // MEJORA: evaluar cada campo de forma independiente
    const pastSimpleOk = isAnswerCorrect(userAnswer.pastSimple, currentVerb, 'pastSimple');
    const pastParticipleOk = isAnswerCorrect(userAnswer.pastParticiple, currentVerb, 'pastParticiple');
    const correct = pastSimpleOk && pastParticipleOk;

    setFieldResults({ pastSimple: pastSimpleOk, pastParticiple: pastParticipleOk });
    setIsCorrect(correct);
    setShowResult(true);
    setShowPopup(true);

    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    popupTimerRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 2000);

    if (correct) {
      setStats(prev => {
        const newStreak = prev.streak + 1;
        return {
          correct: prev.correct + 1,
          incorrect: prev.incorrect,
          streak: newStreak,
          // MEJORA: actualizar bestStreak si se supera
          bestStreak: Math.max(prev.bestStreak ?? 0, newStreak),
        };
      });
    } else {
      setStats(prev => ({
        correct: prev.correct,
        incorrect: prev.incorrect + 1,
        streak: 0,
        bestStreak: prev.bestStreak ?? 0,
      }));
    }
  };

  const handleNext = () => {
    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    selectNewVerb();
  };

  const resetStats = () => {
    setStats({ correct: 0, incorrect: 0, streak: 0, bestStreak: 0 });
    localStorage.removeItem('verbPracticeStats');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <ThemeToggle />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 sm:mb-6 md:mb-8 pt-12 sm:pt-0"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-1 sm:mb-2 px-2">
            Verb Practice App
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 px-2">
            Master English verbs with ease! 🎯
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTables(true)}
            className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-full shadow-lg transition-all"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">View Verb List</span>
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Settings settings={settings} setSettings={setSettings} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {currentVerb ? (
                <VerbCard
                  verb={currentVerb}
                  userAnswer={userAnswer}
                  setUserAnswer={setUserAnswer}
                  showResult={showResult}
                  fieldResults={fieldResults}
                  isCorrect={isCorrect}
                  onCheck={checkAnswer}
                  onNext={handleNext}
                  autoSpeak={settings.autoSpeak}
                />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 text-center"
                >
                  <p className="text-4xl mb-4">🔍</p>
                  <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                    No verbs found
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    There are no verbs for this difficulty and mode combination. Try changing the settings.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 sm:mt-6"
        >
          <Stats stats={stats} onReset={resetStats} />
        </motion.div>

        <ResultPopup
          show={showPopup}
          isCorrect={isCorrect}
          onClose={() => setShowPopup(false)}
        />

        <VerbTables
          show={showTables}
          onClose={() => setShowTables(false)}
        />
      </div>
    </div>
  );
}

export default App;