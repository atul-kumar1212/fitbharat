export const exerciseCategories = [
  'All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Cardio', 'Yoga'
];

export const exercises = [
  {
    id: 1,
    name: 'Barbell Bench Press',
    category: 'Chest',
    muscles: ['Pectorals', 'Triceps', 'Delts'],
    emoji: '🏋️',
    difficulty: 'Intermediate',
    sets: '4',
    reps: '8-12',
    rest: '90s',
    calories: 120,
    instructions: [
      'Lie flat on a bench with feet flat on the floor',
      'Grip the bar slightly wider than shoulder-width',
      'Unrack the bar and lower it slowly to mid-chest',
      'Press the bar back up to the starting position',
      'Keep your back slightly arched and shoulders retracted'
    ],
    tips: 'Focus on squeezing your chest at the top of the movement. Don\'t bounce the bar off your chest.'
  },
  {
    id: 2,
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    muscles: ['Upper Chest', 'Triceps'],
    emoji: '💪',
    difficulty: 'Intermediate',
    sets: '3',
    reps: '10-12',
    rest: '60s',
    calories: 100,
    instructions: [
      'Set bench to 30-45 degree incline',
      'Hold dumbbells at shoulder level',
      'Press dumbbells up and together',
      'Lower slowly to starting position'
    ],
    tips: 'Keep elbows at 45 degrees to protect shoulders.'
  },
  {
    id: 3,
    name: 'Push-ups',
    category: 'Chest',
    muscles: ['Pectorals', 'Triceps', 'Core'],
    emoji: '🫸',
    difficulty: 'Beginner',
    sets: '3',
    reps: '15-20',
    rest: '45s',
    calories: 80,
    instructions: [
      'Start in a plank position with hands shoulder-width apart',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your body in a straight line throughout'
    ],
    tips: 'Great bodyweight exercise. Modify on knees if needed.'
  },
  {
    id: 4,
    name: 'Pull-ups',
    category: 'Back',
    muscles: ['Lats', 'Biceps', 'Rhomboids'],
    emoji: '🧗',
    difficulty: 'Intermediate',
    sets: '4',
    reps: '6-10',
    rest: '90s',
    calories: 110,
    instructions: [
      'Grab the bar with overhand grip, slightly wider than shoulders',
      'Hang with arms fully extended',
      'Pull yourself up until chin is over the bar',
      'Lower yourself slowly to starting position'
    ],
    tips: 'Use a resistance band for assistance if you can\'t do full pull-ups.'
  },
  {
    id: 5,
    name: 'Barbell Rows',
    category: 'Back',
    muscles: ['Lats', 'Rhomboids', 'Biceps'],
    emoji: '🏋️',
    difficulty: 'Intermediate',
    sets: '4',
    reps: '8-12',
    rest: '90s',
    calories: 115,
    instructions: [
      'Bend at hips, keeping back straight at 45 degrees',
      'Grip barbell slightly wider than shoulder-width',
      'Pull bar to lower chest / upper abs',
      'Squeeze shoulder blades together at top',
      'Lower bar slowly to starting position'
    ],
    tips: 'Keep your core tight and don\'t use momentum.'
  },
  {
    id: 6,
    name: 'Deadlift',
    category: 'Back',
    muscles: ['Lower Back', 'Glutes', 'Hamstrings'],
    emoji: '🔥',
    difficulty: 'Advanced',
    sets: '4',
    reps: '5-8',
    rest: '120s',
    calories: 150,
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Hinge at hips and grip the bar',
      'Keep back flat, chest up',
      'Drive through heels to stand up',
      'Lower the bar by hinging at hips'
    ],
    tips: 'Master form with light weight before going heavy. This is the king of exercises!'
  },
  {
    id: 7,
    name: 'Overhead Press',
    category: 'Shoulders',
    muscles: ['Deltoids', 'Triceps', 'Upper Chest'],
    emoji: '🙌',
    difficulty: 'Intermediate',
    sets: '4',
    reps: '8-10',
    rest: '90s',
    calories: 100,
    instructions: [
      'Stand with bar at shoulder level',
      'Press bar overhead until arms are fully extended',
      'Lower bar slowly back to shoulders',
      'Keep core tight throughout'
    ],
    tips: 'Don\'t lean back excessively. Brace your core.'
  },
  {
    id: 8,
    name: 'Lateral Raises',
    category: 'Shoulders',
    muscles: ['Side Deltoids'],
    emoji: '🦅',
    difficulty: 'Beginner',
    sets: '3',
    reps: '12-15',
    rest: '45s',
    calories: 60,
    instructions: [
      'Hold dumbbells at your sides',
      'Raise arms out to sides until parallel with floor',
      'Keep slight bend in elbows',
      'Lower slowly to starting position'
    ],
    tips: 'Use lighter weight with strict form. Lead with your elbows.'
  },
  {
    id: 9,
    name: 'Bicep Curls',
    category: 'Arms',
    muscles: ['Biceps', 'Forearms'],
    emoji: '💪',
    difficulty: 'Beginner',
    sets: '3',
    reps: '10-12',
    rest: '60s',
    calories: 70,
    instructions: [
      'Stand with dumbbells at your sides, palms forward',
      'Curl weights up while keeping elbows fixed',
      'Squeeze biceps at the top',
      'Lower slowly to starting position'
    ],
    tips: 'Don\'t swing your body. Isolate the biceps.'
  },
  {
    id: 10,
    name: 'Tricep Dips',
    category: 'Arms',
    muscles: ['Triceps', 'Chest', 'Shoulders'],
    emoji: '🏋️',
    difficulty: 'Intermediate',
    sets: '3',
    reps: '8-12',
    rest: '60s',
    calories: 85,
    instructions: [
      'Grip parallel bars, arms extended',
      'Lower your body by bending elbows',
      'Go down until upper arms are parallel to floor',
      'Push back up to starting position'
    ],
    tips: 'Lean slightly forward to target chest more, stay upright for triceps.'
  },
  {
    id: 11,
    name: 'Squats',
    category: 'Legs',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    emoji: '🦵',
    difficulty: 'Intermediate',
    sets: '4',
    reps: '8-12',
    rest: '120s',
    calories: 140,
    instructions: [
      'Stand with bar on upper back, feet shoulder-width apart',
      'Bend knees and hips to lower your body',
      'Go down until thighs are parallel to floor',
      'Drive through heels to stand back up',
      'Keep chest up and knees tracking over toes'
    ],
    tips: 'Depth is important. Go at least to parallel for full benefit.'
  },
  {
    id: 12,
    name: 'Lunges',
    category: 'Legs',
    muscles: ['Quadriceps', 'Glutes'],
    emoji: '🚶',
    difficulty: 'Beginner',
    sets: '3',
    reps: '10 each leg',
    rest: '60s',
    calories: 90,
    instructions: [
      'Stand tall with feet hip-width apart',
      'Step forward with one leg',
      'Lower your body until both knees are at 90 degrees',
      'Push back to starting position',
      'Alternate legs'
    ],
    tips: 'Keep your front knee behind your toes.'
  },
  {
    id: 13,
    name: 'Plank',
    category: 'Core',
    muscles: ['Abs', 'Obliques', 'Lower Back'],
    emoji: '🧘',
    difficulty: 'Beginner',
    sets: '3',
    reps: '30-60s',
    rest: '30s',
    calories: 50,
    instructions: [
      'Get into push-up position on forearms',
      'Keep body in straight line from head to heels',
      'Engage your core and squeeze glutes',
      'Hold the position for the designated time'
    ],
    tips: 'Don\'t let your hips sag or pike up.'
  },
  {
    id: 14,
    name: 'Russian Twists',
    category: 'Core',
    muscles: ['Obliques', 'Abs'],
    emoji: '🔄',
    difficulty: 'Beginner',
    sets: '3',
    reps: '20 total',
    rest: '45s',
    calories: 55,
    instructions: [
      'Sit with knees bent, feet slightly off floor',
      'Lean back slightly, keeping back straight',
      'Twist torso to one side, then the other',
      'Hold a weight for added difficulty'
    ],
    tips: 'Move from your torso, not just your arms.'
  },
  {
    id: 15,
    name: 'Treadmill Running',
    category: 'Cardio',
    muscles: ['Full Body'],
    emoji: '🏃',
    difficulty: 'Beginner',
    sets: '1',
    reps: '20-30 min',
    rest: 'N/A',
    calories: 250,
    instructions: [
      'Start with a 5-minute warm-up walk',
      'Gradually increase speed to comfortable running pace',
      'Maintain good posture - chest up, arms swinging',
      'Cool down with 5-minute walk after'
    ],
    tips: 'Start slow and build up. Consistency matters more than speed.'
  },
  {
    id: 16,
    name: 'Surya Namaskar',
    category: 'Yoga',
    muscles: ['Full Body', 'Flexibility'],
    emoji: '🙏',
    difficulty: 'Beginner',
    sets: '5-12',
    reps: 'rounds',
    rest: '30s',
    calories: 140,
    instructions: [
      'Pranamasana (Prayer Pose)',
      'Hasta Uttanasana (Raised Arms)',
      'Uttanasana (Forward Bend)',
      'Ashwa Sanchalanasana (Equestrian Pose)',
      'Dandasana (Stick Pose)',
      'Ashtanga Namaskar (Eight Limbed Pose)',
      'Bhujangasana (Cobra Pose)',
      'Adho Mukha Svanasana (Downward Dog)',
      'Return through poses in reverse'
    ],
    tips: 'Best performed early morning on an empty stomach. Great for overall fitness.'
  },
  {
    id: 17,
    name: 'Leg Press',
    category: 'Legs',
    muscles: ['Quadriceps', 'Glutes', 'Calves'],
    emoji: '🦿',
    difficulty: 'Beginner',
    sets: '4',
    reps: '10-15',
    rest: '90s',
    calories: 110,
    instructions: [
      'Sit on leg press machine with back flat on pad',
      'Place feet shoulder-width apart on platform',
      'Release safety handles and lower weight',
      'Push platform away until legs nearly extended',
      'Don\'t lock knees at the top'
    ],
    tips: 'Great for building leg strength safely. Adjust foot placement to target different muscles.'
  },
  {
    id: 18,
    name: 'Cable Flyes',
    category: 'Chest',
    muscles: ['Pectorals', 'Front Delts'],
    emoji: '🦋',
    difficulty: 'Intermediate',
    sets: '3',
    reps: '12-15',
    rest: '60s',
    calories: 75,
    instructions: [
      'Set cables at appropriate height',
      'Stand with one foot forward for stability',
      'Bring handles together in front of chest',
      'Squeeze chest at the center',
      'Slowly return to starting position'
    ],
    tips: 'Great finishing exercise for chest. Focus on the squeeze.'
  }
];

export const workoutPlans = {
  beginner: {
    name: '💪 Beginner Full Body',
    duration: '4 weeks',
    daysPerWeek: 3,
    description: 'Perfect for starting your fitness journey',
    schedule: [
      {
        day: 'Monday',
        name: 'Full Body A',
        exercises: [
          { exerciseId: 11, sets: 3, reps: '10' },
          { exerciseId: 3, sets: 3, reps: '10-15' },
          { exerciseId: 5, sets: 3, reps: '10' },
          { exerciseId: 13, sets: 3, reps: '30s' },
          { exerciseId: 15, sets: 1, reps: '15 min' }
        ]
      },
      {
        day: 'Wednesday',
        name: 'Full Body B',
        exercises: [
          { exerciseId: 12, sets: 3, reps: '10 each' },
          { exerciseId: 8, sets: 3, reps: '12' },
          { exerciseId: 9, sets: 3, reps: '12' },
          { exerciseId: 14, sets: 3, reps: '20' },
          { exerciseId: 16, sets: 5, reps: 'rounds' }
        ]
      },
      {
        day: 'Friday',
        name: 'Full Body C',
        exercises: [
          { exerciseId: 17, sets: 3, reps: '12' },
          { exerciseId: 3, sets: 3, reps: '12-15' },
          { exerciseId: 4, sets: 3, reps: 'max' },
          { exerciseId: 13, sets: 3, reps: '45s' },
          { exerciseId: 15, sets: 1, reps: '20 min' }
        ]
      }
    ]
  },
  intermediate: {
    name: '🔥 Push Pull Legs',
    duration: '8 weeks',
    daysPerWeek: 5,
    description: 'Classic split for muscle building',
    schedule: [
      {
        day: 'Monday',
        name: 'Push Day',
        exercises: [
          { exerciseId: 1, sets: 4, reps: '8-10' },
          { exerciseId: 2, sets: 3, reps: '10-12' },
          { exerciseId: 7, sets: 4, reps: '8-10' },
          { exerciseId: 8, sets: 3, reps: '12-15' },
          { exerciseId: 18, sets: 3, reps: '12-15' }
        ]
      },
      {
        day: 'Tuesday',
        name: 'Pull Day',
        exercises: [
          { exerciseId: 6, sets: 4, reps: '5-6' },
          { exerciseId: 4, sets: 4, reps: '6-10' },
          { exerciseId: 5, sets: 4, reps: '8-10' },
          { exerciseId: 9, sets: 3, reps: '10-12' }
        ]
      },
      {
        day: 'Wednesday',
        name: 'Legs + Core',
        exercises: [
          { exerciseId: 11, sets: 4, reps: '8-10' },
          { exerciseId: 17, sets: 3, reps: '12' },
          { exerciseId: 12, sets: 3, reps: '10 each' },
          { exerciseId: 13, sets: 3, reps: '60s' },
          { exerciseId: 14, sets: 3, reps: '20' }
        ]
      },
      {
        day: 'Thursday',
        name: 'Rest / Yoga',
        exercises: [
          { exerciseId: 16, sets: 12, reps: 'rounds' }
        ]
      },
      {
        day: 'Friday',
        name: 'Upper Body',
        exercises: [
          { exerciseId: 1, sets: 3, reps: '10-12' },
          { exerciseId: 4, sets: 3, reps: '8-10' },
          { exerciseId: 7, sets: 3, reps: '10' },
          { exerciseId: 10, sets: 3, reps: '8-12' },
          { exerciseId: 9, sets: 3, reps: '12' }
        ]
      }
    ]
  }
};
