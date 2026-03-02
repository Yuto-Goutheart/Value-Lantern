import { useState, useEffect } from 'react';
import type { LanternData, Step } from './types';
import StartScreen from './components/StartScreen';
import StepFlame from './components/StepFlame';
import StepProtection from './components/StepProtection';
import StepHandle from './components/StepHandle';
import StepLight from './components/StepLight';
import StepClosing from './components/StepClosing';
import ResultsScreen from './components/ResultsScreen';
import ApiKeyModal from './components/ApiKeyModal';
import { useSpeechContext } from './contexts/SpeechContext';

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
      const parsed = parseInt(stepRaw ?? '');
      const VALID: Step[] = [1, 2, 3, 4, 5];
      const step: Step = VALID.includes(parsed as Step) ? (parsed as Step) : 1;
      return { data, step, started: true };
    }
  } catch { /* ignore */ }
  return { data: initialData, step: 1, started: false };
}

const _initial = loadFromStorage();

function App() {
  const [started, setStarted] = useState(_initial.started);
  const [currentStep, setCurrentStep] = useState<Step>(_initial.step);
  const [data, setData] = useState<LanternData>(_initial.data);
  const [showResults, setShowResults] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const { pendingCallback } = useSpeechContext();

  // pendingCallback がセットされたらモーダルを開く
  useEffect(() => {
    if (pendingCallback) setShowApiKeyModal(true);
  }, [pendingCallback]);

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
      [getDataKey(step)]: { ...prev[getDataKey(step)], ...stepData },
    }));
  };

  const handleNext = () => { if (currentStep < 5) setCurrentStep((currentStep + 1) as Step); };
  const handleBack = () => { if (currentStep > 1) setCurrentStep((currentStep - 1) as Step); };
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

  const modal = showApiKeyModal ? (
    <ApiKeyModal onClose={() => setShowApiKeyModal(false)} />
  ) : null;

  if (!started) return <>{modal}<StartScreen onStart={handleStart} /></>;

  if (showResults) {
    return (
      <>
        {modal}
        <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
          <ResultsScreen data={data} onReset={handleReset} />
        </div>
      </>
    );
  }

  return (
    <>
      {modal}
      <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        {currentStep === 1 && (
          <StepFlame data={data.flame} onUpdate={(d) => updateData(1, d)} onNext={handleNext} allData={data} />
        )}
        {currentStep === 2 && (
          <StepProtection data={data.protection} onUpdate={(d) => updateData(2, d)} onNext={handleNext} onBack={handleBack} allData={data} />
        )}
        {currentStep === 3 && (
          <StepHandle data={data.handle} onUpdate={(d) => updateData(3, d)} onNext={handleNext} onBack={handleBack} allData={data} />
        )}
        {currentStep === 4 && (
          <StepLight data={data.light} onUpdate={(d) => updateData(4, d)} onNext={handleNext} onBack={handleBack} allData={data} />
        )}
        {currentStep === 5 && (
          <StepClosing data={data.closing} onUpdate={(d) => updateData(5, d)} onComplete={handleComplete} onBack={handleBack} allData={data} />
        )}
      </div>
    </>
  );
}

export default App;
