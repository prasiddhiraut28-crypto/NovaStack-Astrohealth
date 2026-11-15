import React from 'react'
import { TelemetryProvider, useTelemetry } from './context/TelemetryContext'
import Header from './components/Header'
import SimulationBar from './components/SimulationBar'
import AstronautHUD from './components/views/AstronautHUD'
import GroundControl from './components/views/GroundControl'
import EmergencyModal from './components/modules/EmergencyModal'

function MainContent() {
  const {
    currentView,
    isEmergencyActive,
    emergencyAcknowledged,
    silenceAlarm,
    resolveEmergency,
    activeAstronaut,
    environment,
    riskReport,
  } = useTelemetry()

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-black">
      {/* Background space ambient glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.12),rgba(255,255,255,0))]" />

      <Header />
      <SimulationBar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5">
        {currentView === 'hud' ? <AstronautHUD /> : <GroundControl />}
      </main>

      <footer className="border-t border-cyan-500/15 py-4 px-6 text-center text-xs font-mono text-slate-500 mt-auto">
        HEALTH GUARDIAN • EXPEDITION 72 BIOMEDICAL LIFE MONITOR • POWERED BY AI RISK DIAGNOSTICS &amp; WEB TELEMETRY
      </footer>

      {/* Emergency Modal Overlay */}
      <EmergencyModal
        isOpen={isEmergencyActive}
        astronaut={activeAstronaut}
        environment={environment}
        riskReport={riskReport}
        onSilence={silenceAlarm}
        onResolve={resolveEmergency}
        isAcknowledged={emergencyAcknowledged}
      />
    </div>
  )
}

export default function App() {
  return (
    <TelemetryProvider>
      <MainContent />
    </TelemetryProvider>
  )
}

