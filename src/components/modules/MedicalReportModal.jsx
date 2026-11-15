import React from 'react';
import { FileText, Printer, X, ShieldCheck, AlertCircle } from 'lucide-react';

export default function MedicalReportModal({ isOpen, onClose, astronaut, environment, riskReport }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const isFitForDuty = riskReport.level === 'NOMINAL' || riskReport.level === 'CAUTION';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-cyan-500/30 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/60 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-white">
                OFFICIAL FLIGHT SURGEON DOSSIER
              </h2>
              <p className="text-xs text-slate-400 font-mono">FORM AS-MED-771 // EXPEDITION 72</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold font-mono transition"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / EXPORT PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-xs font-sans">
          <div className="border-b border-slate-700 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-lg font-black text-white tracking-widest uppercase font-mono">
                  HEALTH GUARDIAN // BIOTELEMETRY ASSESSMENT
                </h1>
                <p className="text-slate-400 font-mono text-[11px]">
                  Houston Mission Control • Space Medicine Operations Branch
                </p>
              </div>
              <div className="text-right font-mono text-[11px] text-slate-400">
                <div>REPORT DATE: {new Date().toLocaleDateString()}</div>
                <div>MET: DAY {astronaut.missionDay} // ORBIT 682</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 font-mono">
            <div>
              <span className="text-slate-500 text-[10px] block">CREWMEMBER</span>
              <span className="font-bold text-white text-xs">{astronaut.name}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">ASSIGNMENT</span>
              <span className="text-cyan-300 text-xs">{astronaut.role}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">BLOOD TYPE / AGE</span>
              <span className="text-slate-200 text-xs">{astronaut.bloodType} / {astronaut.age}y</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">HABITAT LOCATION</span>
              <span className="text-slate-200 text-xs">{astronaut.location}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold font-mono uppercase text-cyan-400 tracking-wider mb-2 border-b border-slate-800 pb-1">
              1. Real-Time Cardiovascular & Physiological Metrics
            </h3>
            <table className="w-full text-left font-mono border-collapse border border-slate-800 text-[11px]">
              <thead>
                <tr className="bg-slate-900 text-slate-400">
                  <th className="p-2 border border-slate-800">PARAMETER</th>
                  <th className="p-2 border border-slate-800">MEASURED VALUE</th>
                  <th className="p-2 border border-slate-800">STANDARD RANGE</th>
                  <th className="p-2 border border-slate-800">CLINICAL STATUS</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr>
                  <td className="p-2 border border-slate-800">Heart Rate</td>
                  <td className="p-2 border border-slate-800 font-bold text-white">{astronaut.vitals.heartRate} BPM</td>
                  <td className="p-2 border border-slate-800 text-slate-500">60 - 100 BPM</td>
                  <td className="p-2 border border-slate-800">
                    <span className={astronaut.vitals.heartRate > 110 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {astronaut.vitals.heartRate > 110 ? 'Tachycardic' : 'Nominal'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-800">Oxygen Saturation (SpO2)</td>
                  <td className="p-2 border border-slate-800 font-bold text-white">{astronaut.vitals.spO2}%</td>
                  <td className="p-2 border border-slate-800 text-slate-500">&gt; 95%</td>
                  <td className="p-2 border border-slate-800">
                    <span className={astronaut.vitals.spO2 < 93 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {astronaut.vitals.spO2 < 93 ? 'Desaturation Warning' : 'Optimal'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-800">Blood Pressure</td>
                  <td className="p-2 border border-slate-800 font-bold text-white">
                    {astronaut.vitals.bloodPressureSys}/{astronaut.vitals.bloodPressureDia} mmHg
                  </td>
                  <td className="p-2 border border-slate-800 text-slate-500">120/80 mmHg</td>
                  <td className="p-2 border border-slate-800 text-emerald-400">Normotensive</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-800">Core Body Temperature</td>
                  <td className="p-2 border border-slate-800 font-bold text-white">{astronaut.vitals.coreTemp.toFixed(1)}°C</td>
                  <td className="p-2 border border-slate-800 text-slate-500">36.5 - 37.5°C</td>
                  <td className="p-2 border border-slate-800">
                    <span className={astronaut.vitals.coreTemp > 38 ? 'text-amber-400' : 'text-emerald-400'}>
                      {astronaut.vitals.coreTemp > 38 ? 'Elevated' : 'Euthermic'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-800">Hydration Level</td>
                  <td className="p-2 border border-slate-800 font-bold text-white">{astronaut.vitals.hydration}%</td>
                  <td className="p-2 border border-slate-800 text-slate-500">&gt; 75%</td>
                  <td className="p-2 border border-slate-800">
                    <span className={astronaut.vitals.hydration < 65 ? 'text-amber-400' : 'text-emerald-400'}>
                      {astronaut.vitals.hydration < 65 ? 'Mild Hypovolemia' : 'Hydrated'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <h4 className="font-mono font-bold text-cyan-400 uppercase text-[11px] mb-2">
                Fatigue & Circadian Status
              </h4>
              <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
                <li>• Sleep Debt: <strong>+{astronaut.fatigue.sleepDebtHours.toFixed(1)}h</strong></li>
                <li>• Cognitive Fatigue Score: <strong>{astronaut.fatigue.cognitiveFatigueScore}/100</strong></li>
                <li>• Heart Rate Variability (HRV): <strong>{astronaut.fatigue.hrvMs} ms</strong></li>
                <li>• Circadian Cycle: <strong>{astronaut.fatigue.circadianPhase}</strong></li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <h4 className="font-mono font-bold text-cyan-400 uppercase text-[11px] mb-2">
                ECLSS Space Environment
              </h4>
              <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
                <li>• Cabin Carbon Dioxide: <strong>{environment.co2Ppm} ppm</strong></li>
                <li>• Atmospheric Pressure: <strong>{environment.pressurePsi.toFixed(2)} psi</strong></li>
                <li>• Ionizing Dosimeter: <strong>{environment.radiationMicroSv} μSv/h</strong></li>
                <li>• Ambient Temp / Humidity: <strong>{environment.cabinTemp}°C / {environment.humidity}%</strong></li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold uppercase tracking-wider text-white">
                AI Predictive Risk Assessment
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                RISK INDEX: {riskReport.score}% ({riskReport.level})
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed mb-3">
              {riskReport.predictionSummary}
            </p>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">OFFICIAL FLIGHT SURGEON STATUS</span>
                <span className={`text-xs font-bold flex items-center space-x-1.5 ${isFitForDuty ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isFitForDuty ? <ShieldCheck className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{isFitForDuty ? 'FIT FOR FULL FLIGHT DUTIES' : 'RESTRICTED DUTY / MEDICAL OBSERVATION'}</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase block">LEAD FLIGHT SURGEON</span>
                <span className="text-slate-300 font-bold text-xs">Dr. R. Sterling, MD (Houston Ground)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
