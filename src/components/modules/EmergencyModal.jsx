import React, { useState } from 'react';
import { AlertOctagon, VolumeX, ShieldAlert, CheckSquare, Square, Check } from 'lucide-react';

export default function EmergencyModal({
  isOpen,
  astronaut,
  environment,
  riskReport,
  onSilence,
  onResolve,
  isAcknowledged,
}) {
  if (!isOpen) return null;

  const [checklist, setChecklist] = useState({
    sealChecked: false,
    o2Switched: false,
    groundNotified: true,
    tetherSecured: false,
  });

  const toggleCheck = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked =
    checklist.sealChecked && checklist.o2Switched && checklist.groundNotified && checklist.tetherSecured;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border-2 border-rose-500 bg-slate-950 p-6 shadow-2xl shadow-rose-900/60 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 animate-pulse" />

        <div className="flex items-start justify-between border-b border-rose-500/30 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500 text-rose-400 animate-bounce">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase">
                AEROSPACE DEFENSE LEVEL 1 // MEDICAL EMERGENCY
              </span>
              <h1 className="text-xl font-black text-white tracking-wide uppercase">
                EMERGENCY SOS BROADCAST ACTIVE
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isAcknowledged && (
              <button
                onClick={onSilence}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold transition"
              >
                <VolumeX className="w-4 h-4" />
                <span>SILENCE SIREN</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 mb-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
            <span>SUBJECT: <strong className="text-white">{astronaut.name}</strong> ({astronaut.role})</span>
            <span className="text-rose-400 font-bold">RISK INDEX: {riskReport.score}%</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center font-mono">
            <div className="p-2 rounded bg-black/40 border border-rose-500/20">
              <span className="text-[10px] text-slate-400 block">HEART RATE</span>
              <span className="text-lg font-bold text-rose-300">{astronaut.vitals.heartRate} BPM</span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-rose-500/20">
              <span className="text-[10px] text-slate-400 block">OXYGEN SpO2</span>
              <span className="text-lg font-bold text-rose-300">{astronaut.vitals.spO2}%</span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-rose-500/20">
              <span className="text-[10px] text-slate-400 block">CABIN CO2</span>
              <span className="text-lg font-bold text-amber-300">{environment.co2Ppm} ppm</span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-rose-500/20">
              <span className="text-[10px] text-slate-400 block">PRESSURE</span>
              <span className="text-lg font-bold text-cyan-300">{environment.pressurePsi.toFixed(1)} psi</span>
            </div>
          </div>

          <p className="text-xs text-rose-200 mt-2 font-mono">
            🚨 {riskReport.predictionSummary}
          </p>
        </div>

        <div className="mb-5">
          <h3 className="text-xs font-mono uppercase text-slate-300 tracking-wider mb-2 flex items-center space-x-1.5">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>Emergency Flight Surgeon Action Checklist</span>
          </h3>

          <div className="space-y-2">
            <div
              onClick={() => toggleCheck('sealChecked')}
              className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center space-x-2.5 transition ${checklist.sealChecked ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}`}
            >
              {checklist.sealChecked ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-slate-500" />}
              <span>Step 1: Inspect suit hermetic seal / habitat airlock pressure valve</span>
            </div>

            <div
              onClick={() => toggleCheck('o2Switched')}
              className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center space-x-2.5 transition ${checklist.o2Switched ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}`}
            >
              {checklist.o2Switched ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-slate-500" />}
              <span>Step 2: Engage secondary 100% O2 emergency bypass supply</span>
            </div>

            <div
              onClick={() => toggleCheck('tetherSecured')}
              className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center space-x-2.5 transition ${checklist.tetherSecured ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}`}
            >
              {checklist.tetherSecured ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-slate-500" />}
              <span>Step 3: Secure mechanical safety tether & retreat to Node-2 shelter</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <span className="text-[11px] font-mono text-slate-500">
            {allChecked ? 'All emergency protocols completed.' : 'Complete checklist items above to verify safety.'}
          </span>

          <button
            onClick={onResolve}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs tracking-wide shadow-lg shadow-emerald-900/40 transition"
          >
            <Check className="w-4 h-4" />
            <span>STABILIZE & CLEAR EMERGENCY</span>
          </button>
        </div>
      </div>
    </div>
  );
}
