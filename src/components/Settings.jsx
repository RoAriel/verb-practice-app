import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Volume2, User, Check } from 'lucide-react';

const Settings = ({ settings, setSettings, userName, onUserNameChange }) => {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userName);

  const handleNameSave = () => {
    const trimmed = nameInput.trim();
    if (trimmed) onUserNameChange(trimmed);
    setEditingName(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') handleNameSave();
    if (e.key === 'Escape') {
      setNameInput(userName);
      setEditingName(false);
    }
  };

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
    { value: 'both', label: '🔀 Both', shortLabel: 'Both' },
    { value: 'regular', label: '📖 Regular Only', shortLabel: 'Regular' },
    { value: 'irregular', label: '🎲 Irregular Only', shortLabel: 'Irregular' }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">Settings</h2>
      </div>

      <div className="space-y-4 sm:space-y-6">

        {/* Nombre */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 sm:mb-3">
            Your name
          </label>
          {editingName ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={handleNameKeyDown}
                autoFocus
                maxLength={30}
                className="flex-1 px-3 py-2 rounded-lg border-2 border-indigo-400 dark:border-indigo-500 dark:bg-slate-700 dark:text-slate-100 text-sm font-medium focus:outline-none transition-all"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleNameSave}
                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Check className="w-4 h-4" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setNameInput(userName);
                setEditingName(true);
              }}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-left flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
            >
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
              <span className="truncate">{userName || 'Agregar nombre...'}</span>
            </motion.button>
          )}
        </div>

        {/* Dificultad */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 sm:mb-3">
            Difficulty Level
          </label>
          <div className="space-y-2">
            {difficultyOptions.map(({ value, label, activeClass, inactiveClass }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSettings({ ...settings, difficulty: value })}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${settings.difficulty === value ? activeClass : inactiveClass
                  }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Modo */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 sm:mb-3">
            Practice Mode
          </label>
          <div className="space-y-2">
            {modeOptions.map(({ value, label, shortLabel }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSettings({ ...settings, mode: value })}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all ${settings.mode === value
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
              >
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{shortLabel}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Auto Speak */}
        {('speechSynthesis' in window) && (
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 sm:mb-3">
              Pronunciation
            </label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSettings({ ...settings, autoSpeak: !settings.autoSpeak })}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all flex items-center gap-2 justify-center ${settings.autoSpeak
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
            >
              <Volume2 className="w-4 h-4" />
              Auto-speak {settings.autoSpeak ? 'On' : 'Off'}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;