import { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ActiveCategory, Difficulty, WordEntry } from '../types';
import { categories } from '../data/categories';
import { shuffle } from '../utils/shuffle';
import { formatTime } from '../hooks/useTimer';

interface QuizOption {
  english: string;
  hebrew: string;
}

interface QuizQuestion {
  sentence: string;
  correct: string;
  correctHebrew: string;
  options: QuizOption[];
}

interface GenerateResult {
  questions: QuizQuestion[];
  activeCategories: ActiveCategory[];
}

function generateQuestions(difficulty: Difficulty): GenerateResult {
  const count = { easy: 12, medium: 18, hard: 24 }[difficulty];
  const allWords = categories.flatMap((c) => c.words);
  const words = shuffle(allWords).slice(0, count);

  // Track which categories appear
  const wordToCat = new Map<string, ActiveCategory>();
  categories.forEach((cat) => {
    cat.words.forEach((w) => wordToCat.set(w.id, { icon: cat.icon, name: cat.name }));
  });
  const seen = new Set<string>();
  const activeCategories: ActiveCategory[] = [];
  words.forEach((w) => {
    const cat = wordToCat.get(w.id);
    if (cat && !seen.has(cat.name)) {
      seen.add(cat.name);
      activeCategories.push(cat);
    }
  });

  const questions = words.map((word: WordEntry) => {
    const distractors = shuffle(
      allWords.filter((w) => w.english !== word.english)
    ).slice(0, 3);

    return {
      sentence: word.sentence,
      correct: word.english,
      correctHebrew: word.hebrew,
      options: shuffle([word, ...distractors]).map((w) => ({
        english: w.english,
        hebrew: w.hebrew,
      })),
    };
  });

  return { questions, activeCategories };
}

type AnswerState = 'idle' | 'correct' | 'wrong';

export function SentenceQuizScreen() {
  const { state, dispatch } = useGame();
  const [{ questions, activeCategories }] = useState<GenerateResult>(() =>
    generateQuestions(state.difficulty)
  );
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedHebrew, setSelectedHebrew] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [correctCount, setCorrectCount] = useState(0);
  const [showTranslations, setShowTranslations] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const current = questions[index];
  const total = questions.length;
  const progress = ((index) / total) * 100;

  const handleAnswer = (option: QuizOption) => {
    if (selected) return;

    const isCorrect = option.english === current.correct;
    setSelected(option.english);
    setSelectedHebrew(option.hebrew);
    setAnswerState(isCorrect ? 'correct' : 'wrong');
    const newCorrect = isCorrect ? correctCount + 1 : correctCount;
    if (isCorrect) setCorrectCount(newCorrect);

    setTimeout(() => {
      if (index + 1 >= total) {
        if (timerRef.current) clearInterval(timerRef.current);
        const finalElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        dispatch({
          type: 'QUIZ_FINISH',
          correct: newCorrect,
          total,
          elapsedSeconds: finalElapsed,
        });
      } else {
        setIndex((i) => i + 1);
        setSelected(null);
        setSelectedHebrew(null);
        setAnswerState('idle');
      }
    }, 1500);
  };

  // Split sentence at ___
  const parts = current.sentence.split('___');
  const beforeBlank = parts[0] ?? '';
  const afterBlank = parts[1] ?? '';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0e0d0b' }}>
      {/* Top bar */}
      <div className="px-4 pt-5 pb-4 flex items-center gap-4">
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="text-sm transition-colors"
          style={{ color: '#6b6760' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede6')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6b6760')}
        >
          ✕ Quit
        </button>

        <div className="flex-1 flex items-center gap-3">
          <span className="text-xs font-medium tabular-nums" style={{ color: '#6b6760' }}>
            {index + 1}/{total}
          </span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#231f1a' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: '#d4ff00' }}
            />
          </div>
        </div>

        <span className="text-sm font-medium tabular-nums" style={{ color: '#6b6760' }}>
          {formatTime(elapsed)}
        </span>
      </div>

      {/* Score + category badges */}
      <div className="px-4 pb-2 flex items-center gap-2 flex-wrap">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(212,255,0,0.1)', color: '#d4ff00' }}
        >
          ✓ {correctCount} correct
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {activeCategories.map((cat) => (
            <span
              key={cat.name}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(240,237,230,0.07)', color: '#6b6760' }}
            >
              {cat.icon} {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center w-full">
      <div className="w-full max-w-2xl px-5 flex flex-col gap-8 py-6">

        {/* Sentence */}
        <div
          className="p-6 rounded-2xl text-xl sm:text-2xl font-medium leading-relaxed text-center"
          style={{ background: '#191714', border: '1px solid rgba(240,237,230,0.08)', color: '#f0ede6' }}
        >
          {beforeBlank}
          <span
            className="inline-block px-2 mx-1 rounded font-bold"
            style={{
              color: '#d4ff00',
              borderBottom: '2px solid #d4ff00',
              background: 'rgba(212,255,0,0.08)',
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          {afterBlank}
        </div>

        {/* Translate toggle */}
        <div className="flex justify-end -mt-4">
          <button
            onClick={() => setShowTranslations((v) => !v)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
            style={{
              background: showTranslations ? 'rgba(212,255,0,0.12)' : '#191714',
              border: `1px solid ${showTranslations ? 'rgba(212,255,0,0.4)' : 'rgba(240,237,230,0.12)'}`,
              color: showTranslations ? '#d4ff00' : '#6b6760',
            }}
          >
            🇮🇱 תרגום
          </button>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {current.options.map((option) => {
            const isSelected = selected === option.english;
            const isCorrect = option.english === current.correct;
            const showFeedback = selected !== null;

            let bg = '#191714';
            let border = 'rgba(240,237,230,0.12)';
            let textColor = '#f0ede6';
            let hebrewColor = '#6b6760';

            if (showFeedback) {
              if (isCorrect) {
                bg = 'rgba(0,230,118,0.15)';
                border = '#00e676';
                textColor = '#00e676';
                hebrewColor = 'rgba(0,230,118,0.6)';
              } else if (isSelected && !isCorrect) {
                bg = 'rgba(255,68,68,0.15)';
                border = '#ff4444';
                textColor = '#ff4444';
                hebrewColor = 'rgba(255,68,68,0.6)';
              }
            }

            return (
              <button
                key={option.english}
                onClick={() => handleAnswer(option)}
                disabled={!!selected}
                className="py-3 px-4 rounded-xl font-semibold text-sm sm:text-base text-center
                  transition-all duration-200 disabled:cursor-default flex flex-col items-center gap-1"
                style={{
                  background: bg,
                  border: `1.5px solid ${border}`,
                  color: textColor,
                }}
                onMouseEnter={(e) => {
                  if (!selected) {
                    (e.currentTarget as HTMLButtonElement).style.background = '#231f1a';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(240,237,230,0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selected) {
                    (e.currentTarget as HTMLButtonElement).style.background = '#191714';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(240,237,230,0.12)';
                  }
                }}
              >
                <span>{option.english}</span>
                {(showTranslations || showFeedback) && (
                  <span
                    className="text-xs font-normal"
                    style={{ color: hebrewColor, direction: 'rtl' }}
                  >
                    {option.hebrew}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback message */}
        {selected && (
          <div className="text-center text-sm font-medium fade-in flex flex-col gap-1">
            {answerState === 'correct' ? (
              <span style={{ color: '#00e676' }}>✓ נכון!</span>
            ) : (
              <>
                <span style={{ color: '#ff4444' }}>
                  ✗ בחרת: "{selected}" — {selectedHebrew}
                </span>
                <span style={{ color: '#6b6760' }}>
                  התשובה הנכונה: "{current.correct}" — {current.correctHebrew}
                </span>
              </>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
