import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { Sparkles } from 'lucide-react';

const SCENARIOS = [
  { id: 'nominal', label: 'Nominal Orbit', icon: '🚀', desc: 'Baseline resting astronaut vitals and balanced habitat environment.' },
  { id: 'eva_exertion', label: 'EVA Spacewalk', icon: '🧑‍🚀', desc: 'Heavy physical exertion outside airlock: elevated HR, body temp & respiration.' },
  { id: 'hypoxia', label: 'Hypoxia / Suit Leak', icon: '⚠️', desc: 'Arterial SpO2 desaturation dropping below 85% with compensatory tachycardia.' },
  { id: 'severe_fatigue', label: 'Severe Sleep Debt', icon: '😴', desc: 'Circadian collapse, 6+ hours sleep debt, HRV suppression, micro-sleep danger.' },
  { id: 'co2_spike', label: 'Cabin CO2 Spike', icon: '💨', desc: 'Life support CDRA failure pushing toxic CO2 > 4500 ppm.' },
  { id: 'arrhythmia', label: 'Cardiac Arrhythmia', icon: '💔', desc: 'Erratic ventricular tachycardic rhythm and fluctuating arterial pressure.' },
  { id: 'dehydration', label: 'Fluid Depletion', icon: '💧', desc: 'Spaceflight microgravity cephalic fluid shift causing hypovolemia.' },
  { id: 'decompression', label: 'Cabin Pressure Drop', icon: '🔻', desc: 'Micro-meteoroid breach causing rapid barometric decay.' },
];

export default function SimulationBar() {
  const { activeScenario, setScenario, crew, selectedAstronautId, setSelectedAstronautId } = useTelemetry();

  const currentDesc = SCENARIOS.find((s) => s.id === activeScenario)?.desc;

  return (
    <div className="w-full bg-slate-950/70 border-b border-cyan-500/15 px-4 sm:px-6 py-2.5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
          <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold shrink-0 flex items-center space-x-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SIMULATE:</span>
          </span>

          {SCENARIOS.map((s) => {
            const isActive = activeScenario === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setScenario(s.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${isActive ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400 font-bold shadow-md shadow-cyan-950' : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'}`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-2 shrink-0 font-mono text-xs">
          <span className="text-slate-500 uppercase text-[10px]">ASTRONAUT:</span>
          <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800">
            {Object.values(crew).map((ast) => (
              <button
                key={ast.id}
                onClick={() => setSelectedAstronautId(ast.id)}
                className={`px-2.5 py-1 rounded text-xs transition ${selectedAstronautId === ast.id ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                {ast.avatar} {ast.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-1.5 text-[11px] font-mono text-slate-400 flex items-center space-x-2">
        <span className="text-cyan-400">▶</span>
        <span>
          Active Scenario: <strong className="text-white">{activeScenario.toUpperCase()}</strong> — {currentDesc}
        </span>
      </div>
    </div>
  );
}
