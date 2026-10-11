/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  AlertCircle, 
  RotateCcw,
  CheckCircle2,
  Download,
  Volume2,
  VolumeX,
  Building,
  Languages,
  PlusCircle,
  Trash2,
  Sparkles,
  Award,
  AlertTriangle,
  ArrowRight,
  Info,
  Radio,
  Flame,
  Stethoscope,
  Footprints,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { DRILL_SCENARIOS, DrillScenario, RoleId, ScenarioStage } from './data/scenariosData';
import { translations, Language } from './data/translations';
import { ScenarioIllustration } from './components/ScenarioIllustration';
import { generatePdfReport, ScenarioResultRecord } from './utils/generatePdfReport';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';

type AppPhase = 'SPLASH_SETUP' | 'GAMEPLAY' | 'STAGE_FEEDBACK' | 'FINAL_DASHBOARD';

interface Participant {
  id: string;
  name: string;
  employeeId: string;
  role: RoleId;
}

const AVAILABLE_ROLES: { id: RoleId; labelEn: string; labelAr: string }[] = [
  { id: 'teamLeader', labelEn: 'Team Leader', labelAr: 'قائد الفريق' },
  { id: 'fireSuppression', labelEn: 'Fire Suppression', labelAr: 'مكافحة الحريق' },
  { id: 'casualtyCare', labelEn: 'Casualty Care', labelAr: 'الإسعافات الأولية' },
  { id: 'evacuation', labelEn: 'Evacuation', labelAr: 'الإخلاء والتوجيه' },
  { id: 'communications', labelEn: 'Communications', labelAr: 'الاتصالات والبلاغات' },
];

export default function App() {
  // Language State (English default, toggleable to Arabic)
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];
  const isRtl = lang === 'ar';

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // App Phase
  const [phase, setPhase] = useState<AppPhase>('SPLASH_SETUP');

  // Participants (3 to 5 participants, first pre-selected as Team Leader)
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'p1', name: '', employeeId: '', role: 'teamLeader' },
    { id: 'p2', name: '', employeeId: '', role: 'fireSuppression' },
    { id: 'p3', name: '', employeeId: '', role: 'casualtyCare' },
  ]);

  // Overall Session Countdown Timer (35:00 minutes total drill pacing)
  const [totalTimeLeft, setTotalTimeLeft] = useState(35 * 60);
  const [timerActive, setTimerActive] = useState(false);

  // Multi-Scenario Progression State
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const currentScenario = DRILL_SCENARIOS[currentScenarioIndex] || DRILL_SCENARIOS[0];

  // Multi-Stage progression within current scenario (Stage 1 or Stage 2)
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage: ScenarioStage = currentScenario.stages[currentStageIndex] || currentScenario.stages[0];

  // Active Role Turn index within the stage (0 to participants.length - 1)
  const [activeRoleStepIndex, setActiveRoleStepIndex] = useState(0);

  // Selected decisions for the active stage: roleId -> optionId
  const [currentStageDecisions, setCurrentStageDecisions] = useState<Record<string, string>>({});

  // Scenario Stage Scores & Attempts tracking
  const [stage1Score, setStage1Score] = useState<number | null>(null);
  const [scenarioAttempts, setScenarioAttempts] = useState<Record<string, number>>({});
  const [completedScenarios, setCompletedScenarios] = useState<Record<string, {
    score: number;
    passed: boolean;
  }>>({});

  // Feedback State for current stage/scenario
  const [lastGrade, setLastGrade] = useState(0);
  const [lastPassed, setLastPassed] = useState(false);
  const [lastWhyFailed, setLastWhyFailed] = useState<string[]>([]);
  const [lastDoneRight, setLastDoneRight] = useState<string[]>([]);
  const [isFinalStageOfScenario, setIsFinalStageOfScenario] = useState(false);

  // Smooth scroll to top utility
  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Audio tone generator
  const playSound = useCallback((freq = 520, type: OscillatorType = 'sine', duration = 0.15) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // AudioContext unavailable
    }
  }, [soundEnabled]);

  // Session timer ticker
  useEffect(() => {
    let interval: any;
    if (timerActive && totalTimeLeft > 0) {
      interval = setInterval(() => {
        setTotalTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, totalTimeLeft]);

  // Seamless scroll to top on any navigation event
  useEffect(() => {
    scrollToTop();
  }, [phase, currentScenarioIndex, currentStageIndex, activeRoleStepIndex, scrollToTop]);

  // Format time mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Participant Management
  const handleAddParticipant = () => {
    if (participants.length >= 5) return;
    const takenRoles = new Set(participants.map(p => p.role));
    const nextRole = AVAILABLE_ROLES.find(r => !takenRoles.has(r.id))?.id || 'evacuation';
    setParticipants(prev => [
      ...prev,
      { id: `p${Date.now()}`, name: '', employeeId: '', role: nextRole }
    ]);
    playSound(480, 'sine', 0.1);
  };

  const handleRemoveParticipant = (index: number) => {
    if (participants.length <= 3) return;
    setParticipants(prev => prev.filter((_, i) => i !== index));
    playSound(380, 'sine', 0.1);
  };

  const handleUpdateParticipant = (index: number, field: keyof Participant, value: string) => {
    setParticipants(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Quick autofill for ease of demonstration / testing
  const handleQuickFill = () => {
    setParticipants([
      { id: 'p1', name: lang === 'ar' ? 'سارة العتيبي' : 'Sarah Al-Otaibi', employeeId: 'KSIA-4102', role: 'teamLeader' },
      { id: 'p2', name: lang === 'ar' ? 'ماجد الشهري' : 'Majed Al-Shehri', employeeId: 'KSIA-3298', role: 'fireSuppression' },
      { id: 'p3', name: lang === 'ar' ? 'فهد القحطاني' : 'Fahad Al-Qahtani', employeeId: 'KSIA-5514', role: 'casualtyCare' },
      { id: 'p4', name: lang === 'ar' ? 'نورة الدوسري' : 'Noura Al-Dossary', employeeId: 'KSIA-6201', role: 'communications' }
    ]);
    playSound(600, 'triangle', 0.15);
  };

  // Validation: 3 to 5 participants, non-empty, unique roles, Team Leader present
  const isSetupValid = useMemo(() => {
    if (participants.length < 3 || participants.length > 5) return false;
    const allFilled = participants.every(p => p.name.trim().length >= 2 && p.employeeId.trim().length >= 2);
    const rolesSet = new Set(participants.map(p => p.role));
    const uniqueRoles = rolesSet.size === participants.length;
    const hasLeader = participants.some(p => p.role === 'teamLeader');
    return allFilled && uniqueRoles && hasLeader;
  }, [participants]);

  // Start drill
  const handleStartDrill = () => {
    if (!isSetupValid) return;
    setPhase('GAMEPLAY');
    setCurrentScenarioIndex(0);
    setCurrentStageIndex(0);
    setActiveRoleStepIndex(0);
    setCurrentStageDecisions({});
    setStage1Score(null);
    setTimerActive(true);
    playSound(620, 'triangle', 0.25);
  };

  // Select decision option for active role in the active stage
  const handleSelectOption = (roleId: RoleId, optionId: string) => {
    setCurrentStageDecisions(prev => ({
      ...prev,
      [roleId]: optionId
    }));
    playSound(540, 'sine', 0.1);
  };

  // Evaluate current stage decisions
  const handleSubmitStage = () => {
    const activeParticipants = participants;
    let totalScore = 0;
    const whyFailedList: string[] = [];
    const doneRightList: string[] = [];

    activeParticipants.forEach(participant => {
      const decisionData = currentStage.decisions[participant.role];
      if (!decisionData) return;
      const chosenOptionId = currentStageDecisions[participant.role];
      const option = decisionData.options.find(o => o.id === chosenOptionId);

      if (option) {
        totalScore += option.score;
        if (option.isCorrect) {
          doneRightList.push(lang === 'ar' 
            ? `${t[participant.role]}: ${option.feedbackAr}`
            : `${participant.role}: ${option.feedbackEn}`);
        } else {
          whyFailedList.push(lang === 'ar'
            ? `${t[participant.role]}: ${option.feedbackAr}`
            : `${participant.role}: ${option.feedbackEn}`);
        }
      } else {
        whyFailedList.push(lang === 'ar' 
          ? `لم يتم اتخاذ إجراء لدور ${t[participant.role]}`
          : `No action selected for ${participant.role}`);
      }
    });

    const averageStageScore = Math.round(totalScore / activeParticipants.length);
    const isStagePassed = averageStageScore >= 70;
    const isFinalStage = currentStageIndex === currentScenario.stages.length - 1;

    setLastGrade(averageStageScore);
    setLastPassed(isStagePassed);
    setLastWhyFailed(whyFailedList);
    setLastDoneRight(doneRightList);
    setIsFinalStageOfScenario(isFinalStage);

    // Track attempts
    const currentAttempts = (scenarioAttempts[currentScenario.id] || 0) + 1;
    setScenarioAttempts(prev => ({ ...prev, [currentScenario.id]: currentAttempts }));

    if (isStagePassed) {
      if (!isFinalStage) {
        // Passed Stage 1: Store score and get ready for Stage 2
        setStage1Score(averageStageScore);
        playSound(700, 'sine', 0.25);
      } else {
        // Passed Stage 2: Calculate overall scenario average
        const combinedScore = stage1Score !== null 
          ? Math.round((stage1Score + averageStageScore) / 2)
          : averageStageScore;

        setCompletedScenarios(prev => ({
          ...prev,
          [currentScenario.id]: {
            score: combinedScore,
            passed: true
          }
        }));
        confetti({ particleCount: 90, spread: 65, origin: { y: 0.6 } });
        playSound(820, 'sine', 0.35);
      }
    } else {
      playSound(280, 'sawtooth', 0.4);
    }

    setPhase('STAGE_FEEDBACK');
  };

  // Retry failed stage/scenario
  const handleRetryScenario = () => {
    setCurrentStageIndex(0);
    setActiveRoleStepIndex(0);
    setCurrentStageDecisions({});
    setStage1Score(null);
    setPhase('GAMEPLAY');
    playSound(480, 'triangle', 0.2);
  };

  // Advance to Stage 2 of the same scenario
  const handleProceedToStage2 = () => {
    setCurrentStageIndex(1);
    setActiveRoleStepIndex(0);
    setCurrentStageDecisions({});
    setPhase('GAMEPLAY');
    playSound(600, 'sine', 0.2);
  };

  // Advance to next scenario (or Final Dashboard if done all 5)
  const handleProceedNextScenario = () => {
    if (currentScenarioIndex < DRILL_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setCurrentStageIndex(0);
      setActiveRoleStepIndex(0);
      setCurrentStageDecisions({});
      setStage1Score(null);
      setPhase('GAMEPLAY');
      playSound(660, 'sine', 0.2);
    } else {
      // Completed all 5 scenarios
      setPhase('FINAL_DASHBOARD');
      confetti({ particleCount: 150, spread: 85, origin: { y: 0.5 } });
      playSound(880, 'sine', 0.45);
    }
  };

  // Overall drill score calculation across all completed scenarios
  const overallDrillScore = useMemo(() => {
    const scores = Object.values(completedScenarios).map(s => s.score);
    if (scores.length === 0) return 0;
    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / scores.length);
  }, [completedScenarios]);

  // Download PDF Report (English Only per instructions)
  const handleDownloadPdf = () => {
    const scenarioResults: ScenarioResultRecord[] = DRILL_SCENARIOS.map((sc) => {
      const result = completedScenarios[sc.id];
      return {
        level: sc.level,
        scenarioId: sc.id,
        titleEn: sc.titleEn,
        score: result ? result.score : 0,
        attempts: scenarioAttempts[sc.id] || 1,
        passed: result ? result.passed : false,
        correctDecisions: [],
        mistakes: []
      };
    });

    const reportData = {
      participants: participants.map(p => ({
        id: p.id,
        name: p.name,
        employeeId: p.employeeId,
        role: p.role
      })),
      scenarioResults,
      overallScore: overallDrillScore,
      passed: overallDrillScore >= 70,
      totalTimeSeconds: 35 * 60 - totalTimeLeft,
      dateStr: new Date().toLocaleDateString('en-GB')
    };

    generatePdfReport(reportData);
    playSound(600, 'sine', 0.2);
  };

  // Reset entire drill
  const handleRestartAll = () => {
    setPhase('SPLASH_SETUP');
    setCurrentScenarioIndex(0);
    setCurrentStageIndex(0);
    setActiveRoleStepIndex(0);
    setCurrentStageDecisions({});
    setCompletedScenarios({});
    setScenarioAttempts({});
    setStage1Score(null);
    setTotalTimeLeft(35 * 60);
    setTimerActive(false);
    playSound(420, 'sine', 0.15);
  };

  // Role icon helper
  const getRoleIcon = (roleId: RoleId) => {
    switch (roleId) {
      case 'teamLeader': return <Shield className="w-3.5 h-3.5 text-red-400" />;
      case 'fireSuppression': return <Flame className="w-3.5 h-3.5 text-amber-400" />;
      case 'casualtyCare': return <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />;
      case 'evacuation': return <Footprints className="w-3.5 h-3.5 text-blue-400" />;
      case 'communications': return <Radio className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-[#05080f] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 ${isRtl ? 'font-arabic' : ''}`}
    >
      <OfflineIndicator />

      {/* Mobile-Optimized Clean Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#090e18]/95 backdrop-blur-md border-b border-slate-800/80 px-3.5 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-amber-500/10 rounded-lg border border-amber-500/25 shrink-0">
            <Building className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold tracking-tight text-white">
                KSIA ERT
              </span>
              <span className="text-[9px] bg-amber-500/15 text-amber-400 px-1.5 py-0.2 rounded font-bold border border-amber-500/30">
                OFFICES
              </span>
            </div>
            <p className="text-[9px] text-slate-400 leading-tight hidden xs:block truncate max-w-[170px] sm:max-w-none">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Audio, Timer, Language Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
            title={soundEnabled ? 'Mute' : 'Unmute'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />}
          </button>

          {timerActive && (
            <div className="flex items-center gap-1 px-2 py-1 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px] font-mono font-bold text-amber-400">
              <Clock className="w-3 h-3 text-amber-500 shrink-0" />
              <span>{formatTime(totalTimeLeft)}</span>
            </div>
          )}

          {/* Language Switcher in Top Right Corner */}
          <button
            onClick={() => {
              setLang(prev => (prev === 'en' ? 'ar' : 'en'));
              playSound(520, 'sine', 0.1);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/90 hover:bg-slate-700/90 border border-amber-500/30 text-amber-300 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
            title={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            aria-label="Language Toggle"
          >
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <PWAInstallButton />
        </div>
      </header>

      {/* Main Responsive Mobile Viewport Container */}
      <main className="flex-1 w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-3.5 sm:px-4 py-4 sm:py-6">
        <AnimatePresence mode="wait">

          {/* =========================================================================
              PHASE 1: SPLASH & TEAM SETUP SCREEN
             ========================================================================= */}
          {phase === 'SPLASH_SETUP' && (
            <motion.div 
              key="splash"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              {/* Intro Card */}
              <div className="bg-gradient-to-br from-[#0c1424] to-[#070b14] border border-amber-500/25 rounded-2xl p-4 sm:p-5 text-center space-y-2.5 shadow-xl relative overflow-hidden">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-[11px] font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>KSIA ADMINISTRATION ERT</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t.splashTitle}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  {t.splashDesc}
                </p>

                <div className="pt-1.5 flex flex-wrap justify-center gap-2 text-[10px] sm:text-[11px] text-slate-400 font-medium">
                  <span className="bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800">
                    ⏱️ 30 - 45 min
                  </span>
                  <span className="bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800">
                    👥 3 - 5 Participants
                  </span>
                  <span className="bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800 text-amber-400">
                    🎯 Pass Mark: 70/100
                  </span>
                </div>
              </div>

              {/* Roster Registration Section */}
              <div className="bg-[#090e18] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-500" />
                      {t.teamSetupTitle}
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {t.groupRequirement}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickFill}
                    className="text-[10px] sm:text-xs text-amber-400 hover:text-amber-300 underline font-semibold transition-colors"
                  >
                    {lang === 'ar' ? 'تعبئة تجريبية سريعة' : 'Quick Autofill'}
                  </button>
                </div>

                {/* Participant Forms */}
                <div className="space-y-3">
                  {participants.map((participant, index) => {
                    const isLeader = index === 0;
                    const otherSelectedRoles = participants
                      .filter((_, i) => i !== index)
                      .map(p => p.role);

                    return (
                      <div 
                        key={participant.id} 
                        className={`p-3 sm:p-3.5 rounded-xl border transition-all ${
                          isLeader 
                            ? 'bg-amber-500/[0.04] border-amber-500/30' 
                            : 'bg-slate-900/70 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 text-[10px] font-black flex items-center justify-center">
                              {index + 1}
                            </span>
                            {t.participant} #{index + 1}
                            {isLeader && (
                              <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                                {lang === 'ar' ? 'الرئيسي' : 'Primary'}
                              </span>
                            )}
                          </span>

                          {!isLeader && participants.length > 3 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveParticipant(index)}
                              className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                            >
                              <Trash2 className="w-3 h-3" />
                              {t.removeMember}
                            </button>
                          )}
                        </div>

                        {/* Name and Employee ID Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                              {t.nameLabel} *
                            </label>
                            <input
                              type="text"
                              value={participant.name}
                              onChange={(e) => handleUpdateParticipant(index, 'name', e.target.value)}
                              placeholder={t.namePlaceholder}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                              {t.idLabel} *
                            </label>
                            <input
                              type="text"
                              value={participant.employeeId}
                              onChange={(e) => handleUpdateParticipant(index, 'employeeId', e.target.value)}
                              placeholder={t.idPlaceholder}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Role Selector */}
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                            {t.roleLabel} *
                          </label>
                          {isLeader ? (
                            <div className="bg-slate-950 border border-amber-500/40 rounded-lg px-3 py-2 text-xs font-bold text-amber-400 flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <Shield className="w-3.5 h-3.5 text-red-400" />
                                {t.teamLeader}
                              </span>
                              <span className="text-[10px] text-slate-400 font-normal">
                                {lang === 'ar' ? '(مثبّت كقائد)' : '(Pre-selected)'}
                              </span>
                            </div>
                          ) : (
                            <select
                              value={participant.role}
                              onChange={(e) => handleUpdateParticipant(index, 'role', e.target.value as RoleId)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                            >
                              {AVAILABLE_ROLES.filter(r => r.id !== 'teamLeader').map(roleOption => {
                                const isTaken = otherSelectedRoles.includes(roleOption.id);
                                return (
                                  <option 
                                    key={roleOption.id} 
                                    value={roleOption.id}
                                    disabled={isTaken}
                                  >
                                    {lang === 'ar' ? roleOption.labelAr : roleOption.labelEn}
                                    {isTaken ? ` (${lang === 'ar' ? 'مختار' : 'Taken'})` : ''}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                          <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                            {t[`${participant.role}Desc` as keyof typeof t]}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add member button if < 5 */}
                {participants.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddParticipant}
                    className="w-full py-2.5 border border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl text-xs text-slate-400 hover:text-amber-400 font-semibold flex items-center justify-center gap-2 transition-colors active:scale-98"
                  >
                    <PlusCircle className="w-4 h-4" />
                    {t.addMember} ({participants.length}/5)
                  </button>
                )}

                {!isSetupValid && (
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-400 flex items-center gap-2">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>{t.fillAllFieldsError}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleStartDrill}
                  disabled={!isSetupValid}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black rounded-xl text-sm sm:text-base tracking-wide transition-all shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>{t.startDrill}</span>
                  <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              PHASE 2: GAMEPLAY (MULTI-STAGE SCENARIO FLOW)
             ========================================================================= */}
          {phase === 'GAMEPLAY' && (
            <motion.div 
              key={`gameplay-${currentScenario.id}-${currentStage.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              {/* Level & Stage Progress Indicators */}
              <div className="bg-[#090e18] border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono font-bold text-[10px]">
                    {t.level} {currentScenario.level} / {DRILL_SCENARIOS.length}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px]">
                    {t.stage} {currentStage.stageNumber} / {currentScenario.stages.length}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {DRILL_SCENARIOS.map((sc, i) => {
                    const isDone = completedScenarios[sc.id]?.passed;
                    const isCurrent = i === currentScenarioIndex;
                    return (
                      <div
                        key={sc.id}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          isDone 
                            ? 'bg-emerald-500 ring-2 ring-emerald-500/30' 
                            : isCurrent 
                            ? 'bg-amber-500 scale-125 ring-2 ring-amber-500/30' 
                            : 'bg-slate-800'
                        }`}
                        title={sc.titleEn}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Scenario Context Card with Illustration */}
              <div className="bg-[#090e18] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg">
                <div className="space-y-0.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {lang === 'ar' ? currentScenario.difficultyAr : `${currentScenario.difficulty} Complexity`}
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-white">
                    {lang === 'ar' ? currentScenario.titleAr : currentScenario.titleEn}
                  </h2>
                  <p className="text-[11px] text-amber-400 font-medium">
                    📍 {lang === 'ar' ? currentScenario.locationAr : currentScenario.locationEn}
                  </p>
                </div>

                {/* Illustration Component with Hyperrealistic Tactical Scene Feed */}
                <ScenarioIllustration 
                  type={currentScenario.visualType} 
                  stageNumber={currentStage.stageNumber} 
                />

                {/* Stage Situation Box */}
                <div className="bg-slate-900/90 border border-amber-500/20 rounded-xl p-3 space-y-1.5">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {lang === 'ar' ? currentStage.stageTitleAr : currentStage.stageTitleEn}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {lang === 'ar' ? currentStage.situationAr : currentStage.situationEn}
                  </p>
                </div>

                {/* Key indicators */}
                <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 font-medium pt-0.5">
                  <span className="bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
                    👥 {currentScenario.occupants} {t.occupantCount}
                  </span>
                  <span className="bg-slate-900 px-2 py-1 rounded-md border border-slate-800 text-red-400">
                    ⚠️ {lang === 'ar' ? currentScenario.casualtiesAr : currentScenario.casualtiesEn}
                  </span>
                </div>
              </div>

              {/* Collaborative Group Decision Card for Active Role */}
              {(() => {
                const activeParticipant = participants[activeRoleStepIndex] || participants[0];
                const activeRoleId = activeParticipant.role;
                const decisionPrompt = currentStage.decisions[activeRoleId];

                if (!decisionPrompt) return null;

                const selectedOptionId = currentStageDecisions[activeRoleId];
                const isAllAnswered = participants.every(p => currentStageDecisions[p.role]);
                const isCommunicationsRole = activeRoleId === 'communications';

                return (
                  <div className="bg-[#090e18] border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />

                    {/* Member's Turn Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] text-amber-400 uppercase tracking-wider font-bold block">
                          {t.turnNotice}
                        </span>
                        <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                          {getRoleIcon(activeRoleId)}
                          <span>{activeParticipant.name}</span>
                          <span className="text-xs text-slate-400 font-normal">
                            ({t[activeRoleId]})
                          </span>
                        </h3>
                      </div>

                      <div className="text-[10px] text-slate-400 font-mono">
                        {lang === 'ar' ? 'قرار' : 'Decision'} {activeRoleStepIndex + 1} / {participants.length}
                      </div>
                    </div>

                    {/* LNNH Protocol Badge if Communications */}
                    {isCommunicationsRole && (
                      <div className="p-2 bg-purple-500/15 border border-purple-500/30 rounded-xl text-[10px] text-purple-300 flex items-center gap-2">
                        <Radio className="w-4 h-4 shrink-0 text-purple-400" />
                        <span className="font-bold">{t.lnnhProtocolNote}</span>
                      </div>
                    )}

                    {/* Role Context & Question */}
                    <div className="space-y-1.5">
                      <p className="text-xs text-slate-400 italic">
                        {lang === 'ar' ? decisionPrompt.contextAr : decisionPrompt.contextEn}
                      </p>
                      <h4 className="text-xs sm:text-sm font-bold text-amber-300">
                        {lang === 'ar' ? decisionPrompt.questionAr : decisionPrompt.questionEn}
                      </h4>
                    </div>

                    {/* Group Discussion Note */}
                    <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[10px] text-blue-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                      <span>{t.teamDiscussionNote}</span>
                    </div>

                    {/* Exactly 4 Balanced-Length Options */}
                    <div className="space-y-2.5">
                      {decisionPrompt.options.map((option, optIdx) => {
                        const isSelected = selectedOptionId === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleSelectOption(activeRoleId, option.id)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all active:scale-98 flex items-start gap-3 ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-500 text-white font-medium shadow-md shadow-amber-500/10'
                                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                              isSelected 
                                ? 'bg-amber-500 text-amber-950 font-black' 
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1">
                              {lang === 'ar' ? option.textAr : option.textEn}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Turn Step Navigation Controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 gap-2">
                      <button
                        type="button"
                        disabled={activeRoleStepIndex === 0}
                        onClick={() => {
                          setActiveRoleStepIndex(prev => Math.max(0, prev - 1));
                          playSound(440, 'sine', 0.1);
                        }}
                        className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                        <span>{t.back}</span>
                      </button>

                      {activeRoleStepIndex < participants.length - 1 ? (
                        <button
                          type="button"
                          disabled={!selectedOptionId}
                          onClick={() => {
                            setActiveRoleStepIndex(prev => prev + 1);
                            playSound(520, 'sine', 0.1);
                          }}
                          className="px-5 py-2.5 rounded-lg bg-amber-500 text-amber-950 font-bold text-xs hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-md"
                        >
                          <span>{t.next}</span>
                          <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={!isAllAnswered}
                          onClick={handleSubmitStage}
                          className="px-6 py-2.5 rounded-lg bg-emerald-500 text-white font-black text-xs hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-98"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.submit}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* =========================================================================
              PHASE 3: STAGE & SCENARIO FEEDBACK (PASS / FAIL WITH WHY FAILED)
             ========================================================================= */}
          {phase === 'STAGE_FEEDBACK' && (
            <motion.div 
              key="feedback"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="space-y-4"
            >
              <div className={`p-5 rounded-2xl border text-center space-y-3 ${
                lastPassed 
                  ? 'bg-gradient-to-b from-emerald-950/40 to-[#090e18] border-emerald-500/40 shadow-xl' 
                  : 'bg-gradient-to-b from-red-950/40 to-[#090e18] border-red-500/40 shadow-xl'
              }`}>
                <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center ${
                  lastPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {lastPassed ? <CheckCircle2 className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
                </div>

                <div>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${
                    lastPassed ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {lastPassed ? t.passed : t.failed}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {lastPassed ? t.scenarioSuccessTitle : t.scenarioFailedTitle}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    {lang === 'ar' ? currentStage.stageTitleAr : currentStage.stageTitleEn}
                  </p>
                </div>

                {/* Score badge */}
                <div className="inline-block py-2 px-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{t.score}</div>
                  <div className={`text-4xl font-black font-mono ${
                    lastPassed ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {lastGrade} <span className="text-xs text-slate-500">/ 100</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{t.minPassingScore}</div>
                </div>
              </div>

              {/* IF FAILED: Clear Explanation of Why They Failed */}
              {!lastPassed && lastWhyFailed.length > 0 && (
                <div className="bg-[#090e18] border border-red-500/30 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs sm:text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{t.whyFailedTitle}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {lastWhyFailed.map((reason, i) => (
                      <li key={i} className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl leading-relaxed">
                        ⚠️ {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What You Did Right */}
              {lastDoneRight.length > 0 && (
                <div className="bg-[#090e18] border border-emerald-500/30 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{t.whatYouDidRightTitle}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {lastDoneRight.map((item, i) => (
                      <li key={i} className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl leading-relaxed">
                        ✓ {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons: Retry if failed, Proceed to Stage 2 or Next Level if passed */}
              <div className="pt-2">
                {!lastPassed ? (
                  <button
                    type="button"
                    onClick={handleRetryScenario}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.retryScenarioBtn}</span>
                  </button>
                ) : !isFinalStageOfScenario ? (
                  <button
                    type="button"
                    onClick={handleProceedToStage2}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-98"
                  >
                    <span>{t.proceedToStage2Btn}</span>
                    <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleProceedNextScenario}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98"
                  >
                    <span>{currentScenarioIndex < DRILL_SCENARIOS.length - 1 ? t.nextScenarioBtn : t.finalTitle}</span>
                    <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              PHASE 4: FINAL DASHBOARD & PDF DOWNLOAD
             ========================================================================= */}
          {phase === 'FINAL_DASHBOARD' && (
            <motion.div 
              key="final"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              {/* Victory Card */}
              <div className="bg-gradient-to-b from-[#0c1424] to-[#070b14] border border-amber-500/30 rounded-2xl p-5 sm:p-6 text-center space-y-3 shadow-xl">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono font-bold">
                    {t.finalSubtitle}
                  </span>
                  <h1 className="text-xl sm:text-3xl font-black text-white mt-1">
                    {t.finalTitle}
                  </h1>
                </div>

                <div className="py-2">
                  <div className="text-[11px] text-slate-400 uppercase font-bold">{t.overallScore}</div>
                  <div className="text-5xl sm:text-6xl font-black text-amber-400 font-mono">
                    {overallDrillScore} <span className="text-sm text-slate-500">/ 100</span>
                  </div>
                  <span className="inline-block mt-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold rounded-full">
                    ✓ {t.certifiedBadge}
                  </span>
                </div>
              </div>

              {/* All 5 scenarios breakdown */}
              <div className="bg-[#090e18] border border-slate-800 rounded-2xl p-4 space-y-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t.scenariosCompleted} ({DRILL_SCENARIOS.length} Levels)
                </h3>
                <div className="space-y-2">
                  {DRILL_SCENARIOS.map((sc) => {
                    const res = completedScenarios[sc.id];
                    const grade = res ? res.score : 0;
                    const attempts = scenarioAttempts[sc.id] || 1;
                    return (
                      <div 
                        key={sc.id}
                        className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-white">
                            {lang === 'ar' ? sc.titleAr : sc.titleEn}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            Level {sc.level} • 2 Stages • {attempts} {lang === 'ar' ? 'محاولات' : 'attempts'}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black font-mono text-emerald-400">
                            {grade}/100
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Team Roster Summary */}
              <div className="bg-[#090e18] border border-slate-800 rounded-2xl p-4 space-y-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t.teamSetupTitle}
                </h3>
                <div className="space-y-1.5">
                  {participants.map((p) => (
                    <div 
                      key={p.id}
                      className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-white block">{p.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{p.employeeId}</span>
                      </div>
                      <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                        {getRoleIcon(p.role)}
                        {t[p.role]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: PDF Download (English only per prompt) & Restart */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-98"
                >
                  <Download className="w-5 h-5" />
                  <span>{t.downloadPdf}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRestartAll}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors active:scale-98"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.restartDrill}</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
