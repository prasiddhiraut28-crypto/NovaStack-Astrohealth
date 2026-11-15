import React from 'react';
import { Moon, Eye, BatteryCharging, Sparkles, Clock } from 'lucide-react';

export default function FatigueTracker({ fatigue }) {
  const {
    sleepHoursLastNight,
    sleepDebtHours,
    hrvMs,
    cognitiveFatigueScore,
    wakefulnessHours,
    circadianPhase,
  } = fatigue;

  const isHighFatigue = cognitiveFatigueScore > 65;
  const isModerateFatigue = cognitiveFatigueScore > 40;

  return (
    <div className="hud-panel rounded-2xl p-4 sm:p-5 flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-wide text-white uppercase">
              Fatigue & Circadian Tracker
            </h2>
            <p className="text-xs text-slate-400">HRV Autonomic Vigilance & Micro-Sleep Predictor</p>
          </div>
        </div>

        <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${isHighFatigue ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : isModerateFatigue ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'}`}>
          {isHighFatigue ? 'FATIGUE HAZARD' : isModerateFatigue ? 'ELEVATED DEBT' : 'RESTED STATE'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Eye className="w-4 h-4 text-indigo-400" />
              <span>Cognitive Fatigue</span>
            </span>
          </div>
          <div className="flex items-baseline space-x-1.5 my-1">
            <span className={`text-3xl font-bold font-mono tracking-tight ${isHighFatigue ? 'text-rose-400' : isModerateFatigue ? 'text-amber-400' : 'text-indigo-300'}`}>
              {cognitiveFatigueScore}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isHighFatigue ? 'bg-rose-500' : isModerateFatigue ? 'bg-amber-400' : 'bg-indigo-500'}`}
              style={{ width: `${Math.min(100, cognitiveFatigueScore)}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 mt-2 font-mono">
            Reaction latency: +{Math.round(cognitiveFatigueScore * 1.8)}ms
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Sleep Debt</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">Target &lt;2h</span>
          </div>
          <div className="flex items-baseline space-x-1.5 my-1">
            <span className={`text-3xl font-bold font-mono tracking-tight ${sleepDebtHours > 4 ? 'text-rose-400' : sleepDebtHours > 2 ? 'text-amber-400' : 'text-white'}`}>
              +{sleepDebtHours.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400 font-mono">HOURS</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between mt-2">
            <span>Last Sleep:</span>
            <span className="text-white font-mono font-medium">{sleepHoursLastNight}h duration</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
              <span>HRV (rMSSD)</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">&gt;50ms</span>
          </div>
          <div className="flex items-baseline space-x-1.5 my-1">
            <span className={`text-3xl font-bold font-mono tracking-tight ${hrvMs < 30 ? 'text-rose-400' : hrvMs < 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {hrvMs}
            </span>
            <span className="text-xs text-slate-400 font-mono">ms</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between mt-2">
            <span>Autonomic Tone:</span>
            <span className="text-emerald-400 font-mono font-medium">
              {hrvMs < 30 ? 'Sympathetic Drain' : 'Balanced'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 text-slate-300">
          <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>
            Circadian Phase: <strong className="text-white font-mono">{circadianPhase}</strong>
          </span>
        </div>
        <div className="flex items-center space-x-3 text-slate-400 font-mono text-[11px]">
          <span>Continuous Wakefulness: <strong className="text-cyan-300">{wakefulnessHours}h</strong></span>
          <span className="hidden sm:inline">•</span>
          <span>Micro-Sleep Risk: <strong className={isHighFatigue ? 'text-rose-400' : 'text-emerald-400'}>{isHighFatigue ? 'HIGH' : 'LOW'}</strong></span>
        </div>
      </div>
    </div>
  );
}
