import React from 'react';

const ACCENT = '#A3E635';
const BODY   = '#27272A';
const MUTED  = '#3F3F46';

// Maps muscle group names → which regions to highlight
const muscleMap = {
  'Chest':            { view: 'front', regions: ['chest'] },
  'Upper Chest':      { view: 'front', regions: ['chest-upper'] },
  'Shoulders':        { view: 'front', regions: ['shoulder-l', 'shoulder-r'] },
  'Front Delts':      { view: 'front', regions: ['shoulder-l', 'shoulder-r'] },
  'Side Delts':       { view: 'front', regions: ['shoulder-l', 'shoulder-r'] },
  'Rear Delts':       { view: 'back',  regions: ['rear-delt-l', 'rear-delt-r'] },
  'Triceps':          { view: 'back',  regions: ['tricep-l', 'tricep-r'] },
  'Biceps':           { view: 'front', regions: ['bicep-l', 'bicep-r'] },
  'Brachialis':       { view: 'front', regions: ['bicep-l', 'bicep-r'] },
  'Lats':             { view: 'back',  regions: ['lat-l', 'lat-r'] },
  'Mid Back':         { view: 'back',  regions: ['mid-back'] },
  'Back':             { view: 'back',  regions: ['lat-l', 'lat-r', 'mid-back'] },
  'Full Back':        { view: 'back',  regions: ['lat-l', 'lat-r', 'mid-back', 'traps'] },
  'Lower Back':       { view: 'back',  regions: ['lower-back'] },
  'Traps':            { view: 'back',  regions: ['traps'] },
  'Quads':            { view: 'front', regions: ['quad-l', 'quad-r'] },
  'Hamstrings':       { view: 'back',  regions: ['ham-l', 'ham-r'] },
  'Glutes':           { view: 'back',  regions: ['glute-l', 'glute-r'] },
  'Calves':           { view: 'back',  regions: ['calf-l', 'calf-r'] },
  'Core':             { view: 'front', regions: ['abs'] },
  'Obliques':         { view: 'front', regions: ['oblique-l', 'oblique-r'] },
  'Posterior Chain':  { view: 'back',  regions: ['ham-l', 'ham-r', 'glute-l', 'glute-r'] },
  'Full Body':        { view: 'front', regions: ['chest', 'quad-l', 'quad-r', 'shoulder-l', 'shoulder-r'] },
  'Legs':             { view: 'front', regions: ['quad-l', 'quad-r'] },
  'Arms · Core':      { view: 'front', regions: ['bicep-l', 'bicep-r', 'abs'] },
  'Hips':             { view: 'front', regions: ['quad-l', 'quad-r'] },
  'Upper Back':       { view: 'back',  regions: ['traps', 'mid-back'] },
};

function hl(regions, id) {
  return regions.includes(id) ? ACCENT : MUTED;
}

function FrontBody({ regions }) {
  return (
    <svg viewBox="0 0 80 180" width="80" height="180">
      {/* Head */}
      <circle cx="40" cy="12" r="10" fill={BODY} stroke={MUTED} strokeWidth="1" />

      {/* Neck */}
      <rect x="36" y="21" width="8" height="7" rx="2" fill={BODY} />

      {/* Left shoulder */}
      <ellipse cx="22" cy="35" rx="10" ry="8" fill={hl(regions, 'shoulder-l')} />
      {/* Right shoulder */}
      <ellipse cx="58" cy="35" rx="10" ry="8" fill={hl(regions, 'shoulder-r')} />

      {/* Chest (two pecs) */}
      <path d="M29 30 L41 30 L40 54 L28 52 Z" fill={regions.includes('chest-upper') || regions.includes('chest') ? ACCENT : MUTED} opacity="0.95" />
      <path d="M39 30 L51 30 L52 52 L40 54 Z" fill={regions.includes('chest-upper') || regions.includes('chest') ? ACCENT : MUTED} opacity="0.95" />

      {/* Abs */}
      <rect x="31" y="55" width="8"  height="9" rx="2" fill={hl(regions, 'abs')} />
      <rect x="41" y="55" width="8"  height="9" rx="2" fill={hl(regions, 'abs')} />
      <rect x="31" y="66" width="8"  height="9" rx="2" fill={hl(regions, 'abs')} />
      <rect x="41" y="66" width="8"  height="9" rx="2" fill={hl(regions, 'abs')} />
      <rect x="31" y="77" width="8"  height="9" rx="2" fill={hl(regions, 'abs')} />
      <rect x="41" y="77" width="8"  height="9" rx="2" fill={hl(regions, 'abs')} />

      {/* Obliques */}
      <path d="M28 52 L28 88 L32 88 L31 55 Z" fill={hl(regions, 'oblique-l')} />
      <path d="M52 52 L52 88 L48 88 L49 55 Z" fill={hl(regions, 'oblique-r')} />

      {/* Left upper arm (bicep) */}
      <path d="M12 30 L22 32 L20 70 L10 68 Z" fill={hl(regions, 'bicep-l')} />
      {/* Right upper arm (bicep) */}
      <path d="M68 30 L58 32 L60 70 L70 68 Z" fill={hl(regions, 'bicep-r')} />

      {/* Left forearm */}
      <path d="M10 70 L20 70 L19 100 L9 98 Z" fill={BODY} stroke={MUTED} strokeWidth="0.5" />
      {/* Right forearm */}
      <path d="M70 70 L60 70 L61 100 L71 98 Z" fill={BODY} stroke={MUTED} strokeWidth="0.5" />

      {/* Hip / torso base */}
      <path d="M28 87 L52 87 L54 100 L26 100 Z" fill={BODY} />

      {/* Left quad */}
      <path d="M27 100 L40 100 L39 148 L26 145 Z" fill={hl(regions, 'quad-l')} />
      {/* Right quad */}
      <path d="M40 100 L53 100 L54 145 L41 148 Z" fill={hl(regions, 'quad-r')} />

      {/* Left knee */}
      <ellipse cx="33" cy="150" rx="7" ry="5" fill={BODY} />
      {/* Right knee */}
      <ellipse cx="47" cy="150" rx="7" ry="5" fill={BODY} />

      {/* Left lower leg */}
      <path d="M27 154 L39 154 L38 178 L27 178 Z" fill={BODY} stroke={MUTED} strokeWidth="0.5" />
      {/* Right lower leg */}
      <path d="M41 154 L53 154 L53 178 L42 178 Z" fill={BODY} stroke={MUTED} strokeWidth="0.5" />
    </svg>
  );
}

function BackBody({ regions }) {
  return (
    <svg viewBox="0 0 80 180" width="80" height="180">
      {/* Head */}
      <circle cx="40" cy="12" r="10" fill={BODY} stroke={MUTED} strokeWidth="1" />

      {/* Neck */}
      <rect x="36" y="21" width="8" height="7" rx="2" fill={BODY} />

      {/* Traps */}
      <path d="M29 28 L40 24 L51 28 L48 38 L40 36 L32 38 Z" fill={hl(regions, 'traps')} />

      {/* Left rear delt */}
      <ellipse cx="22" cy="36" rx="10" ry="8" fill={hl(regions, 'rear-delt-l')} />
      {/* Right rear delt */}
      <ellipse cx="58" cy="36" rx="10" ry="8" fill={hl(regions, 'rear-delt-r')} />

      {/* Left lat */}
      <path d="M20 38 L31 38 L34 85 L20 80 Z" fill={hl(regions, 'lat-l')} />
      {/* Right lat */}
      <path d="M60 38 L49 38 L46 85 L60 80 Z" fill={hl(regions, 'lat-r')} />

      {/* Mid back (rhomboids) */}
      <rect x="31" y="38" width="18" height="30" rx="2" fill={hl(regions, 'mid-back')} />

      {/* Lower back */}
      <rect x="32" y="70" width="16" height="18" rx="2" fill={hl(regions, 'lower-back')} />

      {/* Left tricep */}
      <path d="M10 36 L20 38 L18 74 L8 72 Z" fill={hl(regions, 'tricep-l')} />
      {/* Right tricep */}
      <path d="M70 36 L60 38 L62 74 L72 72 Z" fill={hl(regions, 'tricep-r')} />

      {/* Left forearm back */}
      <path d="M8 74 L18 74 L17 100 L7 98 Z" fill={BODY} stroke={MUTED} strokeWidth="0.5" />
      {/* Right forearm back */}
      <path d="M72 74 L62 74 L63 100 L73 98 Z" fill={BODY} stroke={MUTED} strokeWidth="0.5" />

      {/* Left glute */}
      <path d="M26 88 L40 88 L40 108 L25 105 Z" fill={hl(regions, 'glute-l')} />
      {/* Right glute */}
      <path d="M40 88 L54 88 L55 105 L40 108 Z" fill={hl(regions, 'glute-r')} />

      {/* Left hamstring */}
      <path d="M26 106 L40 108 L39 150 L25 147 Z" fill={hl(regions, 'ham-l')} />
      {/* Right hamstring */}
      <path d="M40 108 L54 106 L55 147 L41 150 Z" fill={hl(regions, 'ham-r')} />

      {/* Left knee back */}
      <ellipse cx="33" cy="152" rx="7" ry="5" fill={BODY} />
      {/* Right knee back */}
      <ellipse cx="47" cy="152" rx="7" ry="5" fill={BODY} />

      {/* Left calf */}
      <path d="M27 156 L39 156 L38 178 L27 178 Z" fill={hl(regions, 'calf-l')} />
      {/* Right calf */}
      <path d="M41 156 L53 156 L53 178 L42 178 Z" fill={hl(regions, 'calf-r')} />
    </svg>
  );
}

export default function MuscleImage({ muscle }) {
  const config = muscleMap[muscle] || { view: 'front', regions: [] };
  return (
    <div className="muscle-image">
      <div className="muscle-image__diagram">
        {config.view === 'front'
          ? <FrontBody regions={config.regions} />
          : <BackBody  regions={config.regions} />
        }
      </div>
      <p className="muscle-image__label">{muscle}</p>
    </div>
  );
}
