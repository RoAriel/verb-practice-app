import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = ({ settings, setSettings }) => {
  const difficultyOptions = [
    { 
      value: 'easy', 
      label: '🟢 Easy',
      activeClass: 'bg-green-500 text-white shadow-md',
      inactiveClass: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
    },
    { 
      value: 'medium', 
      label: '🟡 Medium',
      activeClass: 'bg-yellow-500 text-white shadow-md',
      inactiveClass: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
    },
    { 
      value: 'hard', 
      label: '🔴 Hard',
      activeClass: 'bg-red-500 text-white shadow-md',
      inactiveClass: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
    }
  ];

  const modeOptions = [
    { value: 'both', label: '🔀 Both', icon: '📚' },
    { value: 'regular', label: '📖 Regular Only', icon: '✓' },
    { value: 'irregular', label: '🎲 Irregular Only', icon: '⚡' }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Dificultad */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Difficulty Level
          </label>
          <div className="space-y-2">
            {difficultyOptions.map(({ value, label, activeClass, inactiveClass }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSettings({ ...settings, difficulty: value })}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
                  settings.difficulty === value ? activeClass : inactiveClass
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Modo */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Practice Mode
          </label>
          <div className="space-y-2">
            {modeOptions.map(({ value, label }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSettings({ ...settings, mode: value })}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
                  settings.mode === value
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;