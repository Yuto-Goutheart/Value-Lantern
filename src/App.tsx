import { useState, useEffect } from 'react';
import type { LanternData, Step } from './types';
import StartScreen from './components/StartScreen';
import StepFlame from './components/StepFlame';
import StepProtection from './components/StepProtection';
import StepHandle from './components/StepHandle';
import StepLight from './components/StepLight';
import StepClosing from './components/StepClosing';
import ResultsScreen from './components/ResultsScreen';

const STORAGE_KEY = 'value-lantern-data';
const STORAGE_STEP_KEY = 'value-lantern-step';

const initialData: LanternData = {
  flame: { value1: '', value2: '' },
  protection: { actions: '', supporters: '' },
  handle: { situations: '', behaviors: '' },
  light: { situations: '', outcomes: '', feelings: '' },
  closing: { reflections: '' },
};

function loadFromStorage(): { data: LanternData; step: Step; started: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stepRaw = localStorage.getItem(STORAGE_STEP_KEY);
    if (raw) {
      const data = JSON.parse(raw) as LanternData;
      const step = stepRaw ? (parseInt(stepRaw) as Step) : 1;
      return { data, step, started: true };
    }
  } catch {
    // ignore
  }
  return { data: initialData, step: 1, started: false };
}

function App() {
  const saved = loadFromStorage();
  const [started, setStarted] = useState(saved.started);
  const [currentStep, setCurrentStep] = useState<Step>(saved.step);
  const [data, setData] = useState<LanternData>(saved.data);
  const [showResults, setShowResults] = useState(false);

  // Auto-save to localStorage on data/step change
  useEffect(() => {
    if (started) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(STORAGE_STEP_KEY, String(currentStep));
    }
  }, [data, currentStep, started]);

  const getDataKey = (step: Step): keyof LanternData => {
    const keys: Record<Step, keyof LanternData> = {
      1: 'flame', 2: 'protection', 3: 'handle', 4: 'light', 5: 'closing',
    };
    return keys[step];
  };

  const updateData = (step: Step, stepData: Partial<LanternData[keyof LanternData]>) => {
    setData(prev => ({
      ...prev,
      [getDataKey(step)]: { ...prev[getDataKey(step)], ...stepData }
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep((currentStep + 1) as Step);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as Step);
  };

  const handleStart = () => setStarted(true);

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_STEP_KEY);
    setStarted(false);
    setCurrentStep(1);
    setData(initialData);
    setShowResults(false);
  };

  const handleComplete = () => setShowResults(true);

  if (!started) {
    return <StartScreen onStart={handleStart} />;
  }

  if (showResults) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <ResultsScreen data={data} onReset={handleReset} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {currentStep === 1 && (
          <StepFlame data={data.flame} onUpdate={(d) => updateData(1, d)} onNext={handleNext} />
        )}
        {currentStep === 2 && (
          <StepProtection data={data.protection} onUpdate={(d) => updateData(2, d)} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 3 && (
          <StepHandle data={data.handle} onUpdate={(d) => updateData(3, d)} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 4 && (
          <StepLight data={data.light} onUpdate={(d) => updateData(4, d)} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 5 && (
          <StepClosing data={data.closing} onUpdate={(d) => updateData(5, d)} onComplete={handleComplete} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}

export default App;
