import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import VitalsMonitor from '../modules/VitalsMonitor';
import RiskPredictorCard from '../modules/RiskPredictorCard';
import FatigueTracker from '../modules/FatigueTracker';
import EnvironmentGrid from '../modules/EnvironmentGrid';
import AssistantChat from '../modules/AssistantChat';
import { MapPin, Droplet } from 'lucide-react';

export default function AstronautHUD() {
  const { activeAstronaut, environment, riskReport } = useTelemetry();

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="hud-panel rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-950 to-slate-900 border border-cyan-500/40 flex items-center justify-center text-3xl shadow-inner">
              {activeAstronaut.avatar}
            </div>
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-950 ${riskReport.level === 'CRITICAL' ? 'bg-rose-500 animate-ping' : riskReport.level === 'WARNING' ? 'bg-amber-400' : 'bg-emerald-400'}`}
            />
          </div>

          <div>
            <div className="flex items-center space-x-2.5">
              <h2 className="text-lg font-bold text-white tracking-wide">
                {activeAstronaut.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                {activeAstronaut.role}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-mono mt-1">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{activeAstronaut.location}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Droplet className="w-3.5 h-3.5 text-rose-400" />
                <span>Blood: {activeAstronaut.bloodType}</span>
              </span>
              <span>•</span>
              <span>Age: {activeAstronaut.age}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs sm:text-right">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block">MISSION DURATION</span>
            <span className="text-white font-bold">DAY {activeAstronaut.missionDay} // EVA PHASE</span>
          </div>

          <div
            className={`p-2.5 rounded-xl border ${riskReport.level === 'CRITICAL' ? 'bg-rose-950/40 border-rose-500/50 text-rose-300' : riskReport.level === 'WARNING' ? 'bg-amber-950/40 border-amber-500/50 text-amber-300' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'}`}
          >
            <span className="text-[10px] opacity-75 uppercase block">AI DIAGNOSIS</span>
            <span className="font-bold">{riskReport.vitalStatus}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <VitalsMonitor
            vitals={activeAstronaut.vitals}
            isCritical={riskReport.level === 'CRITICAL'}
          />

          <RiskPredictorCard riskReport={riskReport} />

          <FatigueTracker fatigue={activeAstronaut.fatigue} />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <EnvironmentGrid environment={environment} />

          <AssistantChat
            astronaut={activeAstronaut}
            environment={environment}
            riskReport={riskReport}
          />
        </div>
      </div>
    </div>
  );
}
