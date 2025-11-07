import TextReader from "../components/UI/TextReader";


export interface ReaderOptions {
  words: string[];
  wpm?: number;
}

export interface ReaderControls {
  word: string;
  index: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  restart: () => void;
  setSpeed: (wpm: number) => void;
}

export const useReader = ({ words, wpm = 250 }: ReaderOptions): ReaderControls => {
  const [index, setIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(wpm);
  const timerRef = useRef<number | null>(null);

  const delay = 60000 / Math.max(1, speed);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const next = () => {
    setIndex((i) => (i + 1) % words.length);
  };

  const scheduleNext = () => {
    clearTimer();
    if (isRunning) {
      timerRef.current = window.setTimeout(() => {
        next();
        scheduleNext();
      }, delay);
    }
  };

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const restart = () => {
    setIndex(0);
    setIsRunning(true);
  };

  useEffect(() => {
    if (isRunning) scheduleNext();
    else clearTimer();
    return clearTimer;
  }, [isRunning, speed]);

  return {
    word: words[index] || "",
    index,
    isRunning,
    start,
    pause,
    restart,
    setSpeed,
  };
};

