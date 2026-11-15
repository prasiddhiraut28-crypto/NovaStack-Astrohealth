import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { evaluateAstronautRisk } from '../utils/riskPredictor';
import { soundTelemetry } from '../utils/audioAlerts';

const TelemetryContext = createContext(null);

const INITIAL_CREW = {
  elena: {
    id: 'elena',
    name: 'Cmdr. Elena Vance',
    role: 'Mission Commander (EVA Lead)',
    location: 'Airlock / External Truss EVA-2',
    avatar: '👩‍🚀',
    bloodType: 'O-Negative',
    age: 39,
    missionDay: 42,
    vitals: {
      heartRate: 78,
      spO2: 98,
      coreTemp: 37.1,
      respirationRate: 15,
      bloodPressureSys: 118,
      bloodPressureDia: 76,
      hydration: 88,
    },
    fatigue: {
      sleepHoursLastNight: 6.8,
      sleepDebtHours: 1.2,
      hrvMs: 65,
      cognitiveFatigueScore: 24,
      wakefulnessHours: 7.5,
      circadianPhase: 'High Alertness (Peak)',
    },
    vitalsHistory: [],
  },
  alex: {
    id: 'alex',
    name: 'Dr. Alex Chen',
    role: 'Chief Science Officer',
    location: 'Columbus Science Laboratory',
    avatar: '👨‍🔬',
    bloodType: 'A-Positive',
    age: 36,
    missionDay: 42,
    vitals: {
      heartRate: 72,
      spO2: 99,
      coreTemp: 36.9,
      respirationRate: 14,
      bloodPressureSys: 115,
      bloodPressureDia: 74,
      hydration: 92,
    },
    fatigue: {
      sleepHoursLastNight: 7.2,
      sleepDebtHours: 0.8,
      hrvMs: 72,
      cognitiveFatigueScore: 18,
      wakefulnessHours: 5.2,
      circadianPhase: 'Stable Daytime',
    },
    vitalsHistory: [],
  },
  marcus: {
    id: 'marcus',
    name: 'Eng. Marcus Rivera',
    role: 'Flight Systems Engineer',
    location: 'Node 3 Tranquility (ECLSS)',
    avatar: '👨‍🚀',
    bloodType: 'B-Positive',
    age: 41,
    missionDay: 42,
    vitals: {
      heartRate: 82,
      spO2: 97,
      coreTemp: 37.2,
      respirationRate: 16,
      bloodPressureSys: 122,
      bloodPressureDia: 80,
      hydration: 82,
    },
    fatigue: {
      sleepHoursLastNight: 5.4,
      sleepDebtHours: 2.6,
      hrvMs: 48,
      cognitiveFatigueScore: 42,
      wakefulnessHours: 11.0,
      circadianPhase: 'Post-Prandial Dip',
    },
    vitalsHistory: [],
  },
};

const INITIAL_ENVIRONMENT = {
  cabinTemp: 21.4,
  humidity: 48,
  co2Ppm: 1850,
  pressurePsi: 14.7,
  radiationMicroSv: 12.4,
  o2Percent: 20.9,
};

export function TelemetryProvider({ children }) {
  const [crew, setCrew] = useState(() => {
    const populated = { ...INITIAL_CREW };
    Object.keys(populated).forEach((key) => {
      const ast = populated[key];
      const history = [];
      const now = Date.now();
      for (let i = 20; i >= 0; i--) {
        history.push({
          time: new Date(now - i * 1500).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          heartRate: ast.vitals.heartRate + (Math.floor(Math.random() * 5) - 2),
          spO2: ast.vitals.spO2,
          coreTemp: ast.vitals.coreTemp,
          co2Ppm: INITIAL_ENVIRONMENT.co2Ppm,
        });
      }
      ast.vitalsHistory = history;
    });
    return populated;
  });

  const [selectedAstronautId, setSelectedAstronautId] = useState('elena');
  const [environment, setEnvironment] = useState(INITIAL_ENVIRONMENT);
  const [activeScenario, setActiveScenario] = useState('nominal');
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [emergencyAcknowledged, setEmergencyAcknowledged] = useState(false);
  const [currentView, setCurrentView] = useState('hud');
  const [commsDelay, setCommsDelay] = useState('LEO');
  const [metSeconds, setMetSeconds] = useState(42 * 86400 + 14 * 3600 + 28 * 60 + 12);
  const [logs, setLogs] = useState([
    { id: 1, time: '14:27:50', text: 'Telemetry synchronization established via TDRS-12 satellite.', type: 'info' },
    { id: 2, time: '14:28:01', text: 'ECLSS primary scrubbers operating in nominal dual-loop cycle.', type: 'info' },
    { id: 3, time: '14:28:10', text: 'Commander Vance initiated EVA tether checklist.', type: 'info' },
  ]);

  const activeAstronaut = crew[selectedAstronautId];
  const riskReport = evaluateAstronautRisk(activeAstronaut.vitals, activeAstronaut.fatigue, environment);

  const prevRiskLevelRef = useRef(riskReport.level);

  const addLog = (text, type = 'info') => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [{ id: Date.now() + Math.random(), time: timeStr, text, type }, ...prev.slice(0, 49)]);
  };

  const toggleSound = () => {
    const muted = soundTelemetry.toggleMute();
    setIsSoundMuted(muted);
    addLog(muted ? 'Telemetry audio synthesizer muted.' : 'Telemetry audio synthesizer unmuted.', 'info');
  };

  const triggerEmergencySOS = (reason = 'Manual Astronaut Emergency Trigger') => {
    setIsEmergencyActive(true);
    setEmergencyAcknowledged(false);
    soundTelemetry.startEmergencyAlarm();
    addLog(`🚨 EMERGENCY SOS DISPATCHED TO MISSION CONTROL: ${reason}`, 'critical');
  };

  const silenceAlarm = () => {
    soundTelemetry.stopEmergencyAlarm();
    setEmergencyAcknowledged(true);
    addLog('Emergency auditory siren acknowledged and silenced by operator.', 'warning');
  };

  const resolveEmergency = () => {
    soundTelemetry.stopEmergencyAlarm();
    setIsEmergencyActive(false);
    setEmergencyAcknowledged(false);
    setActiveScenario('nominal');
    addLog('Medical condition stabilized. Emergency status cleared by flight surgeon.', 'success');
  };

  const setScenario = (scenario) => {
    setActiveScenario(scenario);
    addLog(`Simulation scenario switched to: [${scenario.toUpperCase()}]`, 'warning');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMetSeconds((prev) => prev + 1);

      if (!isSoundMuted && currentView === 'hud') {
        const isCritical = riskReport.level === 'CRITICAL';
        soundTelemetry.playHeartBeep(isCritical);
      }

      setCrew((prevCrew) => {
        const updated = { ...prevCrew };
        const ast = { ...updated[selectedAstronautId] };
        const vitals = { ...ast.vitals };
        const fatigue = { ...ast.fatigue };

        if (activeScenario === 'nominal') {
          vitals.heartRate = Math.round(vitals.heartRate + (74 - vitals.heartRate) * 0.15 + (Math.random() * 2 - 1));
          vitals.spO2 = Math.min(99, Math.max(97, Math.round(vitals.spO2 + (98 - vitals.spO2) * 0.2 + (Math.random() * 0.6 - 0.3))));
          vitals.coreTemp = Number((vitals.coreTemp + (37.0 - vitals.coreTemp) * 0.1).toFixed(1));
          vitals.respirationRate = Math.round(vitals.respirationRate + (14 - vitals.respirationRate) * 0.2);
          vitals.hydration = Math.max(80, vitals.hydration);
          fatigue.cognitiveFatigueScore = Math.max(15, Math.min(30, fatigue.cognitiveFatigueScore));
        } else if (activeScenario === 'eva_exertion') {
          vitals.heartRate = Math.min(155, Math.round(vitals.heartRate + (142 - vitals.heartRate) * 0.2 + (Math.random() * 3 - 1.5)));
          vitals.spO2 = Math.min(98, Math.max(94, Math.round(vitals.spO2 + (95 - vitals.spO2) * 0.1)));
          vitals.coreTemp = Number(Math.min(38.8, vitals.coreTemp + 0.05).toFixed(1));
          vitals.respirationRate = Math.min(28, Math.round(vitals.respirationRate + (24 - vitals.respirationRate) * 0.2));
          vitals.hydration = Math.max(55, Number((vitals.hydration - 0.1).toFixed(1)));
        } else if (activeScenario === 'hypoxia') {
          vitals.spO2 = Math.max(82, Math.round(vitals.spO2 - 1.2));
          vitals.heartRate = Math.min(148, Math.round(vitals.heartRate + 2.5));
          vitals.respirationRate = Math.min(30, Math.round(vitals.respirationRate + 1.2));
        } else if (activeScenario === 'severe_fatigue') {
          fatigue.sleepDebtHours = Math.min(8.0, Number((fatigue.sleepDebtHours + 0.05).toFixed(2)));
          fatigue.cognitiveFatigueScore = Math.min(95, Math.round(fatigue.cognitiveFatigueScore + 1.5));
          fatigue.hrvMs = Math.max(18, Math.round(fatigue.hrvMs - 1.2));
          vitals.heartRate = Math.round(vitals.heartRate + (86 - vitals.heartRate) * 0.1);
        } else if (activeScenario === 'arrhythmia') {
          const spike = Math.random() > 0.5 ? 14 : -10;
          vitals.heartRate = Math.min(160, Math.max(55, vitals.heartRate + spike));
          vitals.bloodPressureSys = Math.min(165, Math.max(100, vitals.bloodPressureSys + (Math.random() * 6 - 3)));
        } else if (activeScenario === 'dehydration') {
          vitals.hydration = Math.max(42, Number((vitals.hydration - 0.4).toFixed(1)));
          vitals.heartRate = Math.min(115, Math.round(vitals.heartRate + 0.8));
          vitals.coreTemp = Number(Math.min(38.2, vitals.coreTemp + 0.04).toFixed(1));
        }

        ast.vitals = vitals;
        ast.fatigue = fatigue;

        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newHist = [...ast.vitalsHistory.slice(-24), {
          time: timeStr,
          heartRate: vitals.heartRate,
          spO2: vitals.spO2,
          coreTemp: vitals.coreTemp,
          co2Ppm: environment.co2Ppm,
        }];
        ast.vitalsHistory = newHist;

        updated[selectedAstronautId] = ast;
        return updated;
      });

      setEnvironment((prev) => {
        let co2 = prev.co2Ppm;
        let press = prev.pressurePsi;
        let rad = prev.radiationMicroSv;
        let temp = prev.cabinTemp;
        let hum = prev.humidity;

        if (activeScenario === 'co2_spike') {
          co2 = Math.min(5200, co2 + 85);
        } else if (activeScenario === 'decompression') {
          press = Math.max(11.8, Number((press - 0.08).toFixed(2)));
        } else {
          co2 = Math.round(co2 + (1900 - co2) * 0.1 + (Math.random() * 20 - 10));
          press = Number((press + (14.7 - press) * 0.1).toFixed(2));
          rad = Number((rad + (12.4 - rad) * 0.1 + (Math.random() * 0.4 - 0.2)).toFixed(1));
          temp = Number((temp + (21.4 - temp) * 0.05 + (Math.random() * 0.1 - 0.05)).toFixed(1));
          hum = Math.round(hum + (48 - hum) * 0.05 + (Math.random() * 2 - 1));
        }

        return { ...prev, co2Ppm: co2, pressurePsi: press, radiationMicroSv: rad, cabinTemp: temp, humidity: hum };
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [selectedAstronautId, activeScenario, isSoundMuted, currentView, environment.co2Ppm]);

  useEffect(() => {
    if (riskReport.level === 'CRITICAL' && prevRiskLevelRef.current !== 'CRITICAL') {
      soundTelemetry.playCautionChime();
      soundTelemetry.startEmergencyAlarm();
      setIsEmergencyActive(true);
      addLog(`CRITICAL ANOMALY DETECTED for ${activeAstronaut.name}: ${riskReport.anomalies[0]?.title}`, 'critical');
    }
    prevRiskLevelRef.current = riskReport.level;
  }, [riskReport.level, activeAstronaut.name]);

  const formatMET = (totalSec) => {
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `MET ${String(days).padStart(3, '0')}:${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const value = {
    crew,
    activeAstronaut,
    selectedAstronautId,
    setSelectedAstronautId,
    environment,
    riskReport,
    activeScenario,
    setScenario,
    isSoundMuted,
    toggleSound,
    isEmergencyActive,
    emergencyAcknowledged,
    triggerEmergencySOS,
    silenceAlarm,
    resolveEmergency,
    currentView,
    setCurrentView,
    commsDelay,
    setCommsDelay,
    metString: formatMET(metSeconds),
    logs,
    addLog,
  };

  return <TelemetryContext.Provider value={value}>{children}</TelemetryContext.Provider>;
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
}
