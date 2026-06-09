import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Zap, Crosshair, HelpCircle, Activity } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Laser {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  isBeam: boolean;
  length: number;
  width: number;
  fromRed: boolean;
  angle: number;
}

interface Ship {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  targetAngle: number;
  speed: number;
  color: string;
  glowColor: string;
  engineTrailColor: string;
  engineSize: number;
  isRed: boolean;
  health: number;
  shield: number;
  dodgeCooldown: number;
  lastFired: number;
  isDodging: boolean;
  dodgeProgress: number;
  dodgeDirX: number;
  dodgeDirY: number;
}

export default function SpaceBattle() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [combatSpeed, setCombatSpeed] = useState<1 | 2>(1);
  const [battleLog, setBattleLog] = useState<string[]>([
    'VECTR Battle Core online.',
    'Tracing hostile starfighters...',
    'Tactical feed established.'
  ]);
  const [redStatus, setRedStatus] = useState({ shield: 100, health: 100, isDodging: false, action: 'Cruising' });
  const [blueStatus, setBlueStatus] = useState({ shield: 100, health: 100, isDodging: false, action: 'Cruising' });

  // Add line to log
  const addLog = (msg: string) => {
    setBattleLog(prev => [msg, ...prev.slice(0, 4)]);
  };

  // Keep state in refs for the animation loop to avoid dependency updates in requestAnimationFrame
  const stateRef = useRef<{
    redShip: Ship;
    blueShip: Ship;
    lasers: Laser[];
    particles: Particle[];
    anomaly: { x: number; y: number; active: boolean; life: number } | null;
  }>({
    redShip: {
      x: 100,
      y: 150,
      vx: 0,
      vy: 0,
      angle: 0,
      targetAngle: 0,
      speed: 1.8,
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      engineTrailColor: 'rgba(239, 68, 68, 0.4)',
      engineSize: 22,
      isRed: true,
      health: 100,
      shield: 100,
      dodgeCooldown: 0,
      lastFired: 0,
      isDodging: false,
      dodgeProgress: 0,
      dodgeDirX: 0,
      dodgeDirY: 0
    },
    blueShip: {
      x: 400,
      y: 150,
      vx: 0,
      vy: 0,
      angle: Math.PI,
      targetAngle: Math.PI,
      speed: 2.0,
      color: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.8)',
      engineTrailColor: 'rgba(6, 182, 212, 0.4)',
      engineSize: 18,
      isRed: false,
      health: 100,
      shield: 100,
      dodgeCooldown: 0,
      lastFired: 0,
      isDodging: false,
      dodgeProgress: 0,
      dodgeDirX: 0,
      dodgeDirY: 0
    },
    lasers: [],
    particles: [],
    anomaly: null
  });

  const manualFire = (isRed: boolean) => {
    const { redShip, blueShip, lasers } = stateRef.current;
    const sourceShip = isRed ? redShip : blueShip;
    const targetShip = isRed ? blueShip : redShip;
    
    // Calculate angle towards target
    const dx = targetShip.x - sourceShip.x;
    const dy = targetShip.y - sourceShip.y;
    const angle = Math.atan2(dy, dx);
    const speedMultiplier = combatSpeed === 2 ? 14 : 9;

    if (isRed) {
      // Red continuous heavy beam or thick laser pulse
      lasers.push({
        x: sourceShip.x + Math.cos(sourceShip.angle) * 15,
        y: sourceShip.y + Math.sin(sourceShip.angle) * 15,
        vx: Math.cos(angle) * speedMultiplier,
        vy: Math.sin(angle) * speedMultiplier,
        color: '#fca5a5',
        isBeam: true,
        length: 45,
        width: 5,
        fromRed: true,
        angle
      });
      addLog('Red fires crimson vector beam!');
    } else {
      // Blue fast pulse laser shots
      for (let i = -1; i <= 1; i += 2) {
        const spreadAngle = angle + i * 0.15;
        lasers.push({
          x: sourceShip.x + Math.cos(sourceShip.angle) * 12,
          y: sourceShip.y + Math.sin(sourceShip.angle) * 12,
          vx: Math.cos(spreadAngle) * (speedMultiplier + 2),
          vy: Math.sin(spreadAngle) * (speedMultiplier + 2),
          color: '#22d3ee',
          isBeam: false,
          length: 20,
          width: 3,
          fromRed: false,
          angle: spreadAngle
        });
      }
      addLog('Blue fires dual heavy plasma bolts!');
    }
  };

  const triggerManualBoost = (isRed: boolean) => {
    const { redShip, blueShip } = stateRef.current;
    const target = isRed ? redShip : blueShip;
    
    target.vx += Math.cos(target.angle) * 8;
    target.vy += Math.sin(target.angle) * 8;
    addLog(`${isRed ? 'Red Starfighter' : 'Blue Interceptor'} engine boost engaged!`);
  };

  const deployAnomaly = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Create a gravitational gravity anomaly
    stateRef.current.anomaly = {
      x,
      y,
      active: true,
      life: 180 // 3 seconds at 60fps
    };
    addLog('Spatial hyper-anomaly spawned at coordinates!');
    
    // Spawn cool visual expansion ring
    const colors = ['#f43f5e', '#3b82f6', '#10b981'];
    for (let i = 0; i < 30; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 1 + Math.random() * 3;
      stateRef.current.particles.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 1,
        alpha: 1,
        life: 0,
        maxLife: 60 + Math.random() * 40
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight || 280;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Initial position setup based on actual loaded dimensions
    setTimeout(() => {
      const { redShip, blueShip } = stateRef.current;
      redShip.x = canvas.width * 0.25;
      redShip.y = canvas.height * 0.5;
      blueShip.x = canvas.width * 0.75;
      blueShip.y = canvas.height * 0.5;
    }, 100);

    // Helper functions for simulation frame
    const spawnExplosion = (x: number, y: number, color: string, intensity = 15) => {
      const { particles } = stateRef.current;
      for (let i = 0; i < intensity; i++) {
        const speed = 1 + Math.random() * 4;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          size: Math.random() * 4 + 1.5,
          alpha: 1,
          life: 0,
          maxLife: 30 + Math.random() * 30
        });
      }
    };

    const updateSimulation = () => {
      const { redShip, blueShip, lasers, particles, anomaly } = stateRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const speedCoeff = combatSpeed;

      // Regenerate shields if not damaged recently
      if (redShip.shield < 100) redShip.shield = Math.min(100, redShip.shield + 0.1);
      if (blueShip.shield < 100) blueShip.shield = Math.min(100, blueShip.shield + 0.1);
      if (redShip.health < 100) redShip.health = Math.min(100, redShip.health + 0.02);
      if (blueShip.health < 100) blueShip.health = Math.min(100, blueShip.health + 0.02);

      // Decrement dodge cooldowns
      if (redShip.dodgeCooldown > 0) redShip.dodgeCooldown -= 1;
      if (blueShip.dodgeCooldown > 0) blueShip.dodgeCooldown -= 1;

      // Update statuses in React for sidebar display
      setRedStatus({
        shield: Math.round(redShip.shield),
        health: Math.round(redShip.health),
        isDodging: redShip.isDodging,
        action: redShip.isDodging ? '⚡ DODGING!' : redShip.dodgeCooldown > 20 ? '🔥 Overheated' : 'Target Locked'
      });
      setBlueStatus({
        shield: Math.round(blueShip.shield),
        health: Math.round(blueShip.health),
        isDodging: blueShip.isDodging,
        action: blueShip.isDodging ? '⚡ DODGING!' : blueShip.dodgeCooldown > 20 ? '🔥 Overheated' : 'Intercepting'
      });

      // Update anomaly if active
      if (anomaly && anomaly.active) {
        anomaly.life -= 1;
        if (anomaly.life <= 0) {
          anomaly.active = false;
        }
      }

      // 1. Behavior and Flight Paths
      const ships = [redShip, blueShip];
      ships.forEach((ship, idx) => {
        const other = idx === 0 ? blueShip : redShip;
        
        // Flight mode
        if (ship.isDodging) {
          // Progress dodge sequence
          ship.dodgeProgress += 0.05 * speedCoeff;
          ship.x += ship.dodgeDirX * 7 * speedCoeff;
          ship.y += ship.dodgeDirY * 7 * speedCoeff;
          
          if (ship.dodgeProgress >= 1.0) {
            ship.isDodging = false;
            ship.dodgeProgress = 0;
          }
        } else {
          // Standard combat orbit/weave
          const dx = other.x - ship.x;
          const dy = other.y - ship.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Fly towards other but maintain tactical distance
          let desireAngle = Math.atan2(dy, dx);
          
          if (dist < 120) {
            // Keep backing off / angling away
            desireAngle += Math.PI * 0.75;
          } else if (dist > 280) {
            // Rush directly forward to engage
            desireAngle += Math.sin(Date.now() * 0.002) * 0.3;
          } else {
            // Orbit beautifully
            desireAngle += Math.PI / 2 + Math.cos(Date.now() * 0.001) * 0.4;
          }

          // Apply gravitation pull of spatial anomaly if active
          if (anomaly && anomaly.active) {
            const adx = anomaly.x - ship.x;
            const ady = anomaly.y - ship.y;
            const adist = Math.sqrt(adx * adx + ady * ady);
            if (adist < 140) {
              const pull = (140 - adist) / 30;
              ship.vx += (adx / adist) * pull;
              ship.vy += (ady / adist) * pull;
            }
          }

          // Inertia and angle interpolation
          ship.angle += (desireAngle - ship.angle) * 0.08 * speedCoeff;
          
          const maxSpeed = ship.speed * speedCoeff;
          ship.vx += Math.cos(ship.angle) * 0.25 * speedCoeff;
          ship.vy += Math.sin(ship.angle) * 0.25 * speedCoeff;

          // Drag
          ship.vx *= 0.94;
          ship.vy *= 0.94;

          // Velocity limits
          const curSpeed = Math.sqrt(ship.vx * ship.vx + ship.vy * ship.vy);
          if (curSpeed > maxSpeed) {
            ship.vx = (ship.vx / curSpeed) * maxSpeed;
            ship.vy = (ship.vy / curSpeed) * maxSpeed;
          }

          ship.x += ship.vx;
          ship.y += ship.vy;
        }

        // Keep inside canvas bounds gracefully
        const padding = 20;
        if (ship.x < padding) { ship.x = padding; ship.vx *= -1; }
        if (ship.x > width - padding) { ship.x = width - padding; ship.vx *= -1; }
        if (ship.y < padding) { ship.y = padding; ship.vy *= -1; }
        if (ship.y > height - padding) { ship.y = height - padding; ship.vy *= -1; }

        // Spawn engine trail particles
        if (Math.random() < 0.4) {
          const tailX = ship.x - Math.cos(ship.angle) * 12;
          const tailY = ship.y - Math.sin(ship.angle) * 12;
          particles.push({
            x: tailX,
            y: tailY,
            vx: -Math.cos(ship.angle) * (1 + Math.random() * 2) + (Math.random() - 0.5),
            vy: -Math.sin(ship.angle) * (1 + Math.random() * 2) + (Math.random() - 0.5),
            color: ship.engineTrailColor,
            size: Math.random() * 3 + 1,
            alpha: 0.6,
            life: 0,
            maxLife: 20 + Math.random() * 20
          });
        }

        // AI automated continuous shooting
        const now = Date.now();
        if (now - ship.lastFired > (ship.isRed ? 1400 : 900)) {
          // Check line of sight
          const dx = other.x - ship.x;
          const dy = other.y - ship.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 320) {
            manualFire(ship.isRed);
            ship.lastFired = now;
          }
        }
      });

      // 2. Dodge evasive calculations for threat lasers
      lasers.forEach(laser => {
        ships.forEach(ship => {
          if (laser.fromRed === ship.isRed) return; // ignore friendly lasers

          // Project threat distance
          const dx = laser.x - ship.x;
          const dy = laser.y - ship.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60 && !ship.isDodging && ship.dodgeCooldown === 0) {
            // Sudden evasive dodge trigger!
            ship.isDodging = true;
            ship.dodgeProgress = 0;
            ship.dodgeCooldown = 120; // 2 seconds before next dodge
            
            // Perpendicular dodge path
            const perpX = -laser.vy;
            const perpY = laser.vx;
            const len = Math.sqrt(perpX * perpX + perpY * perpY);
            ship.dodgeDirX = perpX / len;
            ship.dodgeDirY = perpY / len;

            // Dodge effect sparks
            spawnExplosion(ship.x, ship.y, '#e0f2fe', 8);
            addLog(`${ship.isRed ? 'Red Fighter' : 'Blue Interceptor'} executes hypersonic barrel roll!`);
          }
        });
      });

      // 3. Move and resolve lasers
      for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i];
        laser.x += laser.vx * speedCoeff;
        laser.y += laser.vy * speedCoeff;

        // Visual trails/particles
        if (Math.random() < 0.2) {
          particles.push({
            x: laser.x,
            y: laser.y,
            vx: 0,
            vy: 0,
            color: laser.color,
            size: laser.width * 0.8,
            alpha: 0.5,
            life: 0,
            maxLife: 15
          });
        }

        // Check if hit bounds
        if (laser.x < 0 || laser.x > width || laser.y < 0 || laser.y > height) {
          lasers.splice(i, 1);
          continue;
        }

        // Check if hit enemy
        const targetShip = laser.fromRed ? blueShip : redShip;
        const dx = laser.x - targetShip.x;
        const dy = laser.y - targetShip.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 15) {
          // Calculate shields damage
          if (targetShip.shield > 10) {
            targetShip.shield -= laser.isBeam ? 18 : 10;
            // Shield glow pulse effect
            ctx.strokeStyle = targetShip.glowColor;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(targetShip.x, targetShip.y, 22, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            targetShip.health -= laser.isBeam ? 15 : 8;
          }

          // Trigger hit explosion
          spawnExplosion(laser.x, laser.y, targetShip.glowColor, 12);
          addLog(`${targetShip.isRed ? 'Red Starfighter' : 'Blue Interceptor'} shield warning!`);
          
          // Audio or visual flash
          if (targetShip.health <= 0) {
            // Epic system reboot!
            targetShip.health = 100;
            targetShip.shield = 100;
            spawnExplosion(targetShip.x, targetShip.y, '#ffffff', 35);
            addLog(`⚠️ CRITICAL: ${targetShip.isRed ? 'Red' : 'Blue'} core depleted! Restarting...`);
          }

          lasers.splice(i, 1);
        }
      }

      // 4. Update and purge decorative stardust particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;
        p.alpha = 1 - (p.life / p.maxLife);

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { redShip, blueShip, lasers, particles, anomaly } = stateRef.current;

      // Draw active anomaly
      if (anomaly && anomaly.active) {
        ctx.save();
        const pulseRatio = 1 + Math.sin(Date.now() * 0.01) * 0.15;
        const grad = ctx.createRadialGradient(anomaly.x, anomaly.y, 2, anomaly.x, anomaly.y, 35 * pulseRatio);
        grad.addColorStop(0, 'rgba(88, 28, 135, 0.8)');
        grad.addColorStop(0.3, 'rgba(124, 58, 237, 0.4)');
        grad.addColorStop(0.7, 'rgba(6, 182, 212, 0.15)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(anomaly.x, anomaly.y, 40 * pulseRatio, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner black hole dot
        ctx.fillStyle = '#0a0516';
        ctx.beginPath();
        ctx.arc(anomaly.x, anomaly.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // 1. Draw stardust particles
      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw tactical lasers
      lasers.forEach(laser => {
        ctx.save();
        ctx.strokeStyle = laser.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = laser.color;
        ctx.lineWidth = laser.width;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(laser.x, laser.y);
        ctx.lineTo(
          laser.x - Math.cos(laser.angle) * laser.length,
          laser.y - Math.sin(laser.angle) * laser.length
        );
        ctx.stroke();
        ctx.restore();
      });

      // 3. Draw fighters
      const drawShip = (ship: Ship) => {
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.angle);

        // Hover scale feedback
        const scale = ship.isDodging ? 1.4 : 1.0;
        ctx.scale(scale, scale);

        // Glowing backdrop engine
        ctx.shadowBlur = 16;
        ctx.shadowColor = ship.glowColor;
        
        // Draw thrust fire matching color (Flickering engine vector)
        const flameLength = ship.isDodging 
          ? ship.engineSize * 1.8 
          : ship.engineSize * (0.8 + Math.random() * 0.4);
        
        const flameGrad = ctx.createLinearGradient(-15, 0, -15 - flameLength, 0);
        flameGrad.addColorStop(0, '#ffffff');
        flameGrad.addColorStop(0.3, ship.glowColor);
        flameGrad.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.moveTo(-10, -5);
        ctx.lineTo(-10 - flameLength, 0);
        ctx.lineTo(-10, 5);
        ctx.closePath();
        ctx.fill();

        // Unique Ship Vector Shapes
        ctx.strokeStyle = ship.color;
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(0,0,0,0.85)';

        if (ship.isRed) {
          // Needle Aggressive Red Fighter Design
          ctx.beginPath();
          ctx.moveTo(18, 0);       // Nose
          ctx.lineTo(-12, -9);     // Left wing tip
          ctx.lineTo(-6, -3);      // Left thruster intake
          ctx.lineTo(-6, 3);       // Right thruster intake
          ctx.lineTo(-12, 9);      // Right wing tip
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // High tech decorative lines on ship
          ctx.strokeStyle = '#fee2e2';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(10, 0);
          ctx.lineTo(-4, 0);
          ctx.stroke();
        } else {
          // Broad interceptor Blue Fighter Design
          ctx.beginPath();
          ctx.moveTo(15, 0);       // Nose nose cone
          ctx.lineTo(-2, -12);     // Left sweep wing
          ctx.lineTo(-10, -12);    // Left minor tail wing
          ctx.lineTo(-6, -4);      // inner body
          ctx.lineTo(-10, 4);      // Right minor tail wing
          ctx.lineTo(-2, 12);      // Right sweep wing
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // High tech cockpit glow
          ctx.fillStyle = '#22d3ee';
          ctx.beginPath();
          ctx.arc(4, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw shield bubble if health is high
        if (ship.shield > 2) {
          ctx.strokeStyle = ship.isRed ? 'rgba(239, 68, 68, 0.25)' : 'rgba(34, 211, 238, 0.25)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, 20, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();

        // Floating health bar or status badge text above elements
        if (ship.isDodging) {
          ctx.save();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 8px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('EVADE', ship.x, ship.y - 25);
          ctx.restore();
        }
      };

      drawShip(redShip);
      drawShip(blueShip);
    };

    const loop = () => {
      if (isPlaying) {
        updateSimulation();
      }
      draw();
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying, combatSpeed]);

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      
      {/* Simulation Header with Active Controls */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span className="text-[10px] font-mono font-semibold text-neutral-400">TACTICAL RADAR RADIAN FEED</span>
        </div>

        {/* Speed & Play Toggle Buttons */}
        <div className="flex items-center gap-2">
          {/* Speed */}
          <button
            onClick={() => setCombatSpeed(prev => prev === 1 ? 2 : 1)}
            className={`px-2 py-1 rounded text-[8px] font-mono tracking-wider transition-all duration-200 border flex items-center gap-1 ${
              combatSpeed === 2 
                ? 'bg-red-500/20 border-red-500/50 text-red-300' 
                : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
            }`}
            title="Toggle Flight Engine Speed"
          >
            <Zap className={`w-2.5 h-2.5 ${combatSpeed === 2 ? 'text-red-400 fill-red-400/30' : ''}`} />
            {combatSpeed === 2 ? 'HYPER 2X' : 'NORMAL 1X'}
          </button>

          {/* Pause / Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 px-1.5 rounded-md bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-white transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-3 h-3 text-cyan-400" />
            ) : (
              <Play className="w-3 h-3 text-emerald-400" />
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas battle space */}
      <div 
        ref={containerRef}
        className="relative w-full h-[180px] sm:h-[210px] bg-black/40 border border-white/[0.03] rounded-2xl overflow-hidden cursor-crosshair group-hover:border-cyan-500/20 transition-colors"
      >
        <canvas 
          ref={canvasRef}
          onClick={deployAnomaly}
          className="absolute inset-0 w-full h-full"
        />

        {/* Real-time Dynamic Status Bars (Floating) */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 bg-black/60 backdrop-blur-md border border-red-500/10 p-2 rounded-xl text-left pointer-events-none min-w-[110px]">
          <div className="flex items-center justify-between text-[8px] font-mono">
            <span className="text-red-400 font-bold">🟥 STARFIGHTER</span>
            <span className="text-white bg-red-950/80 px-1 rounded">{redStatus.action}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-[8px] font-mono text-neutral-400">
              <span>SHD</span>
              <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden">
                <div style={{ width: `${redStatus.shield}%` }} className="h-full bg-red-500 transition-all duration-150 shadow-[0_0_4px_#ef4444]" />
              </div>
              <span className="w-5 text-right font-semibold">{redStatus.shield}%</span>
            </div>
            <div className="flex items-center gap-1 text-[8px] font-mono text-neutral-400">
              <span>HPR</span>
              <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden">
                <div style={{ width: `${redStatus.health}%` }} className="h-full bg-red-400 transition-all duration-150" />
              </div>
              <span className="w-5 text-right font-semibold">{redStatus.health}%</span>
            </div>
          </div>
        </div>

        <div className="absolute top-2 right-2 flex flex-col gap-1.5 bg-black/60 backdrop-blur-md border border-cyan-500/10 p-2 rounded-xl text-left pointer-events-none min-w-[110px]">
          <div className="flex items-center justify-between text-[8px] font-mono">
            <span className="text-cyan-400 font-bold">🟦 INTERCEPTOR</span>
            <span className="text-white bg-cyan-950/80 px-1 rounded">{blueStatus.action}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-[8px] font-mono text-neutral-400">
              <span>SHD</span>
              <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden">
                <div style={{ width: `${blueStatus.shield}%` }} className="h-full bg-cyan-500 transition-all duration-150 shadow-[0_0_4px_#06b6d4]" />
              </div>
              <span className="w-5 text-right font-semibold">{blueStatus.shield}%</span>
            </div>
            <div className="flex items-center gap-1 text-[8px] font-mono text-neutral-400">
              <span>HPR</span>
              <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden">
                <div style={{ width: `${blueStatus.health}%` }} className="h-full bg-cyan-400 transition-all duration-150" />
              </div>
              <span className="w-5 text-right font-semibold">{blueStatus.health}%</span>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="absolute bottom-2 left-2 pointer-events-none text-[8px] font-mono text-neutral-500 bg-neutral-950/80 px-1.5 py-0.5 rounded border border-white/5 uppercase">
          🚨 Click anywhere on space grid to warp spatial gravity well
        </div>
      </div>

      {/* Manual Force / Fire Override Panels & Interactive Logger */}
      <div className="grid grid-cols-5 gap-3 items-stretch">
        
        {/* Left Interactive panel (Overrides) */}
        <div className="col-span-2 flex flex-col gap-2 bg-white/[0.01] border border-white/5 rounded-xl p-2.5 text-left">
          <span className="text-[7.5px] font-mono text-neutral-400 tracking-wider font-semibold uppercase">Tactical Overrides</span>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => manualFire(true)}
              className="py-1.5 px-2 rounded bg-red-950/30 hover:bg-red-900/40 border border-red-500/20 hover:border-red-500/40 text-[8px] font-mono text-red-300 transition-all cursor-pointer font-bold uppercase tracking-wider"
            >
              Beam Red
            </button>
            <button
              onClick={() => triggerManualBoost(true)}
              className="py-1.5 px-2 rounded bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-700/30 text-[8px] font-mono text-neutral-300 transition-all cursor-pointer font-semibold uppercase"
            >
              Boost Red
            </button>
            <button
              onClick={() => manualFire(false)}
              className="py-1.5 px-2 rounded bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/20 hover:border-cyan-500/40 text-[8px] font-mono text-cyan-300 transition-all cursor-pointer font-bold uppercase tracking-wider"
            >
              Lasers Blue
            </button>
            <button
              onClick={() => triggerManualBoost(false)}
              className="py-1.5 px-2 rounded bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-700/30 text-[8px] font-mono text-neutral-300 transition-all cursor-pointer font-semibold uppercase"
            >
              Boost Blue
            </button>
          </div>
        </div>

        {/* Right scrolling Battle log ticker */}
        <div className="col-span-3 flex flex-col gap-1.5 bg-black/40 border border-white/5 rounded-xl p-2.5 text-left font-mono text-[8px] text-neutral-400">
          <span className="text-[7.5px] text-neutral-500 tracking-wider font-semibold uppercase">Active Battle Status Log</span>
          <div className="flex flex-col gap-1 overflow-hidden h-[44px]">
            {battleLog.map((log, i) => (
              <div 
                key={i} 
                className={`truncate border-l-2 pl-1.5 leading-none transition-all ${
                  log.includes('CRITICAL') || log.includes('⚠️')
                    ? 'border-red-500 text-red-400 font-bold'
                    : log.includes('Red')
                    ? 'border-red-500 text-neutral-300'
                    : log.includes('Blue')
                    ? 'border-cyan-400 text-neutral-300'
                    : 'border-neutral-700 text-neutral-500'
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
