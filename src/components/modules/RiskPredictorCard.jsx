import React from 'react';
import { Brain, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

export default function RiskPredictorCard({ riskReport }) {
  const { score, level, anomalies = [], predictionSummary } = riskReport;

  const isCritical = level === 'CRITICAL';
  const isWarning = level === 'WARNING';
  const isCaution = level === 'CAUTION';

  const badgeBg = isCritical
    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
    : isWarning
    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
    : isCaution
    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';

  const meterColor = isCritical
    ? 'from-rose-600 to-red-400'
    : isWarning
    ? 'from-amber-600 to-yellow-400'
    : isCaution
    ? 'from-yellow-600 to-amber-300'
    : 'from-emerald-600 to-teal-400';

  return (
    <div className={`rounded-2xl p-4 sm:p-5 transition-all ${isCritical ? 'hud-panel-alert' : isWarning ? 'hud-panel-warning' : 'hud-panel'}`}>
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-wide text-white uppercase flex items-center space-x-2">
              <span>AI Health Risk Predictor</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                v4.8 NEURAL
              </span>
            </h2>
            <p className="text-xs text-slate-400">Multivariate Bayesian Heuristic Risk Engine</p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${badgeBg} flex items-center space-x-1.5`}>
          <span className={`w-2 h-2 rounded-full ${isCritical ? 'bg-rose-400 animate-ping' : isWarning ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
          <span>{level} STATUS</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4">
        <div className="md:col-span-4 flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider mb-1">
            Physiological Risk Index
          </span>
          <div className="flex items-baseline space-x-1">
            <span className={`text-4xl font-extrabold font-mono tracking-tight ${isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'}`}>
              {score}
            </span>
            <span className="text-sm text-slate-500 font-mono">/ 100</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${meterColor} transition-all duration-700`}
              style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
            />
          </div>
        </div>

        <div className="md:col-span-8 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide block mb-1 flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Predictive Assessment</span>
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {predictionSummary}
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>ACTIVE DETECTED FACTORS ({anomalies.length})</span>
          <span>CONFIDENCE SCORE</span>
        </div>

        {anomalies.length === 0 ? (
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center space-x-2.5 text-emerald-300 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero physiological strain vectors detected. Cardiovascular, respiratory, and barometric channels nominal.</span>
          </div>
        ) : (
          anomalies.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border text-xs transition-all ${item.severity === 'CRITICAL' ? 'bg-rose-950/40 border-rose-500/40 text-rose-200' : item.severity === 'WARNING' ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-yellow-950/20 border-yellow-500/30 text-yellow-200'}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={`w-4 h-4 shrink-0 ${item.severity === 'CRITICAL' ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
                  <span className="font-semibold tracking-wide text-white">{item.title}</span>
                </div>
                <div className="flex items-center space-x-2 font-mono">
                  <span className="text-[10px] text-slate-400">{item.metric}</span>
                  <span className="px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 text-[10px] font-bold">
                    {item.confidence}% CONF
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-[11px] mb-2 leading-relaxed">{item.description}</p>

              <div className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-start space-x-2 text-[11px]">
                <span className="text-cyan-400 font-semibold uppercase tracking-wider shrink-0 font-mono">
                  PROTOCOL:
                </span>
                <span className="text-slate-300">{item.countermeasure}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
