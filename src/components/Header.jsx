import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { Shield, Volume2, VolumeX, AlertOctagon, LayoutDashboard, Globe, Radio } from 'lucide-react';

export default function Header() {
  const {
    currentView,
    setCurrentView,
    isSoundMuted,
    toggleSound,
    triggerEmergencySOS,
    metString,
    activeAstronaut,
  } = useTelemetry();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="relative p-2 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/20">
            <Shield className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-extrabold tracking-wider text-white uppercase font-mono">
                HEALTH GUARDIAN
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold tracking-wider">
                ORBITAL BIO-DEFENSE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Autonomous Real-Time Astronaut Telemetry & AI Diagnostic System
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-3 px-4 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>DOWNLINK LOCK</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="font-bold tracking-wider text-cyan-300 text-sm">{metString}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setCurrentView('hud')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${currentView === 'hud' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>ASTRONAUT HUD</span>
            </button>
            <button
              onClick={() => setCurrentView('ground_control')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${currentView === 'ground_control' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>GROUND CONTROL</span>
            </button>
          </div>

          <button
            onClick={toggleSound}
            title={isSoundMuted ? 'Unmute telemetry sound' : 'Mute telemetry sound'}
            className={`p-2 rounded-xl border text-xs transition ${isSoundMuted ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400' : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60'}`}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => triggerEmergencySOS(`Manual distress button pressed by ${activeAstronaut.name}`)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold font-mono tracking-wider shadow-lg shadow-rose-900/40 transition animate-pulse"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>SOS DISTRESS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
