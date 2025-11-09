// src/utils/speech.js
// Utilidades para pronunciación de texto usando Web Speech API

/**
 * Verifica si el navegador soporta síntesis de voz
 * @returns {boolean}
 */
export const isSpeechSupported = () => {
  return 'speechSynthesis' in window;
};

/**
 * Obtiene las voces disponibles en inglés
 * @returns {Promise<SpeechSynthesisVoice[]>}
 */
export const getEnglishVoices = () => {
  return new Promise((resolve) => {
    let voices = speechSynthesis.getVoices();
    
    if (voices.length > 0) {
      resolve(voices.filter(voice => voice.lang.startsWith('en')));
    } else {
      // Algunos navegadores cargan las voces de forma asíncrona
      speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices();
        resolve(voices.filter(voice => voice.lang.startsWith('en')));
      };
    }
  });
};

/**
 * Pronuncia un texto en inglés
 * @param {string} text - Texto a pronunciar
 * @param {Object} options - Opciones de pronunciación
 * @param {number} options.rate - Velocidad (0.1 - 10, default: 0.85)
 * @param {number} options.pitch - Tono (0 - 2, default: 1)
 * @param {number} options.volume - Volumen (0 - 1, default: 1)
 * @param {string} options.lang - Idioma (default: 'en-US')
 * @returns {Promise<void>}
 */
export const speak = async (text, options = {}) => {
  if (!isSpeechSupported()) {
    console.warn('Speech synthesis not supported');
    return;
  }

  // Cancelar cualquier pronunciación en curso
  speechSynthesis.cancel();

  const {
    rate = 0.85,   // Velocidad ligeramente más lenta para mejor comprensión
    pitch = 1,     // Tono normal
    volume = 1,    // Volumen máximo
    lang = 'en-US' // Inglés americano por defecto
  } = options;

  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    utterance.lang = lang;

    // Intentar usar una voz en inglés de calidad
    getEnglishVoices().then(voices => {
      if (voices.length > 0) {
        // Preferir voces de Google o de alta calidad
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Google') || 
          voice.name.includes('Premium') ||
          voice.name.includes('Enhanced')
        ) || voices[0];
        
        utterance.voice = preferredVoice;
      }

      utterance.onend = resolve;
      utterance.onerror = reject;

      speechSynthesis.speak(utterance);
    });
  });
};

/**
 * Detiene cualquier pronunciación en curso
 */
export const stopSpeaking = () => {
  if (isSpeechSupported()) {
    speechSynthesis.cancel();
  }
};

/**
 * Pronuncia un verbo con todas sus formas
 * @param {Object} verb - Objeto del verbo
 * @param {string} verb.infinitive
 * @param {string} verb.pastSimple
 * @param {string} verb.pastParticiple
 * @param {boolean} withPause - Pausa entre formas
 */
export const speakVerb = async (verb, withPause = true) => {
  const pauseTime = withPause ? 500 : 0;
  
  await speak(verb.infinitive);
  if (pauseTime) await new Promise(resolve => setTimeout(resolve, pauseTime));
  
  await speak(verb.pastSimple);
  if (pauseTime) await new Promise(resolve => setTimeout(resolve, pauseTime));
  
  await speak(verb.pastParticiple);
};