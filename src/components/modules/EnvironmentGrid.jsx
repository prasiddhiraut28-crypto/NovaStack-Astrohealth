import React from 'react';
import { Gauge, Radio, CloudRain, ShieldCheck, Flame, Compass, Wind } from 'lucide-react';

export default function EnvironmentGrid({ environment }) {
  const {
    cabinTemp,
    humidity,
    co2Ppm,
    pressurePsi,
    radiationMicroSv,
    o2Percent,
  } = environment;

  const isCo2High = co2Ppm > 3200;
  const isPressureLow = pressurePsi < 13.5;
  const isRadiationHigh = radiationMicroSv > 25;

  return (
    <div className="hud-panel rounded-2xl p-4 sm:p-5 flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-wide text-white uppercase">
              Spacecraft Habitat & Life Support
            </h2>
            <p className="text-xs text-slate-400">ECLSS Atmosphere, Pressure, & Cosmic Dosimeter</p>
          </div>
        </div>

        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-teal-500/15 border border-teal-500/30 text-teal-300">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span>ECLSS LOOP A & B</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
        <div className={`p-3.5 rounded-xl border transition-all ${isCo2High ? 'bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-950/40' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/30'}`}>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Wind className="w-4 h-4 text-cyan-400" />
              <span>Cabin CO2</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">&lt;3000</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${isCo2High ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
              {co2Ppm}
            </span>
            <span className="text-xs text-slate-400 font-mono">ppm</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Scrubber Status</span>
            <span className={`font-mono font-medium ${isCo2High ? 'text-rose-400' : 'text-teal-400'}`}>
              {isCo2High ? 'CDRA Saturation' : 'Optimal'}
            </span>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border transition-all ${isPressureLow ? 'bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-950/40' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/30'}`}>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Cabin Pressure</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">14.7 psi</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${isPressureLow ? 'text-rose-400' : 'text-white'}`}>
              {pressurePsi.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-mono">psi</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Equivalent</span>
            <span className="text-sky-300 font-mono">
              {(pressurePsi * 6.89476).toFixed(1)} kPa
            </span>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border transition-all ${isRadiationHigh ? 'bg-rose-950/40 border-rose-500/50' : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/30'}`}>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Radio className="w-4 h-4 text-amber-400" />
              <span>Cosmic Radiation</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">&lt;20</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${isRadiationHigh ? 'text-rose-400' : 'text-white'}`}>
              {radiationMicroSv}
            </span>
            <span className="text-xs text-slate-400 font-mono">μSv/h</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Storm Shield</span>
            <span className="text-amber-300 font-mono">Ready (Safe)</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border bg-slate-900/60 border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Habitat Temp</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">18-24°C</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
              {cabinTemp.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400 font-mono">°C</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">HVAC Loop</span>
            <span className="text-teal-400 font-mono">Active</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border bg-slate-900/60 border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span>Rel Humidity</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">40-60%</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
              {humidity}
            </span>
            <span className="text-xs text-slate-400 font-mono">%</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Condensate Trap</span>
            <span className="text-blue-300 font-mono">Recycling</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border bg-slate-900/60 border-slate-800 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cabin O2 Mix</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">20.9%</span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
              {o2Percent}%
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">N2/O2 Injection</span>
            <span className="text-emerald-400 font-mono">Auto-Balanced</span>
          </div>
        </div>
      </div>
    </div>
  );
}
