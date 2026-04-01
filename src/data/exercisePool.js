// Alternative exercises grouped by primary muscle for the swap feature
export const exercisePool = {
  'Chest': [
    { id: 'alt-flat-bb', name: 'Barbell Bench Press', sets: 4, reps: '6-8', restSeconds: 120, notes: 'Retract scapula, touch mid-chest' },
    { id: 'alt-flat-db', name: 'Dumbbell Bench Press', sets: 4, reps: '8-10', restSeconds: 90, notes: 'Full stretch at bottom, squeeze at top' },
    { id: 'alt-incline-bb', name: 'Incline Barbell Press', sets: 4, reps: '8-10', restSeconds: 90, notes: '30° incline, touch upper chest' },
    { id: 'alt-incline-db', name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', restSeconds: 75, notes: 'Elbows at 45°, squeeze at top' },
    { id: 'alt-cable-fly', name: 'Cable Crossover', sets: 3, reps: '12-15', restSeconds: 60, notes: 'Contract across midline, soft elbows' },
    { id: 'alt-pec-deck', name: 'Pec Deck Fly', sets: 3, reps: '12-15', restSeconds: 60, notes: 'Slow eccentric, full stretch' },
    { id: 'alt-push-up', name: 'Push-Up', sets: 4, reps: '15-20', restSeconds: 60, notes: 'Chest to floor, full lockout' },
    { id: 'alt-dip-chest', name: 'Chest Dip', sets: 3, reps: '10-12', restSeconds: 75, notes: 'Lean forward, elbows flared out' },
  ],
  'Upper Chest': [
    { id: 'alt-inc-bb', name: 'Incline Barbell Press', sets: 4, reps: '8-10', restSeconds: 90, notes: '30° incline' },
    { id: 'alt-inc-db2', name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', restSeconds: 75, notes: 'Elbows track naturally' },
    { id: 'alt-inc-fly', name: 'Incline Dumbbell Fly', sets: 3, reps: '12-15', restSeconds: 60, notes: 'Big arc, feel the upper chest stretch' },
    { id: 'alt-low-cable-fly', name: 'Low Cable Fly', sets: 3, reps: '12-15', restSeconds: 60, notes: 'Pull upward to target upper chest' },
    { id: 'alt-pike-push', name: 'Pike Push-Up', sets: 3, reps: '12-15', restSeconds: 60, notes: 'Hips high, head toward ground' },
  ],
  'Shoulders': [
    { id: 'alt-bb-ohp', name: 'Barbell Overhead Press', sets: 4, reps: '6-8', restSeconds: 120, notes: 'Bar to chin, full lockout' },
    { id: 'alt-db-ohp', name: 'Dumbbell Shoulder Press', sets: 4, reps: '8-10', restSeconds: 90, notes: 'Neutral spine, controlled' },
    { id: 'alt-arnold', name: 'Arnold Press', sets: 3, reps: '10-12', restSeconds: 75, notes: 'Rotate palms out as you press' },
    { id: 'alt-lat-raise', name: 'Dumbbell Lateral Raise', sets: 4, reps: '15-20', restSeconds: 45, notes: 'Lead with elbows, slight forward lean' },
    { id: 'alt-cable-lat', name: 'Cable Lateral Raise', sets: 3, reps: '15', restSeconds: 45, notes: 'Constant tension throughout' },
    { id: 'alt-face-pull', name: 'Face Pull', sets: 3, reps: '15-20', restSeconds: 45, notes: 'High pulley, external rotation at end' },
    { id: 'alt-upright-row', name: 'Upright Row', sets: 3, reps: '12', restSeconds: 60, notes: 'Elbows lead, pull to chin level' },
  ],
  'Front Delts': [
    { id: 'alt-front-raise-db', name: 'Dumbbell Front Raise', sets: 3, reps: '12-15', restSeconds: 45, notes: 'Raise to shoulder height, control down' },
    { id: 'alt-front-raise-bar', name: 'Barbell Front Raise', sets: 3, reps: '12', restSeconds: 45, notes: 'Both hands, shoulder width' },
    { id: 'alt-plate-raise', name: 'Plate Front Raise', sets: 3, reps: '12-15', restSeconds: 45, notes: 'Hold plate by sides, raise to eye level' },
    { id: 'alt-inc-front-raise', name: 'Incline Front Raise', sets: 3, reps: '12', restSeconds: 45, notes: 'Lean back on bench for stretch' },
  ],
  'Side Delts': [
    { id: 'alt-db-lat', name: 'Dumbbell Lateral Raise', sets: 4, reps: '15-20', restSeconds: 45, notes: 'Slight forward lean, lead with elbows' },
    { id: 'alt-cable-lat2', name: 'Cable Lateral Raise', sets: 3, reps: '15', restSeconds: 45, notes: 'Cable from low pulley' },
    { id: 'alt-machine-lat', name: 'Lateral Raise Machine', sets: 3, reps: '15-20', restSeconds: 45, notes: 'Constant tension, squeeze at top' },
  ],
  'Rear Delts': [
    { id: 'alt-rear-delt-fly', name: 'Rear Delt DB Fly', sets: 4, reps: '15-20', restSeconds: 60, notes: 'Bend 45°, elbows slightly bent' },
    { id: 'alt-face-pull2', name: 'Face Pull', sets: 3, reps: '20', restSeconds: 45, notes: 'External rotation at end' },
    { id: 'alt-reverse-pec', name: 'Reverse Pec Deck', sets: 3, reps: '15', restSeconds: 45, notes: 'Keep elbows high' },
    { id: 'alt-band-pull-apart', name: 'Band Pull Apart', sets: 3, reps: '20', restSeconds: 30, notes: 'Thumbs up, pull to chest' },
  ],
  'Triceps': [
    { id: 'alt-tri-pushdown', name: 'Tricep Pushdown', sets: 3, reps: '12-15', restSeconds: 60, notes: 'Elbows fixed, full extension' },
    { id: 'alt-overhead-ext', name: 'Overhead Tricep Extension', sets: 3, reps: '12-15', restSeconds: 60, notes: 'Feel long head stretch' },
    { id: 'alt-skull-crusher', name: 'Skull Crusher', sets: 3, reps: '10-12', restSeconds: 75, notes: 'Bar to forehead, elbows in' },
    { id: 'alt-cgbp', name: 'Close Grip Bench Press', sets: 4, reps: '10-12', restSeconds: 75, notes: 'Shoulder-width grip, elbows tucked' },
    { id: 'alt-dip-tri', name: 'Tricep Dip', sets: 3, reps: '12-15', restSeconds: 60, notes: 'Upright torso, elbows back' },
    { id: 'alt-kickback', name: 'Tricep Kickback', sets: 3, reps: '15', restSeconds: 45, notes: 'Full extension, squeeze at top' },
  ],
  'Biceps': [
    { id: 'alt-barbell-curl', name: 'Barbell Curl', sets: 3, reps: '10-12', restSeconds: 60, notes: 'No swinging, full range' },
    { id: 'alt-db-curl', name: 'Dumbbell Curl', sets: 3, reps: '12', restSeconds: 60, notes: 'Supinate at top, squeeze' },
    { id: 'alt-hammer-curl', name: 'Hammer Curl', sets: 3, reps: '12', restSeconds: 60, notes: 'Neutral grip, targets brachialis' },
    { id: 'alt-incline-curl', name: 'Incline Dumbbell Curl', sets: 3, reps: '10-12', restSeconds: 60, notes: 'Long head stretch from incline' },
    { id: 'alt-conc-curl', name: 'Concentration Curl', sets: 3, reps: '12-15', restSeconds: 45, notes: 'Elbow on inner thigh, peak squeeze' },
    { id: 'alt-cable-curl', name: 'Cable Curl', sets: 3, reps: '12-15', restSeconds: 45, notes: 'Constant tension through range' },
    { id: 'alt-preacher-curl', name: 'Preacher Curl', sets: 3, reps: '10-12', restSeconds: 75, notes: 'Full extension at bottom' },
  ],
  'Brachialis': [
    { id: 'alt-hammer2', name: 'Hammer Curl', sets: 3, reps: '12', restSeconds: 60, notes: 'Neutral grip throughout' },
    { id: 'alt-cross-curl', name: 'Cross-Body Curl', sets: 3, reps: '12', restSeconds: 45, notes: 'Curl across midline' },
    { id: 'alt-reverse-curl', name: 'Reverse Curl', sets: 3, reps: '12', restSeconds: 45, notes: 'Overhand grip, wrists neutral' },
  ],
  'Lats': [
    { id: 'alt-pullup', name: 'Pull-Up', sets: 4, reps: '6-10', restSeconds: 120, notes: 'Full dead hang, chin over bar' },
    { id: 'alt-lat-pulldown', name: 'Lat Pulldown', sets: 4, reps: '10-12', restSeconds: 75, notes: 'Pull to upper chest, squeeze lats' },
    { id: 'alt-straight-arm', name: 'Straight Arm Pulldown', sets: 3, reps: '15', restSeconds: 60, notes: 'Arms straight, feel the lat stretch' },
    { id: 'alt-db-pullover', name: 'Dumbbell Pullover', sets: 3, reps: '12', restSeconds: 75, notes: 'Feel lats stretch over bench' },
    { id: 'alt-single-row', name: 'Single Arm DB Row', sets: 4, reps: '10-12', restSeconds: 75, notes: 'Elbow drives past hip' },
  ],
  'Mid Back': [
    { id: 'alt-bb-row', name: 'Barbell Bent-Over Row', sets: 4, reps: '8-10', restSeconds: 90, notes: 'Row to lower chest, squeeze' },
    { id: 'alt-cable-row', name: 'Seated Cable Row', sets: 3, reps: '10-12', restSeconds: 75, notes: 'Chest tall, elbows drive back' },
    { id: 'alt-chest-sup-row', name: 'Chest Supported Row', sets: 3, reps: '12', restSeconds: 75, notes: 'Eliminates momentum' },
    { id: 'alt-tbar-row', name: 'T-Bar Row', sets: 4, reps: '8-10', restSeconds: 90, notes: 'Elbows at 45°, chest to pad' },
  ],
  'Back': [
    { id: 'alt-deadlift', name: 'Conventional Deadlift', sets: 4, reps: '4-6', restSeconds: 180, notes: 'Neutral spine, push floor away' },
    { id: 'alt-sumo-dl', name: 'Sumo Deadlift', sets: 4, reps: '5-6', restSeconds: 180, notes: 'Wide stance, toes out' },
    { id: 'alt-trap-bar-dl', name: 'Trap Bar Deadlift', sets: 4, reps: '5-6', restSeconds: 180, notes: 'More quad dominant, easier on back' },
    { id: 'alt-rack-pull', name: 'Rack Pull', sets: 4, reps: '4-6', restSeconds: 180, notes: 'From knee height for upper back' },
    { id: 'alt-hyperext', name: 'Hyperextension', sets: 3, reps: '15', restSeconds: 60, notes: 'Control the eccentric' },
  ],
  'Full Back': [
    { id: 'alt-dl2', name: 'Conventional Deadlift', sets: 4, reps: '5', restSeconds: 180, notes: 'Hip hinge, neutral spine' },
    { id: 'alt-row-dl', name: 'Barbell Row', sets: 4, reps: '8', restSeconds: 90, notes: 'Row after each deadlift rep' },
  ],
  'Quads': [
    { id: 'alt-bb-squat', name: 'Barbell Back Squat', sets: 4, reps: '6-8', restSeconds: 150, notes: 'Break parallel, chest up' },
    { id: 'alt-front-squat', name: 'Front Squat', sets: 4, reps: '6-8', restSeconds: 120, notes: 'More upright torso, elbows high' },
    { id: 'alt-leg-press', name: 'Leg Press', sets: 4, reps: '10-12', restSeconds: 90, notes: 'Full range of motion, heels on pad' },
    { id: 'alt-hack-squat', name: 'Hack Squat', sets: 4, reps: '10-12', restSeconds: 90, notes: 'High foot placement for quads' },
    { id: 'alt-leg-ext', name: 'Leg Extension', sets: 3, reps: '15-20', restSeconds: 60, notes: 'Full extension, pause at top' },
    { id: 'alt-lunge', name: 'Walking Lunge', sets: 3, reps: '12 each', restSeconds: 75, notes: 'Big step, knee tracks over toe' },
    { id: 'alt-bulgsp', name: 'Bulgarian Split Squat', sets: 3, reps: '10-12', restSeconds: 90, notes: 'Front shin vertical' },
    { id: 'alt-goblet', name: 'Goblet Squat', sets: 3, reps: '15', restSeconds: 60, notes: 'Heels elevated if needed' },
  ],
  'Hamstrings': [
    { id: 'alt-rdl', name: 'Romanian Deadlift', sets: 4, reps: '8-10', restSeconds: 90, notes: 'Hinge at hips, feel the stretch' },
    { id: 'alt-lying-curl', name: 'Lying Leg Curl', sets: 4, reps: '10-12', restSeconds: 75, notes: 'Curl to 90°, squeeze' },
    { id: 'alt-seated-curl', name: 'Seated Leg Curl', sets: 3, reps: '12-15', restSeconds: 60, notes: 'Slow on the way up' },
    { id: 'alt-nordic', name: 'Nordic Hamstring Curl', sets: 3, reps: '8', restSeconds: 120, notes: 'Lower slowly, push up with hands' },
    { id: 'alt-sldl', name: 'Single Leg Deadlift', sets: 3, reps: '10 each', restSeconds: 75, notes: 'Balance and stretch' },
  ],
  'Glutes': [
    { id: 'alt-hip-thrust', name: 'Hip Thrust', sets: 4, reps: '10-12', restSeconds: 90, notes: 'Squeeze hard at top, chin tucked' },
    { id: 'alt-glute-bridge', name: 'Glute Bridge', sets: 4, reps: '15-20', restSeconds: 60, notes: 'Push through heels' },
    { id: 'alt-cable-kickback', name: 'Cable Glute Kickback', sets: 3, reps: '15', restSeconds: 45, notes: 'Squeeze at top of movement' },
    { id: 'alt-sumo-squat', name: 'Sumo Squat', sets: 3, reps: '12-15', restSeconds: 60, notes: 'Wide stance, toes out 45°' },
  ],
  'Calves': [
    { id: 'alt-standing-calf', name: 'Standing Calf Raise', sets: 5, reps: '15-20', restSeconds: 45, notes: 'Full range, pause at bottom' },
    { id: 'alt-seated-calf', name: 'Seated Calf Raise', sets: 5, reps: '15-20', restSeconds: 45, notes: 'Soleus focus with bent knee' },
    { id: 'alt-donkey-calf', name: 'Donkey Calf Raise', sets: 4, reps: '15-20', restSeconds: 45, notes: 'Lean forward for better stretch' },
    { id: 'alt-jump-rope', name: 'Jump Rope', sets: 3, reps: '60s', restSeconds: 30, notes: 'Stay on balls of feet' },
  ],
  'Core': [
    { id: 'alt-plank', name: 'Plank Hold', sets: 3, reps: '60s', restSeconds: 30, notes: 'Neutral spine, brace hard' },
    { id: 'alt-ab-wheel', name: 'Ab Wheel Rollout', sets: 3, reps: '10-12', restSeconds: 60, notes: 'Brace core, slow rollout' },
    { id: 'alt-hanging-raise', name: 'Hanging Leg Raise', sets: 3, reps: '15', restSeconds: 60, notes: 'Control the swing' },
    { id: 'alt-cable-crunch', name: 'Cable Crunch', sets: 3, reps: '15-20', restSeconds: 45, notes: 'Elbows to knees, crunch hard' },
    { id: 'alt-bicycle', name: 'Bicycle Crunch', sets: 3, reps: '20', restSeconds: 30, notes: 'Slow and deliberate rotation' },
    { id: 'alt-dead-bug', name: 'Dead Bug', sets: 3, reps: '10 each', restSeconds: 30, notes: 'Lower back stays on floor' },
  ],
  'Obliques': [
    { id: 'alt-russian-twist', name: 'Russian Twist', sets: 3, reps: '20', restSeconds: 30, notes: 'Touch floor each side' },
    { id: 'alt-pallof-press', name: 'Pallof Press', sets: 3, reps: '12 each', restSeconds: 45, notes: 'Resist rotation throughout' },
    { id: 'alt-side-plank', name: 'Side Plank', sets: 3, reps: '45s each', restSeconds: 30, notes: 'Hips stacked and lifted' },
    { id: 'alt-woodchop', name: 'Cable Woodchop', sets: 3, reps: '12 each', restSeconds: 45, notes: 'Rotate from hips and torso' },
  ],
  'Full Body': [
    { id: 'alt-burpee', name: 'Burpee', sets: 4, reps: '10', restSeconds: 45, notes: 'Explosive jump at top' },
    { id: 'alt-thruster', name: 'Dumbbell Thruster', sets: 4, reps: '12', restSeconds: 60, notes: 'Squat to press in one fluid motion' },
    { id: 'alt-kb-swing', name: 'Kettlebell Swing', sets: 4, reps: '20', restSeconds: 45, notes: 'Hip hinge, not a squat' },
    { id: 'alt-clean-press', name: 'Dumbbell Clean & Press', sets: 3, reps: '10', restSeconds: 75, notes: 'Power from hips, punch up overhead' },
    { id: 'alt-tgu', name: 'Turkish Get-Up', sets: 3, reps: '3 each', restSeconds: 60, notes: 'Slow and controlled every step' },
  ],
  'Posterior Chain': [
    { id: 'alt-kb-swing2', name: 'Kettlebell Swing', sets: 4, reps: '20', restSeconds: 45, notes: 'Hinge from hips, explosive extension' },
    { id: 'alt-good-morning', name: 'Good Morning', sets: 3, reps: '12', restSeconds: 75, notes: 'Slight bend in knees, hinge deep' },
    { id: 'alt-back-ext', name: 'Back Extension', sets: 3, reps: '15', restSeconds: 60, notes: 'Squeeze glutes at top' },
  ],
  'Lower Back': [
    { id: 'alt-superman', name: 'Superman Hold', sets: 3, reps: '15', restSeconds: 30, notes: 'Hold 2 seconds at top' },
    { id: 'alt-back-ext2', name: 'Back Extension', sets: 3, reps: '15', restSeconds: 60, notes: 'Control the lowering phase' },
    { id: 'alt-bird-dog', name: 'Bird Dog', sets: 3, reps: '10 each', restSeconds: 30, notes: 'Opposite arm and leg, hold 2s' },
  ],
  'Traps': [
    { id: 'alt-shrug', name: 'Barbell Shrug', sets: 4, reps: '12-15', restSeconds: 60, notes: 'Straight up, hold at top' },
    { id: 'alt-db-shrug', name: 'Dumbbell Shrug', sets: 4, reps: '12-15', restSeconds: 60, notes: 'Full range, squeeze hard' },
    { id: 'alt-farmers-walk', name: "Farmer's Walk", sets: 3, reps: '40m', restSeconds: 90, notes: 'Tall posture, controlled steps' },
  ],
  'Legs': [
    { id: 'alt-box-jump', name: 'Box Jump', sets: 4, reps: '8', restSeconds: 60, notes: 'Land softly with soft knees' },
    { id: 'alt-step-up', name: 'Step-Up', sets: 3, reps: '12 each', restSeconds: 60, notes: 'Drive through heel on top foot' },
    { id: 'alt-jump-squat', name: 'Jump Squat', sets: 4, reps: '12', restSeconds: 45, notes: 'Land and go right back down' },
    { id: 'alt-wall-sit', name: 'Wall Sit', sets: 3, reps: '60s', restSeconds: 45, notes: 'Thighs parallel, back flat' },
  ],
  'Arms · Core': [
    { id: 'alt-battle-rope', name: 'Battle Rope Waves', sets: 4, reps: '30s', restSeconds: 30, notes: 'Drive from shoulders, keep waves consistent' },
    { id: 'alt-rope-slam', name: 'Rope Slam', sets: 4, reps: '10', restSeconds: 45, notes: 'Full overhead extension, slam hard' },
    { id: 'alt-med-ball', name: 'Med Ball Slam', sets: 3, reps: '15', restSeconds: 30, notes: 'Full body extension overhead' },
  ],
};

// Helper: get alternatives for a given muscle group (excluding current exercise by id)
export function getAlternatives(muscle, currentExerciseId) {
  const pool = exercisePool[muscle] || exercisePool['Full Body'];
  return pool.filter(ex => ex.id !== currentExerciseId).map(ex => ({ ...ex, muscle }));
}
