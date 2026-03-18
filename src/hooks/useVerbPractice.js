import { useState, useEffect, useRef, useCallback } from 'react';
import { regularVerbs, irregularVerbs } from '../data/verbs';

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

const APP_URL = 'https://verb-practice-app.netlify.app';

// Clave para firmar los parámetros del link compartido
const SIGN_KEY = 'vpa_k9x2mQ7rLpN4wZ';

// Genera un hash simple a partir de los valores y la clave
// Suficiente para detectar manipulación casual sin necesidad de backend
const signParams = (streak, best, accuracy, total, from) => {
    const raw = `${streak}|${best}|${accuracy}|${total}|${from || ''}|${SIGN_KEY}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
        hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
    }
    return Math.abs(hash).toString(36);
};

// Exportado para usarlo en ShareWelcome al verificar
export { signParams };

export function useVerbPractice(settings) {
    const [currentVerb, setCurrentVerb] = useState(null);
    const [userAnswer, setUserAnswer] = useState({ pastSimple: '', pastParticiple: '' });
    const [showResult, setShowResult] = useState(false);
    const [fieldResults, setFieldResults] = useState({ pastSimple: null, pastParticiple: null });
    const [isCorrect, setIsCorrect] = useState(false);
    const [stats, setStats] = useState({ correct: 0, incorrect: 0, streak: 0, bestStreak: 0 });
    const [usedVerbs, setUsedVerbs] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const popupTimerRef = useRef(null);

    useEffect(() => {
        const savedStats = localStorage.getItem('verbPracticeStats');
        if (savedStats) {
            try {
                const parsed = JSON.parse(savedStats);
                setStats({ bestStreak: 0, ...parsed });
            } catch {
                // datos corruptos, ignorar
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('verbPracticeStats', JSON.stringify(stats));
    }, [stats]);

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

    useEffect(() => {
        const savedSession = localStorage.getItem('verbPracticeSession');
        if (!savedSession) {
            selectNewVerb();
        }
    }, []);

    useEffect(() => {
        selectNewVerb();
        localStorage.removeItem('verbPracticeSession');
    }, [settings]);

    const checkAnswer = () => {
        if (!currentVerb || !userAnswer.pastSimple || !userAnswer.pastParticiple) return;

        const pastSimpleOk = isAnswerCorrect(userAnswer.pastSimple, currentVerb, 'pastSimple');
        const pastParticipleOk = isAnswerCorrect(userAnswer.pastParticiple, currentVerb, 'pastParticiple');
        const correct = pastSimpleOk && pastParticipleOk;

        setFieldResults({ pastSimple: pastSimpleOk, pastParticiple: pastParticipleOk });
        setIsCorrect(correct);
        setShowResult(true);
        setShowPopup(true);

        if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
        popupTimerRef.current = setTimeout(() => setShowPopup(false), 2000);

        if (correct) {
            setStats(prev => {
                const newStreak = prev.streak + 1;
                return {
                    correct: prev.correct + 1,
                    incorrect: prev.incorrect,
                    streak: newStreak,
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

    const closePopup = () => setShowPopup(false);

    const generateShareUrl = () => {
        const total = stats.correct + stats.incorrect;
        const accuracy = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
        const best = stats.bestStreak ?? 0;
        const userName = localStorage.getItem('verbPracticeUserName') || '';
        const sig = signParams(stats.streak, best, accuracy, total, userName);
        const params = new URLSearchParams({
            streak: stats.streak,
            best,
            accuracy,
            total,
            sig,
            ...(userName && { from: userName }),
        });
        return `${APP_URL}?${params.toString()}`;
    };

    return {
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
    };
}