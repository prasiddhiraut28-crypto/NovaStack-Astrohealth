// AstroMed AI - Space Medicine Flight Surgeon Knowledge & Diagnostic Engine

export const QUICK_PROMPTS = [
  'Analyze my current vitals and anomaly risk',
  'Why is my heart rate elevated?',
  'How do I mitigate high cabin CO2?',
  'Recommend sleep and fatigue countermeasures',
  'What are the symptoms of space decompression sickness?',
  'Explain fluid shift and hydration in microgravity',
];

export function generateAstroMedResponse(query, vitals, fatigue, environment, riskReport) {
  const q = query.toLowerCase();

  // 1. Contextual Real-time Vitals Analysis
  if (
    q.includes('current') ||
    q.includes('vitals') ||
    q.includes('analyze') ||
    q.includes('status') ||
    q.includes('health') ||
    q.includes('risk')
  ) {
    if (riskReport.level === 'CRITICAL' || riskReport.level === 'WARNING') {
      const topIssue = riskReport.anomalies[0];
      return `### 🚨 AstroMed Clinical Assessment: **${riskReport.level} PRIORITY**
**Risk Index:** ${riskReport.score}% | **Primary Driver:** ${topIssue?.title || 'Telemetry Anomaly'}

**Immediate Telemetry Finding:**
* Heart Rate: **${vitals.heartRate} BPM**
* Oxygen Saturation (SpO2): **${vitals.spO2}%**
* Cabin CO2: **${environment.co2Ppm} ppm**
* Core Temperature: **${vitals.coreTemp.toFixed(1)}°C**

**Physiological Analysis:**
${topIssue?.description || 'Multiple bio-telemetry channels are deviating from nominal spaceflight parameters.'}

**Immediate Countermeasures:**
1. **${topIssue?.countermeasure || 'Halt physical tasks and notify Ground Flight Surgeon.'}**
2. Ingest 250ml electrolyte fluid to support intravascular blood volume.
3. Verify personal ventilation airflow to eliminate microgravity CO2 pockets.
Ground Control has been updated with telemetry packet timestamp.`;
    }

    return `### 🟢 AstroMed Clinical Assessment: **NOMINAL ORBIT STATUS**
**Risk Index:** ${riskReport.score}% (All parameters nominal)

**Current Biometric Baseline:**
* Heart Rate: **${vitals.heartRate} BPM** (Within resting target range)
* Oxygenation (SpO2): **${vitals.spO2}%** (Optimal)
* Blood Pressure: **${vitals.bloodPressureSys}/${vitals.bloodPressureDia} mmHg**
* Cabin Atmosphere: **${environment.co2Ppm} ppm CO2**, **${environment.pressurePsi.toFixed(2)} psi**
* Fatigue Index: **${fatigue.cognitiveFatigueScore}%** (Sleep debt: ${fatigue.sleepDebtHours.toFixed(1)}h)

**Flight Surgeon Recommendation:**
Continue planned flight manifests. Ensure your daily 2-hour resistive exercise regimen (ARED) to prevent bone mineral loss and cardiovascular deconditioning.`;
  }

  // 2. Heart Rate / Tachycardia inquiries
  if (q.includes('heart') || q.includes('pulse') || q.includes('cardio') || q.includes('tachycardia')) {
    if (vitals.heartRate > 110) {
      return `### 💓 Cardiovascular Diagnostics
Your current heart rate is **${vitals.heartRate} BPM**, which is noticeably above standard resting parameters.

**Spaceflight Contributing Factors:**
1. **Cephalad Fluid Shift:** In microgravity, ~2 liters of bodily fluids shift toward the upper chest and head, reducing lower body venous return during exertion.
2. **Thermal Dissipation:** If performing EVA or heavy maintenance, convective cooling is absent; your heart works harder to pump blood to the skin.
3. **Oxygen Saturation Correlation:** Your current SpO2 is **${vitals.spO2}%**. ${vitals.spO2 < 93 ? 'Your heart is compensating for lower oxygen intake by accelerating cardiac output.' : 'Oxygen saturation is stable.'}

**Action Plan:**
* Sit or tether securely to avoid free-floating exertion.
* Slow your breathing to 6 deep diaphragmatic breaths per minute.
* Increase liquid cooling circulation if inside an EVA suit.`;
    }
    return `### 💓 Cardiovascular Status
Your heart rate is currently **${vitals.heartRate} BPM**, displaying stable rhythm and healthy cardiac stroke volume in microgravity. Blood pressure is **${vitals.bloodPressureSys}/${vitals.bloodPressureDia} mmHg**.`;
  }

  // 3. Cabin CO2 and Respiratory
  if (q.includes('co2') || q.includes('carbon') || q.includes('air') || q.includes('scrubber') || q.includes('headache')) {
    return `### 💨 Spacecraft Life Support & CO2 Dynamics
Current cabin CO2 concentration is **${environment.co2Ppm} ppm** (Space station nominal limit: < 3,000 ppm).

**Why CO2 is dangerous in space:**
Without buoyancy-driven thermal convection, exhaled carbon dioxide forms a **stagnant toxic bubble** around an astronaut's head, especially during sleep or light work.
* **Early symptoms:** Frontal throbbing headache, mild irritability, lethargy.
* **Severe symptoms:** Visual disturbance, rapid shallow breathing, confusion, and acidosis.

**Recommended Protocols:**
1. Switch on auxiliary directional air circulation fans.
2. Verify Life Support CDRA (Carbon Dioxide Removal Assembly) bed cycling.
3. If CO2 exceeds 4,000 ppm, don temporary oxygen masks until scrubber levels stabilize.`;
  }

  // 4. Fatigue, Sleep, & Circadian Rhythms
  if (q.includes('fatigue') || q.includes('sleep') || q.includes('tired') || q.includes('circadian') || q.includes('rest')) {
    return `### 🌙 Sleep Architecture & Cognitive Fatigue
**Current Sleep Profile:**
* Cumulative Sleep Debt: **${fatigue.sleepDebtHours.toFixed(1)} hours**
* Cognitive Fatigue Index: **${fatigue.cognitiveFatigueScore}%**
* Autonomic HRV Metric: **${fatigue.hrvMs} ms**

**Orbital Circadian Challenge:**
Astronauts experience 16 sunrises and sunsets every 24 hours in Low Earth Orbit, which severely degrades natural melatonin synthesis and disrupts REM cycles.

**Evidence-Based Space Countermeasures:**
1. **Controlled Rest (Power Nap):** A 30–45 minute sleep window restores cognitive vigilance by 34% without causing sleep inertia.
2. **Light Therapy:** Schedule 30 minutes of high-intensity blue-enriched light (460–480 nm) upon awakening.
3. **Task Delegation:** Defer complex robotic tele-operations or EVA airlock procedures until sleep debt drops below 2.0 hours.`;
  }

  // 5. Decompression Sickness (DCS)
  if (q.includes('decompression') || q.includes('dcs') || q.includes('bends') || q.includes('pressure')) {
    return `### ⚠️ Decompression Sickness (DCS) in Spaceflight
**Cabin Pressure:** ${environment.pressurePsi.toFixed(2)} psi (Standard: 14.7 psi / Suit: 4.3 psi).

**Pathophysiology:**
When ambient pressure drops rapidly, dissolved nitrogen in human blood and tissues forms gaseous micro-bubbles, which lodge in capillaries and joints.

**Symptoms to report to Ground Control:**
* Joint pain ("the bends"), especially in shoulders and knees.
* Cutaneous pruritus (skin itching or marble skin rash).
* Chest tightness or coughing ("the chokes").

**Standard Pre-EVA Denitrogenation Protocol:**
Astronauts breathe 100% pure oxygen for 2 to 4 hours prior to depressurizing the airlock to flush nitrogen from tissue reserves.`;
  }

  // 6. Fluid Shift & Hydration
  if (q.includes('fluid') || q.includes('water') || q.includes('hydration') || q.includes('drink')) {
    return `### 💧 Space Microgravity Fluid Shifts
**Current Hydration Index:** **${vitals.hydration}%**

**The "Puffy Face, Bird Legs" Phenomenon:**
Without gravity pulling blood toward the lower extremities, approximately 1.5 to 2.0 liters of fluid shifts toward the head and thoracic cavity.
* The brain senses high central blood pressure and suppresses the thirst reflex via antidiuretic hormone (ADH) inhibition.
* Consequently, **astronauts consistently drink less than they need**, leading to sub-clinical chronic dehydration, kidney stone risk, and low cardiac volume upon re-entry.

**Prescription:**
Drink at least **2.5 liters of water daily**, augmented with electrolytes (potassium, sodium, magnesium) before strenuous workouts.`;
  }

  return `### 🩺 AstroMed Medical Guidance
I have analyzed your query regarding: *"${query}"*.

**Current Telemetry Summary:**
* Heart Rate: **${vitals.heartRate} BPM** | SpO2: **${vitals.spO2}%**
* Risk Index: **${riskReport.score}% (${riskReport.level})**
* Primary Clinical Note: ${riskReport.predictionSummary}

For mission safety, ensure all physiological deviations are logged to Mission Control telemetry streams. Feel free to ask about specific vitals, fatigue protocols, or environmental safety.`;
}
