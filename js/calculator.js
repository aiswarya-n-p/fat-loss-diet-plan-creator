/**
 * Health & Calorie Calculator for Kerala Fat Loss Plan
 * Uses Mifflin-St Jeor equation (gold standard for BMR), activity multipliers,
 * healthy fat loss deficits, and tropical hydration science.
 */

const Calculator = {
  ACTIVITY_MULTIPLIERS: {
    sedentary: 1.2,       // Desk job, little to no exercise
    light: 1.375,         // Light exercise/walking 1-3 days/week
    moderate: 1.55,       // Moderate exercise 3-5 days/week
    active: 1.725         // Very active, vigorous training/sports 6-7 days/week
  },

  DEFICIT_LEVELS: {
    slow: {
      label: "Gradual & Sustainable",
      deficit: 350,
      weeklyLoss: "0.3 - 0.4 kg/week",
      description: "Easy to maintain long-term, zero hunger pangs or weakness."
    },
    moderate: {
      label: "Steady Fat Loss (Recommended)",
      deficit: 500,
      weeklyLoss: "0.5 kg/week",
      description: "The gold standard pace for healthy and consistent fat loss."
    },
    fast: {
      label: "Accelerated Pace",
      deficit: 750,
      weeklyLoss: "0.75 - 0.8 kg/week",
      description: "Requires disciplined portion control while meeting protein goals."
    }
  },

  calculateBMR(gender, weightKg, heightCm, age) {
    if (gender === "male") {
      return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  },

  calculateTDEE(bmr, activityLevel) {
    const multiplier = this.ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
    return Math.round(bmr * multiplier);
  },

  calculateWaterIntake(weightKg, activityLevel) {
    // Base: 35ml per kg body weight in tropical Kerala climate
    let liters = weightKg * 0.035;
    
    // Additional fluid for physical activity
    if (activityLevel === "light") liters += 0.35;
    else if (activityLevel === "moderate") liters += 0.6;
    else if (activityLevel === "active") liters += 0.9;

    liters = Math.round(liters * 10) / 10;
    const glasses = Math.round(liters / 0.25); // 250ml per standard glass

    return {
      liters,
      glasses,
      herbalGlasses: Math.min(4, Math.floor(glasses / 3)) // Recommended warm jeera / pathimugham water
    };
  },

  computePlanMetrics(params) {
    const { age, gender, weight, height, activityLevel, goalSpeed, foodPreference } = params;

    const bmr = Math.round(this.calculateBMR(gender, weight, height, age));
    const tdee = this.calculateTDEE(bmr, activityLevel);

    const goalConfig = this.DEFICIT_LEVELS[goalSpeed] || this.DEFICIT_LEVELS.moderate;
    let targetCalories = tdee - goalConfig.deficit;

    // Safety floors: Prevents metabolic slowdown
    const minCalories = gender === "male" ? 1400 : 1200;
    let isClamped = false;
    if (targetCalories < minCalories) {
      targetCalories = minCalories;
      isClamped = true;
    }

    // Macro distribution tailored for fat loss:
    // Protein: 25-30% (protects muscle mass in calorie deficit)
    // Carbohydrates: 45-50% (Kerala complex carbs: matta rice, legumes, ragi)
    // Healthy Fats: 25-28% (essential fatty acids, moderate coconut oil)
    const proteinPct = 0.25;
    const carbsPct = 0.47;
    const fatPct = 0.28;

    const proteinGrams = Math.round((targetCalories * proteinPct) / 4);
    const carbsGrams = Math.round((targetCalories * carbsPct) / 4);
    const fatGrams = Math.round((targetCalories * fatPct) / 9);

    const water = this.calculateWaterIntake(weight, activityLevel);

    // Approximate BMI
    const heightMeters = height / 100;
    const bmi = Math.round((weight / (heightMeters * heightMeters)) * 10) / 10;

    let bmiCategory = "Normal weight";
    if (bmi < 18.5) bmiCategory = "Underweight";
    else if (bmi >= 23 && bmi < 27.5) bmiCategory = "Overweight (Asian/Indian criteria)";
    else if (bmi >= 27.5) bmiCategory = "Obese (Asian/Indian criteria)";

    return {
      age,
      gender,
      weight,
      height,
      bmi,
      bmiCategory,
      activityLevel,
      goalSpeed,
      goalDetails: goalConfig,
      foodPreference,
      bmr,
      tdee,
      targetCalories,
      deficit: tdee - targetCalories,
      isClamped,
      minCalories,
      macros: {
        protein: { grams: proteinGrams, pct: Math.round(proteinPct * 100) },
        carbs: { grams: carbsGrams, pct: Math.round(carbsPct * 100) },
        fat: { grams: fatGrams, pct: Math.round(fatPct * 100) }
      },
      water
    };
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = Calculator;
}
