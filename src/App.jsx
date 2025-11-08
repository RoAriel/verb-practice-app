import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { regularVerbs, irregularVerbs } from './data/verbs';
import Settings from './components/Settings';
import VerbCard from './components/VerbCard';
import Stats from './components/Stats';
import ThemeToggle from './components/ThemeToggle';
import ResultPopup from './components/ResultPopup';
import VerbTables from './components/VerbTables';
import { BookOpen } from 'lucide-react';

function App() {
  const [settings, setSettings] = useState({
    difficulty: 'easy',
    mode: 'both'
  });
  
  const [currentVerb, setCurrentVerb] = useState(null);
  const [userAnswer, setUserAnswer] = useState({ pastSimple: '', pastParticiple: '' });
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, streak: 0 });
  const [usedVerbs, setUsedVerbs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showTables, setShowTables] = useState(false);

  // Cargar stats desde localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('verbPracticeStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Guardar stats en localStorage
  useEffect(() => {
    localStorage.setItem('verbPracticeStats', JSON.stringify(stats));
  }, [stats]);

  // Obtener verbos según configuración
  const getAvailableVerbs = () => {
    let verbs = [];
    if (settings.mode === 'regular') {
      verbs = regularVerbs;
    } else if (settings.mode === 'irregular') {
      verbs = irregularVerbs;
    } else {
      verbs = [...regularVerbs, ...irregularVerbs];
    }
    return verbs.filter(v => v.difficulty === settings.difficulty);
  };

  // Seleccionar nuevo verbo
  const selectNewVerb = () => {
    const available = getAvailableVerbs();
    const unused = available.filter(v => !usedVerbs.includes(v.infinitive));
    
    if (unused.length === 0) {
      setUsedVerbs([]);
      setCurrentVerb(available[Math.floor(Math.random() * available.length)]);
    } else {
      const newVerb = unused[Math.floor(Math.random() * unused.length)];
      setCurrentVerb(newVerb);
      setUsedVerbs([...usedVerbs, newVerb.infinitive]);
    }
    
    setUserAnswer({ pastSimple: '', pastParticiple: '' });
    setShowResult(false);
    setShowPopup(false);
  };

  // Inicializar primer verbo
  useEffect(() => {
    selectNewVerb();
  }, [settings]);

  const checkAnswer = () => {
    if (!currentVerb || !userAnswer.pastSimple || !userAnswer.pastParticiple) return;

    const correct = 
      userAnswer.pastSimple.toLowerCase().trim() === currentVerb.pastSimple.toLowerCase() &&
      userAnswer.pastParticiple.toLowerCase().trim() === currentVerb.pastParticiple.toLowerCase();

    setIsCorrect(correct);
    setShowResult(true);
    setShowPopup(true);

    // Auto-cerrar popup después de 2 segundos
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);

    if (correct) {
      setStats(prev => ({
        correct: prev.correct + 1,
        incorrect: prev.incorrect,
        streak: prev.streak + 1
      }));
    } else {
      setStats(prev => ({
        correct: prev.correct,
        incorrect: prev.incorrect + 1,
        streak: 0
      }));
    }
  };

  const handleNext = () => {
    selectNewVerb();
  };

  const resetStats = () => {
    setStats({ correct: 0, incorrect: 0, streak: 0 });
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
          
          {/* Botón Verb Reference */}
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
          {/* Configuración */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Settings settings={settings} setSettings={setSettings} />
          </motion.div>

          {/* Tarjeta de práctica */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {currentVerb && (
                <VerbCard
                  verb={currentVerb}
                  userAnswer={userAnswer}
                  setUserAnswer={setUserAnswer}
                  showResult={showResult}
                  isCorrect={isCorrect}
                  onCheck={checkAnswer}
                  onNext={handleNext}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 sm:mt-6"
        >
          <Stats stats={stats} onReset={resetStats} />
        </motion.div>

        {/* Popup de resultado */}
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