import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useVerbPractice } from './hooks/useVerbPractice';
import Settings from './components/Settings';
import VerbCard from './components/VerbCard';
import Stats from './components/Stats';
import ThemeToggle from './components/ThemeToggle';
import ResultPopup from './components/ResultPopup';
import VerbTables from './components/VerbTables';
import ShareWelcome from './components/ShareWelcome';
import Onboarding from './components/Onboarding';

// Lee los parámetros de la URL al cargar
const getSharedStats = () => {
  const params = new URLSearchParams(window.location.search);
  const d = params.get('d');
  const sig = params.get('sig');
  if (!d) return null;
  try {
    const parsed = JSON.parse(atob(d));
    return {
      streak: Number(parsed.streak ?? 0),
      bestStreak: Number(parsed.best ?? 0),
      accuracy: Number(parsed.accuracy ?? 0),
      total: Number(parsed.total ?? 0),
      from: parsed.from || null,
      sig: sig || '',
    };
  } catch {
    // payload corrupto o alterado
    return { streak: 0, bestStreak: 0, accuracy: 0, total: 0, from: null, sig: '' };
  }
};

function App() {
  const sharedStats = getSharedStats();
  const [showWelcome, setShowWelcome] = useState(!!sharedStats);

  const savedName = localStorage.getItem('verbPracticeUserName');
  const [userName, setUserName] = useState(savedName || '');
  const [showOnboarding, setShowOnboarding] = useState(!savedName && !sharedStats);

  const [settings, setSettings] = useState({
    difficulty: 'easy',
    mode: 'both',
    autoSpeak: false,
  });
  const [showTables, setShowTables] = useState(false);

  const {
    currentVerb,
    userAnswer,
    setUserAnswer,
    showResult,
    fieldResults,
    isCorrect,
    stats,
    showPopup,
    checkAnswer,
    handleNext,
    resetStats,
    closePopup,
    generateShareUrl,
  } = useVerbPractice(settings);

  // Onboarding — primera vez
  if (showOnboarding) {
    return (
      <Onboarding
        onComplete={(name) => {
          setUserName(name);
          setShowOnboarding(false);
        }}
      />
    );
  }

  // Pantalla de bienvenida al abrir un link compartido
  if (showWelcome && sharedStats) {
    return (
      <ShareWelcome
        sharedStats={sharedStats}
        onPlay={() => {
          window.history.replaceState({}, '', window.location.pathname);
          setShowWelcome(false);
        }}
      />
    );
  }

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

          {/* Saludo personalizado */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 px-2">
            {userName ? `¡Hola, ${userName}! 👋` : 'Master English verbs with ease! 🎯'}
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
            <Settings
              settings={settings}
              setSettings={setSettings}
              userName={userName}
              onUserNameChange={(newName) => {
                setUserName(newName);
                localStorage.setItem('verbPracticeUserName', newName);
              }}
            />
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
          <Stats
            stats={stats}
            onReset={resetStats}
            onShare={generateShareUrl}
            userName={userName}
          />
        </motion.div>

        <ResultPopup
          show={showPopup}
          isCorrect={isCorrect}
          onClose={closePopup}
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