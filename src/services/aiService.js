// AI Fitness assistant - Built-in intelligence without external API
// Provides contextual fitness, diet, and workout advice for Indian users

const fitnessKnowledge = {
  greetings: [
    "Namaste! 🙏 I'm your FitBharat AI coach. How can I help you today?",
    "Hey there, champion! 💪 Ready to crush your fitness goals?",
    "Welcome back, warrior! What would you like to know about fitness?"
  ],

  exercises: {
    chest: "For chest development, focus on: **Bench Press** (4x8-12), **Incline Dumbbell Press** (3x10-12), **Cable Flyes** (3x12-15), and **Push-ups** (3x15-20). Start with compound movements when you're fresh, then move to isolation exercises.",
    back: "Build a strong back with: **Deadlifts** (4x5-8), **Pull-ups** (4x6-10), **Barbell Rows** (4x8-12), and **Lat Pulldowns** (3x10-12). A strong back improves posture and prevents injury.",
    shoulders: "For broad shoulders: **Overhead Press** (4x8-10), **Lateral Raises** (3x12-15), **Face Pulls** (3x15), and **Front Raises** (3x12). Don't neglect rear delts!",
    arms: "Arm day essentials: **Barbell Curls** (3x10-12), **Hammer Curls** (3x12), **Tricep Dips** (3x8-12), **Skull Crushers** (3x10). Alternate bicep and tricep exercises for better pump.",
    legs: "Never skip leg day! **Squats** (4x8-12), **Leg Press** (3x12), **Lunges** (3x10 each), **Leg Curls** (3x12), **Calf Raises** (4x15). Legs are 50% of your body!",
    core: "Core workout: **Plank** (3x60s), **Russian Twists** (3x20), **Leg Raises** (3x15), **Mountain Climbers** (3x30s). Train core 3-4 times per week.",
    yoga: "**Surya Namaskar** is a complete workout! Start with 5 rounds and build to 12. Best done early morning on an empty stomach. It improves flexibility, strength, and mental clarity. 🧘"
  },

  diet: {
    protein: "Best protein sources in India:\n• **Eggs** - ₹6-8 each, 6g protein\n• **Paneer** - 18g protein per 100g\n• **Dal** (all varieties) - 7-9g per cup\n• **Chicken breast** - 31g per 100g\n• **Soya chunks** - 52g per 100g (cheapest!)\n• **Curd/Yogurt** - 11g per cup\n• **Whey protein** - 24g per scoop\n\n💡 Tip: Combine rice + dal for complete amino acids!",

    vegetarian: "High-protein vegetarian Indian diet:\n\n🌅 **Breakfast**: Moong dal chilla + paneer + milk\n🥜 **Snack**: Sprouts chaat + nuts\n🍛 **Lunch**: Rice + dal + paneer sabzi + curd\n☕ **Evening**: Soya chunk snack + green tea\n🍽️ **Dinner**: Roti + rajma/chole + salad\n🥛 **Night**: Turmeric milk\n\nThis gives ~100g protein without any meat!",

    weightLoss: "Indian weight loss diet tips:\n\n1. **Eat dinner before 7:30 PM**\n2. Replace rice with **roti or brown rice**\n3. Start meals with **salad or soup**\n4. Drink **jeera water** or **green tea** between meals\n5. Use **coconut oil** for cooking (MCTs help fat loss)\n6. Avoid **chai with sugar** - switch to green tea\n7. **Chew slowly** - it helps you eat less\n8. **Intermittent fasting** (16:8) works great with Indian meals\n\n⚡ Caloric deficit of 500 cal/day = ~0.5 kg loss per week",

    muscleGain: "Indian muscle building diet:\n\n🎯 **Target**: 2g protein per kg bodyweight\n\n• Breakfast: 4 eggs + 2 paratha + milk\n• Mid-morning: Shake (milk + banana + peanut butter + oats)\n• Lunch: Rice + dal + chicken/paneer + salad\n• Pre-workout: Banana + coffee\n• Post-workout: Whey shake + banana\n• Dinner: Roti + soya/paneer + vegetables\n• Before bed: Casein / Milk with ashwagandha\n\n💰 Budget tip: Soya chunks, eggs, and dal are cheapest protein!"
  },

  supplements: "Popular supplements in India:\n\n1. **Whey Protein** (MuscleBlaze, ON, MyProtein) - ₹2000-4000/kg\n2. **Creatine Monohydrate** - Most researched, safe. 5g daily. ~₹800/month\n3. **Multivitamin** - Fill nutritional gaps. ~₹500/month\n4. **Omega 3** (Fish oil) - Good for joints & heart. ~₹400/month\n5. **Ashwagandha** - Indian herb, boosts testosterone & recovery. ~₹300/month\n\n⚠️ Supplements are 10% of results. Diet & training are 90%!",

  beginnerTips: "Starting your fitness journey? Here's your guide:\n\n1. **Start with bodyweight exercises** for 2-4 weeks\n2. **Learn proper form** before adding weight\n3. **Train 3 days/week** (Mon-Wed-Fri) to start\n4. **Sleep 7-8 hours** - muscles grow during rest\n5. **Drink 3-4 liters water** daily\n6. **Track your workouts** - what gets measured, gets managed\n7. **Don't compare** with others' 5-year journey\n8. **Consistency > Intensity** - showing up matters most\n\n🎯 First month goal: Build the habit, not the body!",

  motivation: [
    "\"The body achieves what the mind believes.\" 💪 Don't give up - every rep counts!",
    "\"Discipline is choosing between what you want NOW and what you want MOST.\" 🔥",
    "\"Your body can stand almost anything. It's your mind you have to convince.\" 🧠",
    "\"Rome wasnt built in a day, but they were laying bricks every hour.\" 🏗️ Keep going!",
    "\"The only bad workout is the one that didn't happen.\" 🏋️ Get it done!",
    "\"Bahane bahut milenge, par body ek hi hai. Iska khayal rakho!\" 🇮🇳",
    "\"Jo log kehte hain 'Kal se start karunga' - unka kal kabhi nahi aata. Aaj start karo!\" 🔥"
  ],

  injury: "⚠️ **Injury Prevention Tips:**\n\n1. Always **warm up** 5-10 min before workout\n2. **Stretch** after workout, not before\n3. Use **proper form** - ego lifting causes injuries\n4. **Rest days** are crucial - take 2 per week\n5. If something hurts, **STOP immediately**\n6. Apply **RICE** method: Rest, Ice, Compression, Elevation\n7. See a **physiotherapist** for persistent pain\n\n🏥 Don't play doctor with injuries. Consult a professional!",

  sleep: "Sleep is the #1 recovery tool:\n\n😴 **7-8 hours** minimum for muscle recovery\n\n**Better sleep tips:**\n• No screens 30 min before bed\n• Keep room cool (18-22°C)\n• Drink **warm haldi doodh** before bed\n• Fixed sleep schedule (even weekends)\n• No caffeine after 4 PM\n• **Ashwagandha** can help with sleep quality\n\n💡 Poor sleep = 60% less muscle growth + more fat storage!",

  homeWorkout: "No gym? No problem! Home workout:\n\n🏠 **Full Body Home Workout (30 min):**\n\n1. Jumping Jacks - 60s\n2. Push-ups - 3x15\n3. Bodyweight Squats - 3x20\n4. Lunges - 3x10 each leg\n5. Plank - 3x45s\n6. Burpees - 3x10\n7. Mountain Climbers - 3x30s\n8. Superman Hold - 3x30s\n9. Surya Namaskar - 5 rounds\n\n🔄 Do this 4-5 times/week. Add a backpack with books for resistance!"
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function findBestResponse(message) {
  const msg = message.toLowerCase();

  // Greetings
  if (msg.match(/^(hi|hello|hey|namaste|namaskar|hola|yo|sup)/)) {
    return getRandomItem(fitnessKnowledge.greetings);
  }

  // Motivation
  if (msg.match(/motivat|inspire|lazy|give up|quit|tired of|bored|cant do/)) {
    return getRandomItem(fitnessKnowledge.motivation);
  }

  // Specific muscle groups
  if (msg.match(/chest|bench press|push.?up|pec/)) {
    return fitnessKnowledge.exercises.chest;
  }
  if (msg.match(/back|pull.?up|deadlift|lat|row/)) {
    return fitnessKnowledge.exercises.back;
  }
  if (msg.match(/shoulder|delt|overhead|lateral raise/)) {
    return fitnessKnowledge.exercises.shoulders;
  }
  if (msg.match(/arm|bicep|tricep|curl/)) {
    return fitnessKnowledge.exercises.arms;
  }
  if (msg.match(/leg|squat|lunge|calf|quad|hamstring/)) {
    return fitnessKnowledge.exercises.legs;
  }
  if (msg.match(/core|ab|plank|crunch|six.?pack/)) {
    return fitnessKnowledge.exercises.core;
  }
  if (msg.match(/yoga|surya|namaskar|stretch|flexibility/)) {
    return fitnessKnowledge.exercises.yoga;
  }

  // Diet related
  if (msg.match(/protein|whey|amino|how much protein/)) {
    return fitnessKnowledge.diet.protein;
  }
  if (msg.match(/vegetarian|veg diet|no meat|plant.?based|paneer/)) {
    return fitnessKnowledge.diet.vegetarian;
  }
  if (msg.match(/weight loss|fat loss|lose weight|slim|belly fat|reduce/)) {
    return fitnessKnowledge.diet.weightLoss;
  }
  if (msg.match(/muscle gain|bulk|mass|gain weight|skinny|thin/)) {
    return fitnessKnowledge.diet.muscleGain;
  }
  if (msg.match(/diet|meal|food|eat|nutrition|calorie|kya khaye|khana/)) {
    return fitnessKnowledge.diet.muscleGain;
  }

  // Supplements
  if (msg.match(/supplement|creatine|whey|bcaa|pre.?workout|ashwagandha/)) {
    return fitnessKnowledge.supplements;
  }

  // Beginner
  if (msg.match(/beginner|start|new|first time|kaise shuru|novice|newbie/)) {
    return fitnessKnowledge.beginnerTips;
  }

  // Injury
  if (msg.match(/injury|pain|hurt|sore|strain|sprain|doctor/)) {
    return fitnessKnowledge.injury;
  }

  // Sleep
  if (msg.match(/sleep|rest|recovery|insomnia|neend|tired/)) {
    return fitnessKnowledge.sleep;
  }

  // Home workout
  if (msg.match(/home|no gym|without gym|ghar pe|bodyweight|no equipment/)) {
    return fitnessKnowledge.homeWorkout;
  }

  // BMI / Body
  if (msg.match(/bmi|body mass|overweight|underweight|weight check/)) {
    return "You can check your BMI in the **Profile** section! Go to Profile → BMI Calculator. \n\nFor Indians, healthy BMI range is **18.5 to 23** (slightly lower than Western standards due to body composition differences).\n\n💡 BMI is just one metric. Body fat percentage, measurements, and how you feel are equally important!";
  }

  // Workout plan
  if (msg.match(/plan|routine|schedule|program|split|kya karu/)) {
    return "I recommend these workout splits:\n\n**Beginner (3 days):** Full Body × 3\n**Intermediate (5 days):** Push-Pull-Legs-Rest-Upper\n**Advanced (6 days):** PPL × 2\n\nCheck the **Workout** tab for detailed plans with exercises, sets, and reps! 📋\n\n🎯 Tip: Stick to one program for at least 8-12 weeks before changing.";
  }

  // Water
  if (msg.match(/water|hydrat|pani|dehydrat/)) {
    return "💧 **Hydration Guide:**\n\n• Minimum **3-4 liters** daily\n• Drink **500ml** upon waking up\n• **250ml** every hour during workouts\n• Don't wait till you're thirsty\n• Add **lemon/jeera** for taste\n• **Coconut water** post-workout is excellent\n\nTrack your water intake in the app! 🥛";
  }

  // Default responses
  const defaultResponses = [
    "That's a great question! 💪 I can help you with:\n\n🏋️ **Exercise advice** - Ask about any muscle group\n🍛 **Indian diet plans** - Veg & non-veg options\n🧘 **Yoga & flexibility** - Surya Namaskar & more\n💊 **Supplements** - What works in India\n🏠 **Home workouts** - No gym needed\n😴 **Recovery & sleep** tips\n🎯 **Workout plans** - Beginner to advanced\n\nWhat would you like to know?",
    "I'm your AI fitness buddy! 🤖 Try asking me about:\n- \"Best exercises for chest\"\n- \"Indian vegetarian protein sources\"\n- \"Weight loss diet plan\"\n- \"Home workout without equipment\"\n- \"Supplement recommendations\"\n\nI've got all the desi fitness knowledge! 🇮🇳"
  ];

  return getRandomItem(defaultResponses);
}

export function getAIResponse(message, userProfile = {}) {
  return new Promise((resolve) => {
    // Simulate AI thinking time
    const thinkTime = 800 + Math.random() * 1200;

    setTimeout(() => {
      let response = findBestResponse(message);

      // Personalize based on user profile
      if (userProfile.name && userProfile.name !== 'Fitness Enthusiast') {
        if (Math.random() > 0.7) {
          response = `Great question, ${userProfile.name}! ` + response;
        }
      }

      resolve(response);
    }, thinkTime);
  });
}
