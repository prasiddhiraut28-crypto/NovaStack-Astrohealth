import React, { useState } from 'react';
import { Heart, Activity, Thermometer, Wind, Droplet } from 'lucide-react';
import EcgWaveform from './EcgWaveform';

export default function VitalsMonitor({ vitals, isCritical = false }) {
  const [useFahrenheit, setUseFahrenheit] = useState(false);

  const tempDisplay = useFahrenheit
    ? `${((vitals.coreTemp * 9) / 5 + 32).toFixed(1)}°F`
    : `${vitals.coreTemp.toFixed(1)}°C`;

  const isHrAbnormal = vitals.heartRate > 110 || vitals.heartRate < 50;
  const isSpO2Low = vitals.spO2 < 93;
  const isTempHigh = vitals.coreTemp > 38.0 || vitals.coreTemp < 36.0;
  const isRespHigh = vitals.respirationRate > 22 || vitals.respirationRate < 10;
  const isHydrationLow = vitals.hydration < 65;

  return (
    <div className="hud-panel rounded-2xl p-4 sm:p-5 flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-wide text-white uppercase">
              Biometric Telemetry Stream
            </h2>
            <p className="text-xs text-slate-400">Continuous Multi-Sensor Biosuit Interface</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setUseFahrenheit(!useFahrenheit)}
            className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-slate-700 transition"
          >
            Switch to {useFahrenheit ? '°C' : '°F'}
          </button>
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYNCED 100Hz</span>
          </span>
        </div>
      </div>

      <EcgWaveform heartRate={vitals.heartRate} isCritical={isCritical || isHrAbnormal} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
        <div className={`p-3.5 rounded-xl border transition-all ${isHrAbnormal ? 'bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-950/50' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/30'}`}>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Heart className={`w-4 h-4 ${isHrAbnormal ? 'text-rose-400 fill-rose-400 animate-ping' : 'text-rose-400 fill-rose-400/20'}`} />
              <span>Heart Rate</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">60-100</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className={`text-3xl font-bold font-mono tracking-tight ${isHrAbnormal ? 'text-rose-400' : 'text-white'}`}>
              {vitals.heartRate}
            </span>
            <span className="text-xs text-slate-400 font-mono">BPM</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Sinus Rhythm</span>
            <span className={`font-mono font-medium ${isHrAbnormal ? 'text-rose-400' : 'text-emerald-400'}`}>
              {isHrAbnormal ? 'Abnormal' : 'Nominal'}
            </span>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border transition-all ${isSpO2Low ? 'bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-950/50' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/30'}`}>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Wind className="w-4 h-4 text-cyan-400" />
              <span>Oxygen Sat (SpO2)</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">&gt;95%</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className={`text-3xl font-bold font-mono tracking-tight ${isSpO2Low ? 'text-amber-400' : 'text-white'}`}>
              {vitals.spO2}
            </span>
            <span className="text-xs text-slate-400 font-mono">%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isSpO2Low ? 'bg-amber-400' : 'bg-cyan-400'}`}
              style={{ width: `${Math.min(100, vitals.spO2)}%` }}
            />
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border transition-all ${isTempHigh ? 'bg-rose-950/40 border-rose-500/50' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/30'}`}>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Thermometer className="w-4 h-4 text-emerald-400" />
              <span>Core Body Temp</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">36.5-37.5</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className={`text-3xl font-bold font-mono tracking-tight ${isTempHigh ? 'text-rose-400' : 'text-white'}`}>
              {tempDisplay}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Thermal Garment</span>
            <span className="text-emerald-400 font-mono">Active Cooling</span>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border transition-all ${isRespHigh ? 'bg-amber-950/40 border-amber-500/50' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/30'}`}>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-sky-400" />
              <span>Respiration</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">12-20</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className={`text-3xl font-bold font-mono tracking-tight ${isRespHigh ? 'text-amber-400' : 'text-white'}`}>
              {vitals.respirationRate}
            </span>
            <span className="text-xs text-slate-400 font-mono">BrPM</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Tidal Volume</span>
            <span className="text-sky-300 font-mono">520 mL</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border bg-slate-900/60 border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Heart className="w-4 h-4 text-purple-400" />
              <span>Blood Pressure</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">120/80</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-bold font-mono tracking-tight text-white">
              {vitals.bloodPressureSys}/{vitals.bloodPressureDia}
            </span>
            <span className="text-xs text-slate-400 font-mono">mmHg</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">MAP Pressure</span>
            <span className="text-purple-300 font-mono">
              {Math.round((2 * vitals.bloodPressureDia + vitals.bloodPressureSys) / 3)} mmHg
            </span>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border transition-all ${isHydrationLow ? 'bg-amber-950/40 border-amber-500/50' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/30'}`}>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Droplet className="w-4 h-4 text-blue-400" />
              <span>Hydration Index</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">&gt;75%</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className={`text-3xl font-bold font-mono tracking-tight ${isHydrationLow ? 'text-amber-400' : 'text-white'}`}>
              {vitals.hydration}
            </span>
            <span className="text-xs text-slate-400 font-mono">%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isHydrationLow ? 'bg-amber-400' : 'bg-blue-400'}`}
              style={{ width: `${vitals.hydration}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
