import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import {
  Globe,
  Radio,
  FileText,
  Activity,
  Wifi,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';
import MedicalReportModal from '../modules/MedicalReportModal';
import { evaluateAstronautRisk } from '../../utils/riskPredictor';

export default function GroundControl() {
  const {
    crew,
    selectedAstronautId,
    setSelectedAstronautId,
    environment,
    commsDelay,
    setCommsDelay,
    metString,
    logs,
    triggerEmergencySOS,
  } = useTelemetry();

  const [isReportOpen, setIsReportOpen] = useState(false);

  const activeAstronaut = crew[selectedAstronautId];
  const activeRisk = evaluateAstronautRisk(activeAstronaut.vitals, activeAstronaut.fatigue, environment);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="hud-panel rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold uppercase tracking-wider text-white">
                  Ground Mission Control • Flight Surgeon Station
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                  HOUSTON MCC // BIOMED-1
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Synchronized Deep Space Network (DSN) Telemetry Array • {metString}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
              <span className="text-slate-500 px-2 flex items-center space-x-1">
                <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                <span>LINK LAG:</span>
              </span>
              {[
                { id: 'LEO', label: 'LEO 0.2s' },
                { id: 'MOON', label: 'Moon 1.3s' },
                { id: 'MARS', label: 'Mars 14m' },
              ].map((delay) => (
                <button
                  key={delay.id}
                  onClick={() => setCommsDelay(delay.id)}
                  className={`px-2.5 py-1 rounded-lg transition ${commsDelay === delay.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  {delay.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsReportOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold font-mono tracking-wide shadow-lg shadow-cyan-900/30 transition"
            >
              <FileText className="w-4 h-4" />
              <span>MEDICAL DOSSIER</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-300 flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>Expedition 72 Active Crew Roster (Select to inspect)</span>
          </h2>
          <span className="text-xs font-mono text-slate-500">3 OF 3 ASTRONAUTS ONLINE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(crew).map((ast) => {
            const risk = evaluateAstronautRisk(ast.vitals, ast.fatigue, environment);
            const isSelected = ast.id === selectedAstronautId;
            const isCrit = risk.level === 'CRITICAL';
            const isWarn = risk.level === 'WARNING';

            return (
              <div
                key={ast.id}
                onClick={() => setSelectedAstronautId(ast.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${isSelected ? 'border-cyan-400 bg-slate-900/90 shadow-xl shadow-cyan-950/50 ring-2 ring-cyan-500/20' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/70'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                      {ast.avatar}
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-sm">{ast.name}</h3>
                      <p className="text-[11px] text-cyan-400 font-mono">{ast.role}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${isCrit ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : isWarn ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'}`}
                  >
                    {risk.level}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 mb-3 font-mono flex items-center justify-between">
                  <span>Location:</span>
                  <span className="text-slate-200 truncate max-w-[180px]">{ast.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 font-mono text-center p-2 rounded-xl bg-black/40 border border-slate-800">
                  <div>
                    <span className="text-[9px] text-slate-500 block">HEART RATE</span>
                    <span className={`text-xs font-bold ${ast.vitals.heartRate > 110 ? 'text-rose-400' : 'text-white'}`}>
                      {ast.vitals.heartRate} BPM
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block">SpO2</span>
                    <span className={`text-xs font-bold ${ast.vitals.spO2 < 93 ? 'text-amber-400' : 'text-white'}`}>
                      {ast.vitals.spO2}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block">FATIGUE</span>
                    <span className="text-xs font-bold text-indigo-300">
                      {ast.fatigue.cognitiveFatigueScore}%
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-2 border-t border-cyan-500/20 text-center text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    ● Active Telemetry Target
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 hud-panel rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono">
                  Ground Telemetry Feed: {activeAstronaut.name}
                </h3>
                <p className="text-xs text-slate-400">Flight Surgeon Biometric Trend & Diagnostic Review</p>
              </div>
            </div>

            <span className="text-xs font-mono text-cyan-300">
              Risk: <strong>{activeRisk.score}% ({activeRisk.level})</strong>
            </span>
          </div>

          <p className="text-xs text-slate-300 font-mono p-3 rounded-xl bg-slate-900/60 border border-slate-800 leading-relaxed">
            {activeRisk.predictionSummary}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">HEART RATE</span>
              <span className="text-lg font-bold text-white">{activeAstronaut.vitals.heartRate} BPM</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">OXYGENATION</span>
              <span className="text-lg font-bold text-white">{activeAstronaut.vitals.spO2}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">BLOOD PRESSURE</span>
              <span className="text-lg font-bold text-white">
                {activeAstronaut.vitals.bloodPressureSys}/{activeAstronaut.vitals.bloodPressureDia}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">HYDRATION</span>
              <span className="text-lg font-bold text-white">{activeAstronaut.vitals.hydration}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <button
              onClick={() => triggerEmergencySOS(`Ground Control Flight Surgeon Alert for ${activeAstronaut.name}`)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/40 text-xs font-mono font-semibold transition"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>TRANSMIT GROUND SOS DIRECTIVE</span>
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              View Full Clinical Dossier &gt;
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 hud-panel rounded-2xl p-5 flex flex-col h-[380px]">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-3 shrink-0">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-white">
                Telemetry Flight Stream Log
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">AUTO-RECORDING</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-[11px]">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`p-2 rounded-lg border leading-tight ${log.type === 'critical' ? 'bg-rose-950/40 border-rose-500/40 text-rose-300' : log.type === 'warning' ? 'bg-amber-950/30 border-amber-500/40 text-amber-300' : log.type === 'success' ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-900/70 border-slate-800 text-slate-300'}`}
              >
                <span className="text-slate-500 mr-2">[{log.time}]</span>
                <span>{log.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MedicalReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        astronaut={activeAstronaut}
        environment={environment}
        riskReport={activeRisk}
      />
    </div>
  );
}
