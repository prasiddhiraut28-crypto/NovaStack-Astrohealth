import React, { useEffect, useRef } from 'react';

export default function EcgWaveform({ heartRate = 75, isCritical = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let x = 0;
    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;

    let beatProgress = 0;

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 16;

      ctx.beginPath();
      for (let gx = 0; gx < width; gx += gridSize) {
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
      }
      for (let gy = 0; gy < height; gy += gridSize) {
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
      }
      ctx.stroke();
    };

    ctx.fillStyle = '#050b18';
    ctx.fillRect(0, 0, width, height);
    drawGrid();

    let prevY = midY;

    const render = () => {
      const beatFrequency = heartRate / 60;
      const pointsPerBeat = Math.max(30, 160 / beatFrequency);

      beatProgress = (beatProgress + 1) % pointsPerBeat;
      const t = beatProgress / pointsPerBeat;

      let yOffset = 0;

      if (t >= 0.1 && t < 0.18) {
        yOffset = -Math.sin(((t - 0.1) / 0.08) * Math.PI) * (height * 0.12);
      } else if (t >= 0.22 && t < 0.25) {
        yOffset = ((t - 0.22) / 0.03) * (height * 0.08);
      } else if (t >= 0.25 && t < 0.31) {
        const peakProgress = (t - 0.25) / 0.06;
        if (peakProgress < 0.5) {
          yOffset = (height * 0.08) - (peakProgress * 2) * (height * 0.52);
        } else {
          yOffset = -(height * 0.44) + ((peakProgress - 0.5) * 2) * (height * 0.58);
        }
      } else if (t >= 0.31 && t < 0.35) {
        yOffset = (height * 0.14) - ((t - 0.31) / 0.04) * (height * 0.14);
      } else if (t >= 0.45 && t < 0.6) {
        yOffset = -Math.sin(((t - 0.45) / 0.15) * Math.PI) * (height * 0.18);
      } else {
        yOffset = (Math.random() - 0.5) * 2;
      }

      const currentY = midY + yOffset;

      ctx.fillStyle = '#050b18';
      ctx.fillRect(x + 1, 0, 12, height);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      const nextGridX = Math.floor((x + 1) / 16) * 16;
      ctx.moveTo(nextGridX, 0);
      ctx.lineTo(nextGridX, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = isCritical ? '#ef4444' : '#00f0ff';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = isCritical ? '#ef4444' : '#00f0ff';
      ctx.shadowBlur = 6;
      ctx.moveTo(x === 0 ? 0 : x - 2, prevY);
      ctx.lineTo(x, currentY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      prevY = currentY;
      x = (x + 2) % width;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [heartRate, isCritical]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-cyan-500/20 bg-slate-950/80 p-2 shadow-inner">
      <div className="absolute top-2 left-3 flex items-center space-x-2 z-10">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/80">
          LEAD-II TELEMETRIC CARDIOGRAM // 25mm/s
        </span>
      </div>
      <div className="absolute top-2 right-3 font-mono text-xs text-slate-400 z-10">
        {heartRate} <span className="text-[10px] text-slate-500">BPM</span>
      </div>
      <canvas
        ref={canvasRef}
        width={560}
        height={100}
        className="w-full h-24 block rounded-lg"
      />
    </div>
  );
}
