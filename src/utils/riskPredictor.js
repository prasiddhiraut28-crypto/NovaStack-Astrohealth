// Health Guardian - Multi-Factor AI Risk Predictor Engine

export function evaluateAstronautRisk(vitals, fatigue, environment) {
  const anomalies = [];
  let riskScore = 0;

  // 1. Hypoxia & Oxygen Saturation Evaluation
  if (vitals.spO2 < 88) {
    riskScore += 45;
    anomalies.push({
      id: 'hypoxia_critical',
      title: 'Critical Hypoxemia Detected',
      severity: 'CRITICAL',
      confidence: 97,
      metric: `SpO2: ${vitals.spO2}% (Nominal >95%)`,
      description: 'Dangerous arterial oxygen desaturation. High risk of cognitive disorientation and loss of consciousness.',
      countermeasure: 'Verify EVA suit / cabin O2 regulator immediately. Switch to emergency 100% O2 reserve mask.',
    });
  } else if (vitals.spO2 < 93) {
    riskScore += 25;
    anomalies.push({
      id: 'hypoxia_moderate',
      title: 'Moderate Hypoxia Trajectory',
      severity: 'WARNING',
      confidence: 91,
      metric: `SpO2: ${vitals.spO2}%`,
      description: 'Peripheral oxygen saturation below standard spaceflight threshold. Compensatory tachycardia observed.',
      countermeasure: 'Check suit seal integrity and purge primary breathing loop. Reduce physical exertion.',
    });
  }

  // 2. Cardiovascular Stress & Arrhythmia
  if (vitals.heartRate > 145) {
    riskScore += 30;
    anomalies.push({
      id: 'tachycardia_severe',
      title: 'Severe Tachycardia / Cardiac Overdrive',
      severity: 'CRITICAL',
      confidence: 94,
      metric: `Heart Rate: ${vitals.heartRate} BPM`,
      description: 'Excessive myocardial workload in microgravity. Elevated cardiac strain and arrhythmia susceptibility.',
      countermeasure: 'Halt current manual tasks. Sit or tether in place. Initiate controlled paced breathing.',
    });
  } else if (vitals.heartRate > 115) {
    riskScore += 18;
    anomalies.push({
      id: 'tachycardia_mild',
      title: 'Elevated Cardiac Rate',
      severity: 'CAUTION',
      confidence: 88,
      metric: `Heart Rate: ${vitals.heartRate} BPM`,
      description: 'Cardiac output elevated above resting baseline. Potential metabolic or thermal stress.',
      countermeasure: 'Monitor active cooling suit flow rate and verify hydration status.',
    });
  } else if (vitals.heartRate < 45) {
    riskScore += 28;
    anomalies.push({
      id: 'bradycardia',
      title: 'Severe Bradycardia Warning',
      severity: 'WARNING',
      confidence: 89,
      metric: `Heart Rate: ${vitals.heartRate} BPM`,
      description: 'Abnormally depressed heart rate. Risk of vasovagal response or neuro-cardiac suppression.',
      countermeasure: 'Ground flight surgeon alert dispatched. Astronaut posture check.',
    });
  }

  // 3. Cabin Carbon Dioxide (CO2) Toxicity
  if (environment.co2Ppm > 4200) {
    riskScore += 35;
    anomalies.push({
      id: 'co2_critical',
      title: 'Acute Spaceflight Hypercapnia',
      severity: 'CRITICAL',
      confidence: 96,
      metric: `Cabin CO2: ${environment.co2Ppm} ppm (Limit <3000)`,
      description: 'Toxic CO2 buildup. In microgravity, stagnant air pockets cause severe carbon dioxide poisoning and spatial disorientation.',
      countermeasure: 'Activate secondary Carbon Dioxide Removal Assembly (CDRA). Verify personal ventilation fan flow.',
    });
  } else if (environment.co2Ppm > 3200) {
    riskScore += 20;
    anomalies.push({
      id: 'co2_warning',
      title: 'Elevated Carbon Dioxide Accumulation',
      severity: 'CAUTION',
      confidence: 90,
      metric: `Cabin CO2: ${environment.co2Ppm} ppm`,
      description: 'CO2 concentration exceeding safe mission baseline. Early symptoms: frontal headache and lethargy.',
      countermeasure: 'Inspect life support scrubber bed valve cycle and reposition ventilation baffle.',
    });
  }

  // 4. Cabin Depressurization / Barometric Stress
  if (environment.pressurePsi < 13.2) {
    riskScore += 40;
    anomalies.push({
      id: 'depressurization',
      title: 'Cabin Hypobaric Decompression Alert',
      severity: 'CRITICAL',
      confidence: 98,
      metric: `Pressure: ${environment.pressurePsi.toFixed(2)} psi (Nominal 14.7 psi)`,
      description: 'Rapid atmospheric pressure decay detected. High risk of ebullism and decompression sickness (DCS).',
      countermeasure: 'Don Launch/Entry Pressure Suit immediately. Seal inter-module hatchway bulkheads.',
    });
  }

  // 5. Thermal Stress & Core Temperature
  if (vitals.coreTemp > 38.4) {
    riskScore += 25;
    anomalies.push({
      id: 'hyperthermia',
      title: 'Thermal Strain / Hyperthermia',
      severity: 'WARNING',
      confidence: 92,
      metric: `Core Temp: ${vitals.coreTemp.toFixed(1)}°C`,
      description: 'Heat dissipation is severely inhibited in microgravity due to lack of natural air convection.',
      countermeasure: 'Increase Liquid Cooling Garment (LCG) coolant circulation loop to maximum.',
    });
  } else if (vitals.coreTemp < 35.8) {
    riskScore += 20;
    anomalies.push({
      id: 'hypothermia',
      title: 'Thermal Deficit / Hypothermia',
      severity: 'CAUTION',
      confidence: 87,
      metric: `Core Temp: ${vitals.coreTemp.toFixed(1)}°C`,
      description: 'Body temperature trending downward. Peripheral vasoconstriction in progress.',
      countermeasure: 'Adjust habitat zone heating or engage active thermal flight liner.',
    });
  }

  // 6. Fatigue, Sleep Debt & Circadian Degradation
  if (fatigue.sleepDebtHours > 5.5 || fatigue.cognitiveFatigueScore > 78) {
    riskScore += 25;
    anomalies.push({
      id: 'severe_fatigue',
      title: 'Critical Cognitive Fatigue & Sleep Deficit',
      severity: 'WARNING',
      confidence: 93,
      metric: `Sleep Debt: ${fatigue.sleepDebtHours.toFixed(1)}h | Fatigue: ${fatigue.cognitiveFatigueScore}%`,
      description: 'Severe cognitive degradation, impaired reaction time, and high probability of micro-sleep during critical maneuvers.',
      countermeasure: 'Reschedule non-essential robotic/EVA tasks. Authorize 45-min controlled nap protocol in crew quarters.',
    });
  } else if (fatigue.sleepDebtHours > 3.0 || fatigue.cognitiveFatigueScore > 55) {
    riskScore += 12;
    anomalies.push({
      id: 'moderate_fatigue',
      title: 'Circadian Phase Misalignment',
      severity: 'CAUTION',
      confidence: 85,
      metric: `Fatigue: ${fatigue.cognitiveFatigueScore}% (HRV: ${fatigue.hrvMs}ms)`,
      description: 'Cumulative orbital work cycles causing measurable autonomic fatigue markers.',
      countermeasure: 'Activate blue-enriched light spectrum in crew module to sustain alertness.',
    });
  }

  // 7. Dehydration
  if (vitals.hydration < 60) {
    riskScore += 18;
    anomalies.push({
      id: 'dehydration',
      title: 'Systemic Fluid Depletion (Dehydration)',
      severity: 'WARNING',
      confidence: 91,
      metric: `Hydration Index: ${vitals.hydration}% (Nominal >75%)`,
      description: 'Intravascular volume depletion exacerbated by spaceflight fluid shift and suppressed thirst perception.',
      countermeasure: 'Ingest 500 mL water pouch with balanced oral rehydration electrolytes.',
    });
  }

  // 8. Cosmic Radiation Hazard
  if (environment.radiationMicroSv > 25) {
    riskScore += 30;
    anomalies.push({
      id: 'radiation_spike',
      title: 'Solar Particle Event (SPE) Radiation Hazard',
      severity: 'CRITICAL',
      confidence: 99,
      metric: `Dosimeter: ${environment.radiationMicroSv} μSv/h (Threshold 20)`,
      description: 'Ionizing space radiation flux significantly elevated. Solar proton flux penetrating habitat shields.',
      countermeasure: 'Retreat to storm shelter module (water-wall shielded radiation sanctuary). Cease all EVA.',
    });
  }

  const finalScore = Math.min(100, Math.max(4, riskScore));

  let level = 'NOMINAL';
  let badgeColor = 'emerald';
  if (finalScore >= 75) {
    level = 'CRITICAL';
    badgeColor = 'rose';
  } else if (finalScore >= 50) {
    level = 'WARNING';
    badgeColor = 'amber';
  } else if (finalScore >= 25) {
    level = 'CAUTION';
    badgeColor = 'yellow';
  }

  return {
    score: finalScore,
    level,
    badgeColor,
    anomalies,
    vitalStatus: finalScore > 75 ? 'UNSTABLE' : finalScore > 40 ? 'MONITORED' : 'OPTIMAL',
    predictionSummary:
      anomalies.length > 0
        ? `${anomalies[0].title}: ${anomalies[0].description}`
        : 'All biometric and environmental telemetry channels within nominal spaceflight limits.',
  };
}
